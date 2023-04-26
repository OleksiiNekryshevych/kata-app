import { GithubReposListComponent } from './components/github-repos-list/github-repos-list.component';
import { NgModule } from '@angular/core';

import { GithubReposRoutingModule } from './github-repos-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, GithubReposRoutingModule],
  exports: [],
  providers: [],
  declarations: [GithubReposListComponent],
})
export class GithubReposModule {}
