import { Component, OnInit } from '@angular/core';
import { Cronjob } from '../../../domain/models/cronjob.interface';

@Component({
  selector: 'app-cronjob-table',
  imports: [],
  templateUrl: './cronjob-table.component.html',
  styleUrl: './cronjob-table.component.scss'
})
export class CronjobTableComponent implements OnInit {
  cronjobs: Cronjob[] = [];

  ngOnInit(): void {
    // fetch list
  }

}
