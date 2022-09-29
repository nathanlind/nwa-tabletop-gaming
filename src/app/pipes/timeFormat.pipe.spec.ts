import { TimeFormatPipe } from './timeFormat.pipe';

describe('ConvertTime24To12Pipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
