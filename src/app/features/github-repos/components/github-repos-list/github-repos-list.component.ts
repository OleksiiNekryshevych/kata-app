import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize, takeUntil } from 'rxjs';

import { GithubReposApiService } from '../../services/github-repos-api.service';
import { GithubRepo } from '../../interfaces/github-repo.interface';
import { GithubReposResponse } from '../../interfaces/github-repos-response.interface';
import { ListPageComponent } from '../../../../core/utils/list-page.component';
import { githubReposPaginationDefaultConfig } from '../../configs/github-repos-pagination-default.config';

@Component({
  selector: 'app-github-repos-list',
  templateUrl: './github-repos-list.component.html',
  styleUrls: ['./github-repos-list.component.scss'],
})
export class GithubReposListComponent
  extends ListPageComponent<GithubRepo>
  implements OnInit
{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubReposApiService: GithubReposApiService
  ) {
    super();
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
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response: GithubReposResponse) =>
          this.handleReposUpdate(response),
      });
  }

  private handleReposUpdate(response: GithubReposResponse): void {
    this.listItems = [...this.listItems, ...response.items];
  }
}
