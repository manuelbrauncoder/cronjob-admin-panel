import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  router = inject(Router);
  uiService = inject(UiService);

  /**
   * Close the sidebar on mobile
   */
  closeSidebar(): void {
    if (window.innerWidth < 1000) {
      this.uiService.isSidebarPresented = false;
    }
  }

  isRouteActive(): boolean {
    const current = this.router.url;
    return ['/cronjob', '/cronjobs'].some(route => current.startsWith(route));
  }

}
