import { Theme } from '@angular-slack/app/shared';

const defaultTheme: Theme = {
  primary: '#4C3C4C',
  secondary: '#EEEEEE',
  edit: false,
};

export interface ThemesState {
  selected: Theme;
  themes: Theme[];
}

export const initialThemesState: ThemesState = {
  selected: defaultTheme,
  themes: [defaultTheme],
};
