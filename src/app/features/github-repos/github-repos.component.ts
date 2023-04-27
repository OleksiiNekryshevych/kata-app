import { Component } from '@angular/core';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-github-repos',
  templateUrl: './github-repos.component.html',
  styleUrls: ['./github-repos.component.scss'],
})
export class GithubReposComponent {
  public isMobile: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {}

  public ngOnInit(): void {
    this.listenBreakpoints();
  }

  private listenBreakpoints(): void {
    this.breakpointObserver
      .observe(['(max-width: 768px)']) //TODO: move to enum
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
        console.log(state);
      });
  }
}
