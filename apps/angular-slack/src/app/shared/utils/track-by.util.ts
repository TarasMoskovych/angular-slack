export abstract class TrackByUtil<T extends { id: string | number }> {
  trackByFn(idx: number, item: T) {
    return item.id || idx;
  }
}
