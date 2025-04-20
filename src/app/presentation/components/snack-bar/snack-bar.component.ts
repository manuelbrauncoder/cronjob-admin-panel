import { Component, inject } from '@angular/core';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-snack-bar',
  imports: [],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent {
    snack = inject(SnackService);
}
