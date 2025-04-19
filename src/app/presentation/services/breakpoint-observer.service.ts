import { inject, Injectable } from '@angular/core';
import {BreakpointObserver, BreakpointState, LayoutModule} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {

  private breakpointObserver = inject(BreakpointObserver);

  constructor() { }

  getObserver(): Observable<BreakpointState> {
    return this.breakpointObserver.observe('(max-width: 1000px)')
  }
}
