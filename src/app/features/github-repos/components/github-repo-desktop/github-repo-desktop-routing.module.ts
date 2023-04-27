import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GithubRepoDesktopComponent } from './github-repo-desktop.component';
import { GithubRepoDetailsComponent } from '../github-repo-details/github-repo-details.component';

const routes: Routes = [
  {
    path: '',
    component: GithubRepoDesktopComponent,
    children: [{ path: ':id', component: GithubRepoDetailsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GithubRepoDesktopRoutingModule {}
