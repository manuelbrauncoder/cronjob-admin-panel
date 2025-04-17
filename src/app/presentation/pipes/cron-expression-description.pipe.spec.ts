import { CronExpressionDescriptionPipe } from './cron-expression-description.pipe';

describe('CronExpressionDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new CronExpressionDescriptionPipe();
    expect(pipe).toBeTruthy();
  });
});
