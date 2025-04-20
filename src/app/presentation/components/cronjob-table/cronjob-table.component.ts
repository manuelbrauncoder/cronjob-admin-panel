import { Component, inject, Input, model } from '@angular/core';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { BoolToTextPipe } from '../../pipes/bool-to-text.pipe';
import { HandleKeyPipe } from '../../pipes/handle-key.pipe';
import { CronExpressionDescriptionPipe } from '../../pipes/cron-expression-description.pipe';
import { Router } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { fadeIn } from '../../utils/animations';
import { ExecuteJobButtonComponent } from "../execute-job-button/execute-job-button.component";

@Component({
  selector: 'app-cronjob-table',
  imports: [
    DatePipe,
    BoolToTextPipe,
    HandleKeyPipe,
    CronExpressionDescriptionPipe,
    CommonModule,
    ExecuteJobButtonComponent
],
  templateUrl: './cronjob-table.component.html',
  styleUrl: './cronjob-table.component.scss',
  animations: [fadeIn],
})
export class CronjobTableComponent {
  cronJobs = model.required<CronJob[]>();
  cronJobKey = model<string>();

  uiService = inject(UiService);
  router = inject(Router);

  showLastLogDialog({ key }: { key: string }): void {
    this.cronJobKey.set(key);
    this.uiService.isLastLogDialogPresented = true;
  }

  hideLastLogDialog(): void {
    this.uiService.isLastLogDialogPresented = false;
  }

  redirectToDetail({ key }: { key: string }): void {
    this.router.navigate(['/cronjobs', key]);
  }
}
