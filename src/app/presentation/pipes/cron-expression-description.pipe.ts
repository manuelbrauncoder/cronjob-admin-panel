import { Pipe, PipeTransform } from '@angular/core';
import cronstrue from 'cronstrue';

@Pipe({
  name: 'cronExpressionDescription',
})
export class CronExpressionDescriptionPipe implements PipeTransform {
  transform(expression?: string): string {
    if (!expression) {
      return '';
    }
    try {
      return cronstrue.toString(expression, { use24HourTimeFormat: false });
    } catch {
      return expression;
    }
    
  }
}
