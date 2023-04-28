import { BreakpointService } from './../../core/services/breakpoints.service';
import { DestroyableDirective } from './../../core/directives/destroyable.directive';
import { takeUntil, BehaviorSubject, Subject } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-github-repos',
  templateUrl: './github-repos.component.html',
  styleUrls: ['./github-repos.component.scss'],
})
export class GithubReposComponent
  extends DestroyableDirective
  implements OnInit
{
  public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public viewMode: MatDrawerMode = 'side';

  @ViewChild('sideNav') private sideNav: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private breakpointService: BreakpointService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.listenBreakpoints();
  }

  public toggleSidebar(): void {
    this.sideNav.toggle();
  }

  private listenBreakpoints(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        console.log(state);

        this.isMobile$.next(state.matches);
        this.updateViewMode();
      });
  }

  private updateViewMode(): void {
    this.viewMode = this.isMobile$.value ? 'over' : 'side';

    this.viewMode === 'side' ? this.sideNav?.open() : null; //TODO: extend with close/open for mob version
  }
}
