import { Component, inject, model } from '@angular/core';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { UiService } from '../../services/ui.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { BoolToTextPipe } from '../../pipes/bool-to-text.pipe';
import { HandleKeyPipe } from '../../pipes/handle-key.pipe';
import { CronExpressionDescriptionPipe } from '../../pipes/cron-expression-description.pipe';
import { ExecuteJobButtonComponent } from "../execute-job-button/execute-job-button.component";

@Component({
  selector: 'app-cronjob-list',
  imports: [
    DatePipe,
    BoolToTextPipe,
    HandleKeyPipe,
    CronExpressionDescriptionPipe,
    CommonModule,
    ExecuteJobButtonComponent
],
  templateUrl: './cronjob-list.component.html',
  styleUrl: './cronjob-list.component.scss',
})
export class CronjobListComponent {
  cronJobs = model.required<CronJob[]>();
  cronJobKey = model<string>();
  uiService = inject(UiService);
  router = inject(Router);

  redirectToDetail({ key }: { key: string }): void {
    this.router.navigate(['/cronjobs', key]);
  }

  showLastLogDialog({ key }: { key: string }): void {
    this.cronJobKey.set(key);
    this.uiService.isLastLogDialogPresented = true;
  }

  hideLastLogDialog(): void {
    this.uiService.isLastLogDialogPresented = false;
  }
}
