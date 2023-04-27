import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { filter, Subject, switchMap, takeUntil } from 'rxjs';

import { DestroyableDirective } from '../../../../core/directives/destroyable.directive';
import { GithubReposApiService } from '../../services/github-repos-api.service';
import { GithubRepo } from '../../interfaces/github-repo.interface';
import { GithubReadmeResponse } from '../../interfaces/github-readme-response.interface';

@Component({
  selector: 'app-github-repo-details',
  templateUrl: './github-repo-details.component.html',
  styleUrls: ['./github-repo-details.component.scss'],
})
export class GithubRepoDetailsComponent
  extends DestroyableDirective
  implements OnInit, OnDestroy
{
  public repo$: Subject<GithubRepo> = new Subject<GithubRepo>();
  public readme: string = '';

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubReposApiService: GithubReposApiService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.listenRepoId();
    this.listenRepoReadme();
  }

  private listenRepoId(): void {
    this.route.params
      .pipe(
        filter((params) => !!params['id']),
        switchMap((params) => {
          return this.githubReposApiService.getRepoById(params['id']);
        }),
        takeUntil(this.destroy$)
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
