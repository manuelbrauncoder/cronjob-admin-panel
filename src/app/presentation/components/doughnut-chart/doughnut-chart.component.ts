import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  imports: [BaseChartDirective],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss',
})
export class DoughnutChartComponent implements OnChanges {
  @Input() cronJobs: CronJob[] = [];
  labels: string[] = ['Success', 'Error'];
  errorColor: string = '#ed1e79'
  successColor: string = '#92c83e'
  title: string = 'Error on last Execution';

  data: ChartData<'doughnut'> = {
    labels: this.labels,
    datasets: [
      {
        data: [0, 0],
        backgroundColor: [this.successColor, this.errorColor],
      },
    ],
  };

  options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: this.title
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cronJobs']) {
      this.updateData();
    }
  }

  updateData(): void {
    const total = this.cronJobs.length;
    const errors = this.cronJobs.filter(
      (job) => job.errorOnLastExecution
    ).length;
    const success = total - errors;

    this.data = {
      labels: this.labels,
      datasets: [
        {
          data: [success, errors],
          backgroundColor: [this.successColor, this.errorColor],
        },
      ],
    };
  }
}
