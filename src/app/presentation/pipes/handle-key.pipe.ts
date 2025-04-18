import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'handleKey',
})
export class HandleKeyPipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) {
      return '';
    }
    const stringWithoutScores = value.replaceAll('-', ' ');
    return (
      stringWithoutScores.charAt(0).toUpperCase() + stringWithoutScores.slice(1)
    );
  }
}
