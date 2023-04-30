import { Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { filter, switchMap, takeUntil, Observable, tap, map } from 'rxjs';

import { DestroyableDirective } from '../../../../core/directives/destroyable.directive';
import { GithubReposApiService } from '../../services/github-repos-api.service';
import { GithubReposService } from '../../services/github-repos.service';
import { GithubRepo } from '../../interfaces/github-repo.interface';
import { GithubReadmeResponse } from '../../interfaces/github-readme-response.interface';

@Component({
  selector: 'app-github-repo-details',
  templateUrl: './github-repo-details.component.html',
  styleUrls: ['./github-repo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubRepoDetailsComponent
  extends DestroyableDirective
  implements OnInit, OnDestroy
{
  public repo$: Observable<GithubRepo | null> =
    this.githubReposService.getSelectedRepo();
  public readme: string = '';

  public constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private githubReposApiService: GithubReposApiService,
    private githubReposService: GithubReposService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.listenSelectedRepo();
  }

  public override ngOnDestroy(): void {
    this.githubReposService.selectRepo(null);
  }

  public closeDetails(): void {
    this.router.navigate(['']);
  }

  private listenSelectedRepo(): void {
    this.repo$
      .pipe(
        tap(() => this.resetReadme()),
        map((repo: GithubRepo | null): GithubRepo => repo as GithubRepo),
        filter((repo: GithubRepo) => !!repo),
        switchMap(
          (repo: GithubRepo): Observable<GithubReadmeResponse> =>
            this.githubReposApiService.getRepoReadme(repo.url)
        ),
        map((readmeResponse: GithubReadmeResponse) => readmeResponse.content),
        takeUntil(this.destroy$)
      )
      .subscribe((readme: string) => {
        this.readme = atob(readme);
        this.cdr.markForCheck();
      });
  }

  private resetReadme(): void {
    this.readme = '';
  }
}
