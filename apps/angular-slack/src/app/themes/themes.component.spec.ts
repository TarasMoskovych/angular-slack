import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { addTheme, editTheme, removeTheme, selectTheme, themesSelectedSelector, themesSelector } from '../+store';
import { mockDialog, mockStore, theme, theme2 } from '../mocks';
import { Theme } from '../shared';
import { ThemesComponent } from './themes.component';

describe('ThemesComponent', () => {
  let component: ThemesComponent;
  let dialog: jasmine.SpyObj<MatDialog>;
  let store: any;

  beforeEach(() => {
    dialog = mockDialog();
    store = mockStore();
    component = new ThemesComponent(dialog, store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      store.select
        .withArgs(themesSelectedSelector).and.returnValue(of(theme))
        .withArgs(themesSelector).and.returnValue(of([theme, theme2]));

      component.ngOnInit();
    });

    it('should return selected on selected$ subscribe', () => {
      component.selected$.subscribe((value: Theme) => {
        expect(value).toEqual(theme);
      });
    });

    it('should return themes on themes$ subscribe', () => {
      component.themes$.subscribe((value: Theme[]) => {
        expect(value).toEqual([theme, theme2]);
      });
    });
  });

  describe('onAdd', () => {
    beforeEach(() => {
      spyOn(Date, 'now').and.returnValue(1);
    });

    it('should dispatch "addTheme" on modal submit', async() => {
      dialog.open.and.returnValue({ afterClosed: () => of(theme) } as MatDialogRef<typeof component>);
      await component.onAdd();

      expect(store.dispatch).toHaveBeenCalledOnceWith(addTheme({ theme: { ...theme, id: 1 } }));
    });

    it('should not dispatch "addTheme" on modal cancel', async() => {
      dialog.open.and.returnValue({ afterClosed: () => of(undefined) } as MatDialogRef<typeof component>);
      await component.onAdd();

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('onEdit', () => {
    it('should dispatch "editTheme" on modal submit', async() => {
      dialog.open.and.returnValue({ afterClosed: () => of(theme) } as MatDialogRef<typeof component>);
      await component.onEdit(theme);

      expect(store.dispatch).toHaveBeenCalledOnceWith(editTheme({ theme }));
    });

    it('should not dispatch "editTheme" on modal cancel', async() => {
      dialog.open.and.returnValue({ afterClosed: () => of(undefined) } as MatDialogRef<typeof component>);
      await component.onEdit(theme);

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('onSelect', () => {
    it('should dispatch "selectTheme" action', () => {
      component.onSelect(theme);
      expect(store.dispatch).toHaveBeenCalledOnceWith(selectTheme({ theme }));
    });
  });

  describe('onRemove', () => {
    it('should dispatch "removeTheme" action', () => {
      component.onRemove(theme);
      expect(store.dispatch).toHaveBeenCalledOnceWith(removeTheme({ theme }));
    });
  });
});
