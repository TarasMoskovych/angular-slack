import { Renderer2 } from '@angular/core';

import { mockRenderer } from 'src/app/mock';
import { ButtonWithIconComponent } from './button-with-icon.component';

describe('ButtonWithIconComponent', () => {
  let component: ButtonWithIconComponent;
  let renderer: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    renderer = mockRenderer();
    component = new ButtonWithIconComponent(renderer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleColor', () => {
    beforeEach(() => {
      component.iconColor = '#fff';
      component.color = '#000';
      component.button = {
        nativeElement: {},
      };
    });

    it('should set iconColor', () => {
      component.toggleColor(true);
      expect(renderer.setStyle).toHaveBeenCalledOnceWith(component.button.nativeElement, 'background-color', component.iconColor);
    });

    it('should set color', () => {
      component.toggleColor(false);
      expect(renderer.setStyle).toHaveBeenCalledOnceWith(component.button.nativeElement, 'background-color', component.color);
    });
  });
});
