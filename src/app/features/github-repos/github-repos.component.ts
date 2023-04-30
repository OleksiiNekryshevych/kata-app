import { GithubRepo } from './interfaces/github-repo.interface';
import { GithubReposApiService } from './services/github-repos-api.service';
import {
  ActivatedRoute,
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';
import { SideNavbarEventsService } from './services/side-navbar-events.service';
import { BreakpointService } from './../../core/services/breakpoints.service';
import { DestroyableDirective } from './../../core/directives/destroyable.directive';
import {
  takeUntil,
  BehaviorSubject,
  Subject,
  take,
  Observable,
  filter,
  switchMap,
  tap,
  of,
  map,
} from 'rxjs';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { SideNavbarEvent } from './enum/side-navbar-event.enum';
import { GithubReposService } from './services/github-repos.service';

@Component({
  selector: 'app-github-repos',
  templateUrl: './github-repos.component.html',
  styleUrls: ['./github-repos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubReposComponent
  extends DestroyableDirective
  implements OnInit
{
  public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public fluidMode: boolean;
  public viewMode: MatDrawerMode = 'side';

  @ViewChild('sideNav') private sideNav: MatSidenav;

  constructor(
    private breakpointService: BreakpointService,
    private sideNavbarEventsService: SideNavbarEventsService,
    private githubReposService: GithubReposService,
    private githubReposApiService: GithubReposApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.checkRepoId();
    this.listenRouterNavigation();
    this.listenSelectedRepoId();
    this.listenBreakpoints();
    this.listenSideNavbarEvents();
  }

  public toggleSidebar(): void {
    this.sideNav.toggle();
  }

  private listenBreakpoints(): void {
    this.breakpointService
      .isMobile()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isMobile: boolean) => {
        this.isMobile$.next(isMobile);
        this.updateViewMode();
        this.cdr.markForCheck();
      });
  }

  private updateViewMode(): void {
    this.viewMode = this.isMobile$.value ? 'over' : 'side';
    this.fluidMode = this.viewMode === 'over';
    this.updateSideNav();
  }

  private handleSideNavForMobile(): void {
    this.githubReposService
      .getSelectedRepoId()
      .pipe(take(1))
      .subscribe((id) => {
        const event = id ? SideNavbarEvent.CLOSE : SideNavbarEvent.OPEN;

        this.sideNavbarEventsService.sendEvent(event);
      });
  }

  private handleSideNavForDesktop(): void {
    if (this.sideNav?.opened) return;

    this.sideNavbarEventsService.sendEvent(SideNavbarEvent.OPEN);
  }

  private listenSelectedRepoId(): void {
    this.githubReposService
      .getSelectedRepoId()
      .pipe(
        switchMap((repoId) =>
          repoId ? this.githubReposApiService.getRepoById(repoId) : of(null)
        ),
        tap(() => this.updateSideNav()),
        takeUntil(this.destroy$)
      )
      .subscribe((repo: GithubRepo | null) => {
        this.githubReposService.selectRepo(repo);
        this.cdr.markForCheck();
      });
  }

  private checkRepoId(): void {
    const selectedRouterId = this.getRepoIdFromRoute();
    this.githubReposService.setSelectedRepoId(selectedRouterId);
  }

  private listenRouterNavigation(): void {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map(() => this.getRepoIdFromRoute()),
        takeUntil(this.destroy$)
      )
      .subscribe((repoId: number | null) =>
        this.githubReposService.setSelectedRepoId(repoId || null)
      );
  }

  private listenSideNavbarEvents(): void {
    this.sideNavbarEventsService
      .navbarEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: SideNavbarEvent) => this.handleSideNavEvent(event));
  }

  private handleSideNavEvent(event: SideNavbarEvent): void {
    event === SideNavbarEvent.OPEN
      ? this.sideNav.open()
      : event === SideNavbarEvent.CLOSE
      ? this.sideNav.close()
      : this.sideNav.toggle();
  }

  private getRepoIdFromRoute(): number | null {
    return this.route.snapshot.firstChild?.params['id'] || null;
  }

  private updateSideNav(): void {
    this.isMobile$.value
      ? this.handleSideNavForMobile()
      : this.handleSideNavForDesktop();
  }
}
