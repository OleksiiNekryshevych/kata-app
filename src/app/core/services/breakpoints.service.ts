import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subject, Observable, map } from 'rxjs';

import { Device } from '../types/device.type';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  private deviceType$: Subject<Device> = new Subject<Device>();

  constructor(private breakpointObserver: BreakpointObserver) {}

  public updateCurrentDeviceState(): void {
    const device: Device = this.breakpointObserver.isMatched([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ])
      ? 'mobile'
      : 'desktop';

    this.setDeviceType(device);
  }

  public setDeviceType(deviceType: Device): void {
    this.deviceType$.next(deviceType);
  }

  public getDeviceType(): Observable<Device> {
    return this.deviceType$.asObservable();
  }

  public isMobile(): Observable<boolean> {
    return this.deviceType$.pipe(
      map((deviceType: Device) => deviceType === 'mobile')
    );
  }
}
