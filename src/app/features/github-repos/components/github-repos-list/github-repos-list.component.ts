import { GithubReposListParams } from './../../../../core/interfaces/github-repos-list-params.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize, Subject, takeUntil } from 'rxjs';

import { GithubReposApiService } from '../../services/github-repos-api.service';
import { GithubRepo } from '../../../../core/interfaces/github-repo.interface';
import { GithubReposResponse } from '../../../../core/interfaces/github-repos-response.interface';

const DefaultParams: GithubReposListParams = {
  page: 1,
  starts: 30000,
  perPage: 100,
  order: 'desc',
};

@Component({
  selector: 'app-github-repos-list',
  templateUrl: './github-repos-list.component.html',
  styleUrls: ['./github-repos-list.component.scss'],
})
export class GithubReposListComponent implements OnInit {
  private subscriptionSub = new Subject(); //TODO replace with Directive or class
  private page = 1;

  public isLoading = false;
  public repos: GithubRepo[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubReposApiService: GithubReposApiService
  ) {}

  public ngOnInit(): void {
    this.fetchGithubRepos();
  }

  public navigateToDetails(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.subscriptionSub.next(null);
    this.subscriptionSub.complete();
  }

  public onScroll(): void {
    this.page++;
    console.log('scroll - page: ', this.page);
    this.fetchGithubRepos();
  }

  public trackById(index: number, item: GithubRepo): number {
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
        takeUntil(this.subscriptionSub)
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
