import { Component, inject } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { CommonModule } from '@angular/common';
import { slideIn } from '../../utils/animations';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  animations: [slideIn],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  uiService = inject(UiService);
}
