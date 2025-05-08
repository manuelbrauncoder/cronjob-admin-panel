import { Component, inject, OnInit } from '@angular/core';
import { CronjobTableComponent } from '../../components/cronjob-table/cronjob-table.component';
import { GetCronjobsUseCaseService } from '../../../application/use-cases/get-cronjobs-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { ExecuteCronJobUseCaseService } from '../../../application/use-cases/execute-cron-job-use-case.service';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { HttpResponse } from '@angular/common/http';
import { CronjobListComponent } from '../../components/cronjob-list/cronjob-list.component';
import { LastLogDialogComponent } from '../../components/last-log-dialog/last-log-dialog.component';
import { UiService } from '../../services/ui.service';
import { fadeIn } from '../../utils/animations';
import { FormsModule } from '@angular/forms';
import { SnackService } from '../../services/snack.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-cronjobs',
  imports: [
    CronjobTableComponent,
    CronjobListComponent,
    LastLogDialogComponent,
    FormsModule,
    InputTextModule,
    FloatLabelModule
  ],
  templateUrl: './cronjobs.component.html',
  styleUrl: './cronjobs.component.scss',
  animations: [fadeIn],
  providers: [
    GetCronjobsUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
    ExecuteCronJobUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
  ],
})
export class CronjobsComponent implements OnInit {
  cronJobs: CronJob[] = [];

  getCronJobsUseCase = inject(GetCronjobsUseCaseService);
  executeCronJobUseCase = inject(ExecuteCronJobUseCaseService);
  uiService = inject(UiService);
  snack = inject(SnackService);

  selectedJobKey: string = '';
  searchTerm: string = '';

  ngOnInit(): void {
    this.getCronJobs();
  }

  /**
   * Filter the cronjobs by the searchTerm
   * @returns filtered cronjobs, or if searchTerm is empty, all cronjobs
   */
  filteredJobs(): CronJob[] {
    if (this.searchTerm.length === 0) {
      return this.cronJobs;
    }
    return this.cronJobs.filter((job) =>
      job.key.toLowerCase().includes(this.searchTerm)
    );
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

  hideLastLogDialog(): void {
    this.uiService.isLastLogDialogPresented = false;
  }
}
