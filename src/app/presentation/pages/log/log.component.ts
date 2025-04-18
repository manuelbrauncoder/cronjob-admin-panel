import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetLastLogUseCaseService } from '../../../application/use-cases/get-last-log-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';
import { Log } from '../../../domain/models/log.interface';

@Component({
  selector: 'app-log',
  imports: [],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
  providers: [
    GetLastLogUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
  ],
})
export class LogComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  cronJobKey: string | null = null;
  getLastLogUseCase = inject(GetLastLogUseCaseService);

  ngOnInit(): void {
    this.cronJobKey = this.activatedRoute.snapshot.paramMap.get('id');
    this.getLastLog();
  }

  getLastLog() {
    if (this.cronJobKey) {
      this.getLastLogUseCase.execute({ key: this.cronJobKey }).subscribe({
        next: (response: HttpResponse<Log>) => {
          if (response.status === 200) {
            console.log(response.body as Log);
          }
        },
        error: (err) => {
          console.log('Error fetching last log:', err);
        },
      });
    }
  }
}
