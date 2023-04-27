import { NgModule } from '@angular/core';

import { GithubRepoDesktopRoutingModule } from './github-repo-desktop-routing.module';
import { GithubRepoDesktopComponent } from './github-repo-desktop.component';
import { GithubReposListModule } from '../github-repos-list/github-repos-list.module';
import { GithubRepoDetailsModule } from '../github-repo-details/github-repo-details.module';

@NgModule({
  imports: [
    GithubRepoDesktopRoutingModule,
    GithubRepoDetailsModule,
    GithubReposListModule,
  ],
  declarations: [GithubRepoDesktopComponent],
})
export class GithubRepoDesktopModule {}
