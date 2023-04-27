import { NgModule } from '@angular/core';

import { GithubRepoMobileRoutingModule } from './github-repo-mobile-routing.module';
import { GithubReposListModule } from './../github-repos-list/github-repos-list.module';
import { GithubRepoDetailsModule } from '../github-repo-details/github-repo-details.module';
import { GithubRepoMobileComponent } from './github-repo-mobile.component';

@NgModule({
  imports: [
    GithubRepoMobileRoutingModule,
    GithubRepoDetailsModule,
    GithubReposListModule,
  ],
  declarations: [GithubRepoMobileComponent],
})
export class GithubRepoMobileModule {}
