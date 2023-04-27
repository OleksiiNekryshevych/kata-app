import { GithubReadmeResponse } from './../../../../core/interfaces/github-readme-response.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, filter, Subject, switchMap, takeUntil } from 'rxjs';

import { GithubReposApiService } from './../../services/github-repos-api.service';
import { GithubRepo } from './../../../../core/interfaces/github-repo.interface';

@Component({
  selector: 'app-github-repo-details',
  templateUrl: './github-repo-details.component.html',
  styleUrls: ['./github-repo-details.component.scss'],
})
export class GithubRepoDetailsComponent implements OnInit, OnDestroy {
  public repo$: Subject<GithubRepo> = new Subject<GithubRepo>();
  public readme: string = '';

  private subscriptionSub = new Subject(); //TODO replace with Directive or class

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubReposApiService: GithubReposApiService
  ) {}

  public ngOnInit(): void {
    this.listenRepoId();
    this.listenRepoReadme();
  }

  public ngOnDestroy(): void {
    this.subscriptionSub.next(null);
    this.subscriptionSub.complete();
  }

  private listenRepoId(): void {
    this.route.params
      .pipe(
        filter((params) => !!params['id']),
        switchMap((params) => {
          return this.githubReposApiService.getRepoById(params['id']);
        }),
        takeUntil(this.subscriptionSub)
      )
      .subscribe({
        next: (repo: GithubRepo) => this.handleRepoLoaded(repo),
        error: () => this.navigateToReposList(),
      });
  }

  private handleRepoLoaded(repo: GithubRepo): void {
    this.repo$.next(repo);
    this.readme = '';
  }

  private navigateToReposList(): void {
    this.router.navigate(['/'], { relativeTo: this.route.parent });
  }

  private listenRepoReadme(): void {
    this.repo$
      .pipe(
        switchMap((repo: GithubRepo) =>
          this.githubReposApiService.getRepoReadme(repo.url)
        )
      )
      .subscribe((readmeResponse: GithubReadmeResponse) => {
        this.readme = atob(readmeResponse.content);
      });
  }
}
