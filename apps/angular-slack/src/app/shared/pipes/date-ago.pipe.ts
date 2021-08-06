import { Pipe, PipeTransform } from '@angular/core';
import { FirestoreFieldValue, FirestoreTimestamp } from '../models';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: FirestoreFieldValue): string {
    if (!value) return '';

    const date = (value as FirestoreTimestamp).toDate().getTime();
    const seconds = Math.floor((new Date().getTime() - date) / 1000);
    let counter: number;

    if (seconds < 29) return 'Just now';

    for (const interval in this.intervals) { // tslint:disable-line
      counter = Math.floor(seconds / this.intervals[interval]);
      if (counter > 0) {
        return `${counter} ${interval}${counter === 1 ? '' : 's' } ago`;
      }
    }
  }

  private get intervals() {
    return {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };
  }
}
