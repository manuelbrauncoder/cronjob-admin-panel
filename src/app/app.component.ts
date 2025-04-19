import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MainLayoutComponent } from './presentation/layout/main-layout/main-layout.component';
import { BreakpointObserverService } from './presentation/services/breakpoint-observer.service';
import { UiService } from './presentation/services/ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'admin-panel';
  breakpointObserver = inject(BreakpointObserverService);
  uiService = inject(UiService);

  ngOnInit(): void {
    this.initBreakpointObserver();
  }

  constructor(private destroyRef: DestroyRef) {}

  /**
   * initializes the cdk breakpoint observer
   * show sidebar > 1000px and hide below 1000px
   */
  initBreakpointObserver(): void {
    this.breakpointObserver
      .getObserver()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.uiService.isSidebarPresented = !result.matches;
      });
  }
}
