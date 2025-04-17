import { Component } from '@angular/core';
import { CronjobTableComponent } from "../../components/cronjob-table/cronjob-table.component";

@Component({
  selector: 'app-cronjobs',
  imports: [CronjobTableComponent],
  templateUrl: './cronjobs.component.html',
  styleUrl: './cronjobs.component.scss'
})
export class CronjobsComponent {

}
