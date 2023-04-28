import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';

import { GithubReposComponent } from './github-repos.component';
import { GithubRepoDetailsModule } from './components/github-repo-details/github-repo-details.module';
import { GithubReposListModule } from './components/github-repos-list/github-repos-list.module';
import { GithubReposRoutingModule } from './github-repos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GithubReposRoutingModule,
    MatSidenavModule,
    GithubReposListModule,
    GithubRepoDetailsModule,
  ],
  declarations: [GithubReposComponent],
})
export class GithubReposModule {}
