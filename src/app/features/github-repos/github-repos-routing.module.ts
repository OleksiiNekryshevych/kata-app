import { GithubRepoDetailsComponent } from './components/github-repo-details/github-repo-details.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GithubReposComponent } from './github-repos.component';

const routes: Routes = [
  {
    path: 'repositories',
    component: GithubReposComponent,
    children: [
      {
        path: ':id',
        component: GithubRepoDetailsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'repositories',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GithubReposRoutingModule {}
