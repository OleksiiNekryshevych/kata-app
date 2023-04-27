import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { GithubReposListComponent } from './github-repos-list.component';

@NgModule({
  imports: [CommonModule, InfiniteScrollModule],
  declarations: [GithubReposListComponent],
  exports: [GithubReposListComponent],
})
export class GithubReposListModule {}
