import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GithubReposListComponent } from './github-repos-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GithubReposListComponent],
  exports: [GithubReposListComponent],
})
export class GithubReposListModule {}
