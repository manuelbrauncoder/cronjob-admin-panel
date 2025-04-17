import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CronjobApiService } from './infrastructure/services/cronjob-api.service';
import { MainLayoutComponent } from "./presentation/layout/main-layout/main-layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'admin-panel';

  apiService = inject(CronjobApiService);

  ngOnInit(): void {
    this.apiService.getJobList()
    .subscribe({
      next: (data) => {
        console.log('Status:', data.status);
        console.log('Data:', data.body);
      },
      error: (err) => {
        
      }
    })
  }
}
