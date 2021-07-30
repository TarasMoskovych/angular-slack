import { Theme } from '@angular-slack/app/shared';

export const defaultTheme: Theme = {
  id: 1,
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
