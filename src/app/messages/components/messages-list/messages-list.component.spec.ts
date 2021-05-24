import { fakeAsync, tick } from '@angular/core/testing';
import { MessagesListComponent } from './messages-list.component';

describe('MessagesListComponent', () => {
  let component: MessagesListComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    nativeElement = { scrollIntoView: jasmine.createSpy() } as any;
    component = new MessagesListComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should call scrollIntoView', fakeAsync(() => {
      component.list = { last: nativeElement } as any;
      component.ngOnChanges();
      tick();

      expect(nativeElement.scrollIntoView).toHaveBeenCalledTimes(1);
    }));

    it('should not call scrollIntoView when last element is not defined', () => {
      component.list = {} as any;
      component.ngOnChanges();

      expect(nativeElement.scrollIntoView).not.toHaveBeenCalled();
    });

    it('should not call scrollIntoView when list is not defined', () => {
      component.list = undefined;
      component.ngOnChanges();

      expect(nativeElement.scrollIntoView).not.toHaveBeenCalled();
    });
  });
});
