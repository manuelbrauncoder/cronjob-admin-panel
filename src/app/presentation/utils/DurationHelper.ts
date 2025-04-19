import { Duration } from '../interfaces/duration.interface';

export class DurationHelper {
  calculateDuration({ startTime, endTime }: Duration): string {
    if (endTime == null || startTime == null) {
      return '';
    }

    const start = Date.parse(startTime);
    const end = Date.parse(endTime);
    const diff = end - start;

    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const remM = mins % 60;

    return `${hrs}h ${remM}m`;
  }
}
