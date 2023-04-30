import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { DestroyableDirective } from './core/directives/destroyable.directive';
import { BreakpointService } from './core/services/breakpoints.service';
import { Device } from './core/types/device.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends DestroyableDirective implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private breakpointService: BreakpointService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.listenBreakpoints();
  }

  private listenBreakpoints(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const deviceType: Device = state.matches ? 'mobile' : 'desktop';

        this.breakpointService.setDeviceType(deviceType);
      });
  }
}
