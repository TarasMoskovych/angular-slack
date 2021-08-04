import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Theme } from '@angular-slack/app/shared';

export const DEFAULT_THEME: Theme = {
  id: 1,
  primary: '#4C3C4C',
  secondary: '#EEEEEE',
  edit: false,
};

export const themeAdapter: EntityAdapter<Theme> = createEntityAdapter<Theme>();

export interface ThemesState extends EntityState<Theme> {
  readonly selected: Theme;
}

export const initialThemesState: ThemesState = themeAdapter.getInitialState({
  selected: null,
});
