import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/ui.service';
import { SnackService } from '../../services/snack.service';
import { SnackBarComponent } from "../../components/snack-bar/snack-bar.component";
import { snackIn } from '../../utils/animations';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, RouterOutlet, SidebarComponent, CommonModule, SnackBarComponent],
  animations: [snackIn],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  uiService = inject(UiService);
  snack = inject(SnackService);
}
