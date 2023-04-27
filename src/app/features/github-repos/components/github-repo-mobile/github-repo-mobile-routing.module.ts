import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GithubRepoMobileComponent } from './github-repo-mobile.component';
import { GithubReposListComponent } from '../github-repos-list/github-repos-list.component';
import { GithubRepoDetailsComponent } from '../github-repo-details/github-repo-details.component';

const routes: Routes = [
  {
    path: '',
    component: GithubRepoMobileComponent,
    children: [
      {
        path: '',
        component: GithubReposListComponent,
      },
      {
        path: ':id',
        component: GithubRepoDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GithubRepoMobileRoutingModule {}
