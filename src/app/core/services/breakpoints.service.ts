import { Subject, Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Device } from '../types/device.type';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  private deviceType$: Subject<Device> = new Subject<Device>();

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
