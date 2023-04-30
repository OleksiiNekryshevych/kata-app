import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';

import { GithubRepoDetailsModule } from './components/github-repo-details/github-repo-details.module';
import { GithubReposListModule } from './components/github-repos-list/github-repos-list.module';
import { GithubReposRoutingModule } from './github-repos-routing.module';
import { SideNavbarEventsService } from './services/side-navbar-events.service';
import { GithubReposService } from './services/github-repos.service';
import { GithubReposComponent } from './github-repos.component';

@NgModule({
  imports: [
    CommonModule,
    GithubReposRoutingModule,
    MatSidenavModule,
    GithubReposListModule,
    GithubRepoDetailsModule,
  ],
  providers: [SideNavbarEventsService, GithubReposService],
  declarations: [GithubReposComponent],
})
export class GithubReposModule {}
