import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'repositories',
    loadChildren: () =>
      window.innerWidth > 768 //TODO: move to enum
        ? import(
            './components/github-repo-desktop/github-repo-desktop.module'
          ).then((m) => m.GithubRepoDesktopModule)
        : import(
            './components/github-repo-mobile/github-repo-mobile.module'
          ).then((m) => m.GithubRepoMobileModule),
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
