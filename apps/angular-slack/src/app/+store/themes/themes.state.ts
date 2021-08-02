import { Theme } from '@angular-slack/app/shared';

export const DEFAULT_THEME: Theme = {
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
  selected: null,
  themes: [],
};
