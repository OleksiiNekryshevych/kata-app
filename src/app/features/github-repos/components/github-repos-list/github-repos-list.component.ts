import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize, takeUntil, Observable } from 'rxjs';

import { GithubReposApiService } from '../../services/github-repos-api.service';
import { GithubReposService } from '../../services/github-repos.service';
import { GithubRepo } from '../../interfaces/github-repo.interface';
import { GithubReposResponse } from '../../interfaces/github-repos-response.interface';
import { ListPageComponent } from '../../../../core/utils/list-page.component';
import { githubReposPaginationDefaultConfig } from '../../configs/github-repos-pagination-default.config';
import { BreakpointService } from 'src/app/core/services/breakpoints.service';

@Component({
  selector: 'app-github-repos-list',
  templateUrl: './github-repos-list.component.html',
  styleUrls: ['./github-repos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubReposListComponent
  extends ListPageComponent<GithubRepo>
  implements OnInit, AfterViewInit
{
  public isMobile$: Observable<boolean> = this.breakpointService.isMobile();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubReposApiService: GithubReposApiService,
    private githubReposService: GithubReposService,
    private breakpointService: BreakpointService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.listenReposList();
  }

  public ngAfterViewInit(): void {
    this.breakpointService.updateCurrentDeviceState();
  }

  public navigateToDetails(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  public trackById(_: number, item: GithubRepo): number {
    return item.id;
  }

  protected load(): void {
    this.isLoading = true;

    this.githubReposApiService
      .getGithubRepos({
        ...githubReposPaginationDefaultConfig,
        page: this.currentPage,
      })
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response: GithubReposResponse) =>
          this.handleReposUpdate(response),
      });
  }

  private listenReposList(): void {
    this.githubReposService
      .getReposList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((reposList: GithubRepo[]) => {
        this.listItems = reposList;
      });
  }

  private handleReposUpdate(response: GithubReposResponse): void {
    this.githubReposService.setReposList([
      ...this.listItems,
      ...response.items,
    ]);
  }
}
