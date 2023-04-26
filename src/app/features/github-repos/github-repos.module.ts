import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubRepoDetailsComponent } from './components/github-repo-details/github-repo-details.component';
import { GithubReposListComponent } from './components/github-repos-list/github-repos-list.component';
import { GithubReposRoutingModule } from './github-repos-routing.module';

@NgModule({
  imports: [CommonModule, GithubReposRoutingModule],
  exports: [],
  providers: [],
  declarations: [GithubReposListComponent, GithubRepoDetailsComponent],
})
export class GithubReposModule {}
