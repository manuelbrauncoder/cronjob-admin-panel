import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
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
    if (window.innerWidth < 1200) {
      this.uiService.isSidebarPresented = false;
    }
  }

}
