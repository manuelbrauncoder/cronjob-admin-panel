import { Component, inject, OnInit } from '@angular/core';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { GetCronjobsUseCaseService } from '../../../application/use-cases/get-cronjobs-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';
import { SnackService } from '../../services/snack.service';
import { DoughnutChartComponent } from "../../components/doughnut-chart/doughnut-chart.component";
import { BarChartComponent } from "../../components/bar-chart/bar-chart.component";

@Component({
  selector: 'app-dashboard',
  imports: [DoughnutChartComponent, BarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [
    GetCronjobsUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
  ],
})
export class DashboardComponent implements OnInit {
  cronJobs: CronJob[] = [];
  getCronJobsUseCase = inject(GetCronjobsUseCaseService);
  snack = inject(SnackService);

  ngOnInit(): void {
    this.getCronJobs();
  }

  getCronJobs(): void {
    this.getCronJobsUseCase.execute().subscribe({
      next: (response: HttpResponse<CronJob[]>) => {
        if (response.status === 200) {
          this.cronJobs = response.body as CronJob[];
        } else {
          this.snack.presentSnack({
            err: true,
            message: `Error: ${response.status}`,
          });
        }
      },
      error: (err) => {
        this.snack.presentSnack({ err: true, message: `Error: ${err}` });
      },
    });
  }
}
