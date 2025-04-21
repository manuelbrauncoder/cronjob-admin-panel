import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { GetLastLogUseCaseService } from '../../../application/use-cases/get-last-log-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { DurationKeyPair } from '../../interfaces/durationKeyPari.interface';
import { DurationHelper } from '../../utils/DurationHelper';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
  providers: [
    GetLastLogUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
  ],
})
export class BarChartComponent implements OnChanges {
  @Input() cronJobs: CronJob[] = [];
  durationKeyPairs: DurationKeyPair[] = [];
  getLastLogUseCase = inject(GetLastLogUseCaseService);
  accentColor = '#797ef3'

  title: string = 'Duration';

  public data: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Duration in minutes',
        data: [],
        backgroundColor: this.accentColor,
        borderWidth: 1,
      },
    ],
  };

  public options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Cronjob',
        },
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Duration (min)',
        }
      }
    },
    plugins: {
      legend: { display: false },
      title: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  };
  

  /**
   * Fetches the last log for each cronjob,
   * creates a DurationKeyPair and push it
   * into the durationKeyPairs array
   */
  private createData(): void {
    this.cronJobs.forEach((job) => {
      this.getLastDuration({ key: job.key }).subscribe({
        next: (duration: number) => {
          const pair = this.createKeyDurationPair({
            key: job.key,
            duration: duration,
          });
          this.durationKeyPairs.push(pair);
          this.updateChart();
        },
      });
    });
  }

  private createKeyDurationPair(params: {
    key: string;
    duration: number;
  }): DurationKeyPair {
    return {
      key: params.key,
      duration: params.duration,
    };
  }

  /**
   * Fetch the last log for the Cronjob,
   * calculates the duration in minutes
   * @param params
   * @returns the duration as an Observable
   */
  private getLastDuration(params: { key: string }): Observable<number> {
    const { key } = params;
    return this.getLastLogUseCase.execute({ key: key }).pipe(
      map((response) => {
        if (response.status === 200 && response.body) {
          return DurationHelper.calculateDurationInMinutes({
            startTime: response.body.startTime,
            endTime: response.body.endTime,
          });
        }
        return 0;
      }),
      catchError(() => of(0))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cronJobs']) {
      this.createData();
    }
  }

  private updateChart(): void {
    const labels = this.durationKeyPairs.map((p) => p.key);
    const dataVals = this.durationKeyPairs.map((p) => p.duration);

    this.data.labels = labels;
    this.data.datasets[0].data = dataVals;

    this.data = { ...this.data };
  }
}
