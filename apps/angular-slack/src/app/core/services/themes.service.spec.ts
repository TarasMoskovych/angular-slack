import { theme, theme2 } from '@angular-slack/app/mocks';
import { Theme } from '@angular-slack/app/shared';
import { ThemesService } from './themes.service';

describe('ThemesService', () => {
  let service: ThemesService;
  let storage: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    storage = jasmine.createSpyObj('Storage', ['getItem', 'setItem']);
    service = new ThemesService(storage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should return default theme', () => {
      storage.getItem.and.returnValue(null);

      service.get().subscribe(({ themes, selected }) => {
        expect(themes).toEqual([theme]);
        expect(selected).toEqual(theme);
      });
    });
  });

  describe('add', () => {
    it('should add new theme and return it', () => {
      storage.getItem.and.returnValue(null);

      service.add(theme).subscribe((result: Theme) => {
        expect(storage.setItem).toHaveBeenCalledTimes(2);
        expect(result).toEqual(theme);
      });
    });
  });

  describe('edit', () => {
    beforeEach(() => {
      spyOn(service, 'getThemes').and.returnValue([theme, theme2]);
    });

    it('should edit current theme and return it', () => {
      storage.getItem.and.returnValue(null);

      service.edit(theme).subscribe((result: Theme) => {
        expect(storage.setItem).toHaveBeenCalledTimes(2);
        expect(result).toEqual(theme);
      });
    });
  });

  describe('select', () => {
    it('should select current theme and return it', () => {
      storage.getItem.and.returnValue(null);

      service.select(theme).subscribe((result: Theme) => {
        expect(storage.setItem).toHaveBeenCalledTimes(1);
        expect(result).toEqual(theme);
      });
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      spyOn(service, 'getThemes').and.returnValue([theme, theme2]);
    });

    it('should remove current theme and update selected', () => {
      storage.getItem.and.returnValue(JSON.stringify(theme));

      service.remove(theme).subscribe((result: Theme) => {
        expect(storage.setItem).toHaveBeenCalledTimes(2);
        expect(result).toEqual(theme);
      });
    });

    it('should remove current theme and do not update selected', () => {
      storage.getItem.and.returnValue(JSON.stringify(theme2));

      service.remove(theme).subscribe((result: Theme) => {
        expect(storage.setItem).toHaveBeenCalledTimes(1);
        expect(result).toEqual(theme);
      });
    });
  });
});
