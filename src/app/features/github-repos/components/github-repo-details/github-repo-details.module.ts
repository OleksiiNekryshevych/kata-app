import { CommonModule } from '@angular/common';
import { NgModule, SecurityContext } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { MarkdownModule } from 'ngx-markdown';

import { GithubRepoDetailsComponent } from './github-repo-details.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
    }),
  ],
  declarations: [GithubRepoDetailsComponent],
  exports: [GithubRepoDetailsComponent],
})
export class GithubRepoDetailsModule {}
