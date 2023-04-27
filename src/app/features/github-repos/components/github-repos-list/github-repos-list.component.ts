import { GithubPaginationParams } from '../../interfaces/github-pagination-params.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize, Subject, takeUntil } from 'rxjs';

import { GithubReposApiService } from '../../services/github-repos-api.service';
import { GithubRepo } from '../../interfaces/github-repo.interface';
import { GithubReposResponse } from '../../interfaces/github-repos-response.interface';
import { DestroyableDirective } from '../../../../core/directives/destroyable.directive';

const DefaultParams: GithubPaginationParams = {
  page: 1,
  q: 'stars:>30000',
  perPage: 100,
  order: 'desc',
  sort: 'stars',
};

@Component({
  selector: 'app-github-repos-list',
  templateUrl: './github-repos-list.component.html',
  styleUrls: ['./github-repos-list.component.scss'],
})
export class GithubReposListComponent
  extends DestroyableDirective
  implements OnInit
{
  private page = 1;

  public isLoading = false;
  public repos: GithubRepo[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubReposApiService: GithubReposApiService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.fetchGithubRepos();
  }

  public navigateToDetails(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  public onScroll(): void {
    this.page++;
    console.log('scroll - page: ', this.page);
    this.fetchGithubRepos();
  }

  public trackById(_: number, item: GithubRepo): number {
    return item.id;
  }

  private fetchGithubRepos(): void {
    this.isLoading = true;

    this.githubReposApiService
      .getGithubRepos({ ...DefaultParams, page: this.page })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response: GithubReposResponse) =>
          this.handleReposUpdate(response),
        error: (error) => alert(error['message']),
      });
  }

  private handleReposUpdate(response: GithubReposResponse): void {
    this.repos = [...this.repos, ...response.items];
  }
}
