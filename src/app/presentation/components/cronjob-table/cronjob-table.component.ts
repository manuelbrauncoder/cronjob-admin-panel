import { Component, inject, OnInit } from '@angular/core';
import { Cronjob } from '../../../domain/models/cronjob.interface';
import { GetCronjobsUseCaseService } from '../../../application/use-cases/get-cronjobs-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';

@Component({
  selector: 'app-cronjob-table',
  imports: [],
  templateUrl: './cronjob-table.component.html',
  styleUrl: './cronjob-table.component.scss',
  providers: [GetCronjobsUseCaseService, {
    provide: CronJobRepository, useClass: CronjobApiService
  }]
})
export class CronjobTableComponent implements OnInit {
  cronjobs: Cronjob[] = [];
  getCronjobsUseCase = inject(GetCronjobsUseCaseService);

  ngOnInit(): void {
    this.getCronjobsUseCase.execute()
    .subscribe({
      next: (response) => {
          console.log(response.status);
          console.log(response.body);
          
      },
      error: (err) => {

      }
    })
  }

}
