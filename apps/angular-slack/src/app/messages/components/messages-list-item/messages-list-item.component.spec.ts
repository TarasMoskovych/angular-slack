import { ElementRef } from '@angular/core';
import { message, mockElementRef, user } from '@angular-slack/app/mocks';

import { MessagesListItemComponent } from './messages-list-item.component';

describe('MessagesListItemComponent', () => {
  let component: MessagesListItemComponent;
  let elementRef: jasmine.SpyObj<ElementRef>;

  beforeEach(() => {
    elementRef = mockElementRef();
    component = new MessagesListItemComponent(elementRef);
    component.message = message;
    component.user = user;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('scrollIntoView', () => {
    beforeEach(() => {
      component.scrollIntoView();
    });

    it('should call scrollIntoView from elementRef', () => {
      expect(elementRef.nativeElement.scrollIntoView).toHaveBeenCalledOnceWith({ behavior: 'smooth' });
    });
  });

  describe('get outcome', () => {
    it('should return true when message uid and user uid equal', () => {
      expect(component.outcome).toBeTrue();
    });
  });
});
