import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cronExpressionDescription'
})
export class CronExpressionDescriptionPipe implements PipeTransform {

  transform(expr: string): string {
    const [min, hour, dayOfMonth, month, dayOfWeek] = expr.trim().split(' ');

    // Map for day‑of‑week names
    const days: Record<string, string> = {
      'MON': 'Monday', 'TUE': 'Tuesday', 'WED': 'Wednesday',
      'THU': 'Thursday', 'FRI': 'Friday', 'SAT': 'Saturday', 'SUN': 'Sunday',
      '0': 'Sunday', '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday',
      '4': 'Thursday', '5': 'Friday', '6': 'Saturday', '7': 'Sunday'
    };

    // Every N minutes: */n * * * *
    if (min.startsWith('*/') && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
      const interval = min.slice(2);
      return `every ${interval} minutes`;
    }

    // Daily at fixed time: m h * * *
    if (min !== '*' && hour !== '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
      return `daily at ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
    }

    // Weekly on specific day: m h * * DOW
    if (min !== '*' && hour !== '*' && dayOfMonth === '*' && month === '*' && dayOfWeek !== '*') {
      const dayName = days[dayOfWeek] || dayOfWeek;
      return `every ${dayName} at ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
    }

    // Monthly on specific date: m h DOM * *
    if (min !== '*' && hour !== '*' && dayOfMonth !== '*' && month === '*' && dayOfWeek === '*') {
      return `on day ${dayOfMonth} of each month at ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
    }

    // Every N days: m h */n * *
    if (min !== '*' && hour !== '*' && dayOfMonth.startsWith('*/') && month === '*' && dayOfWeek === '*') {
      const daysInterval = dayOfMonth.slice(2);
      return `every ${daysInterval} days at ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
    }

    // Fallback: return raw expression
    return expr;
  }

}
