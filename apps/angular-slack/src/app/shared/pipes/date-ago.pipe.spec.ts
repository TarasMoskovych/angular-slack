import { DateAgoPipe } from './date-ago.pipe';

class TimestampMock {
  constructor(public date: Date) {}

  toDate() {
    return this.date;
  }
}

describe('DateAgoPipe', () => {
  let pipe = new DateAgoPipe();
  const todayMockDate = new Date('2021-05-24T06:00:00').getTime();
  const OriginalDate = Date;

  beforeEach(() => {
    spyOn(window, 'Date').and.callFake(function(date: string) {
      return {
        getTime: () => date ? new OriginalDate(date).getTime() : todayMockDate,
      };
    } as any);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return empty string when the value is falsy', () => {
      expect(pipe.transform(null)).toBe('');
    });

    it('should return "Just now"', () => {
      expect(pipe.transform(new TimestampMock(new OriginalDate('2021-05-24T05:59:59')) as any)).toBe('Just now');
    });

    it('should return "1 minute ago"', () => {
      expect(pipe.transform(new TimestampMock(new OriginalDate('2021-05-24T05:59:00')) as any)).toBe('1 minute ago');
    });

    it('should return "2 minutes ago"', () => {
      expect(pipe.transform(new TimestampMock(new OriginalDate('2021-05-24T05:58:00')) as any)).toBe('2 minutes ago');
    });

    it('should return "1 hour ago"', () => {
      expect(pipe.transform(new TimestampMock(new OriginalDate('2021-05-24T05:00:00')) as any)).toBe('1 hour ago');
    });

    it('should return "1 day ago"', () => {
      expect(pipe.transform(new TimestampMock(new OriginalDate('2021-05-23T06:00:00')) as any)).toBe('1 day ago');
    });

    it('should return "1 week ago"', () => {
      expect(pipe.transform(new TimestampMock(new OriginalDate('2021-05-17T06:00:00')) as any)).toBe('1 week ago');
    });

    it('should return "1 month ago"', () => {
      expect(pipe.transform(new TimestampMock(new OriginalDate('2021-04-24T06:00:00')) as any)).toBe('1 month ago');
    });

    it('should return "1 year ago"', () => {
      expect(pipe.transform(new TimestampMock(new OriginalDate('2020-05-24T06:00:00')) as any)).toBe('1 year ago');
    });
  });
});
