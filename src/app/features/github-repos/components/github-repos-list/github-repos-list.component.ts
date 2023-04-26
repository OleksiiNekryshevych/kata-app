import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { GithubReposApiService } from '../../services/github-repos-api.service';
import { GithubRepo } from '../../../../core/interfaces/github-repo.interface';
import { GithubReposResponse } from '../../../../core/interfaces/github-repos-response.interface';

@Component({
  selector: 'app-github-repos-list',
  templateUrl: './github-repos-list.component.html',
  styleUrls: ['./github-repos-list.component.scss'],
})
export class GithubReposListComponent implements OnInit {
  private subscriptionSub = new Subject(); //TODO replace with Directive or class

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

  private fetchGithubRepos(): void {
    this.githubReposApiService
      .getGithubRepos()
      .pipe(takeUntil(this.subscriptionSub))
      .subscribe((response: GithubReposResponse) => {
        this.repos = response.items;
      });
  }
}
