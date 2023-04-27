import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GithubRepoDetailsComponent } from './github-repo-details.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GithubRepoDetailsComponent],
  exports: [GithubRepoDetailsComponent],
})
export class GithubRepoDetailsModule {}
