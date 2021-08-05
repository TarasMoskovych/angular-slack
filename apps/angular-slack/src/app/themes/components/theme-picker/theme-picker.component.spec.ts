import { theme } from '@angular-slack/app/mocks';
import { ThemePickerComponent } from './theme-picker.component';

describe('ThemePickerComponent', () => {
  let component: ThemePickerComponent;

  beforeEach(() => {
    component = new ThemePickerComponent(theme)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
