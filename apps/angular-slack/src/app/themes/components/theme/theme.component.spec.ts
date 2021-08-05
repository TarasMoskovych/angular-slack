import { theme } from '@angular-slack/app/mocks';
import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
  let component: ThemeComponent;

  beforeEach(() => {
    component = new ThemeComponent();
    component.theme = theme;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onRemove', () => {
    beforeEach(() => {
      spyOn(component.remove, 'emit');
    });

    it('should emit "remove" event', () => {
      component.onRemove();
      expect(component.remove.emit).toHaveBeenCalledOnceWith(component.theme);
    });
  });
});
