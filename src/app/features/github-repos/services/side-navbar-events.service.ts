import { SideNavbarEvent } from '../enum/side-navbar-event.enum';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SideNavbarEventsService {
  private events: Subject<SideNavbarEvent> = new Subject<SideNavbarEvent>();

  public navbarEvents(): Observable<SideNavbarEvent> {
    return this.events.asObservable();
  }

  public sendEvent(event: SideNavbarEvent): void {
    this.events.next(event);
  }
}
