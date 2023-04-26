import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GithubReposListComponent } from './components/github-repos-list/github-repos-list.component';
import { GithubRepoDetailsComponent } from './components/github-repo-details/github-repo-details.component';

const routes: Routes = [
  {
    path: 'repositories',
    component: GithubReposListComponent,
  },
  {
    path: 'repositories/:id',
    component: GithubRepoDetailsComponent,
  },
  { path: '**', redirectTo: 'repositories' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GithubReposRoutingModule {}
