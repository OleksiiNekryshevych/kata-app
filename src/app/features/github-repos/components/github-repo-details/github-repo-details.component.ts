import { GithubRepo } from './../../../../core/interfaces/github-repo.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-github-repos-list',
  templateUrl: './github-repo-details.component.html',
  styleUrls: ['./github-repo-details.component.scss'],
})
export class GithubRepoDetailsComponent {
  @Input() public repo: GithubRepo | unknown;
}
