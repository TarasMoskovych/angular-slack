import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';

import * as RouterActions from './router.actions';
import { RouterEffects } from './router.effects';

describe('RouterEffects', () => {
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj('Location', ['back', 'forward']);

  describe('navigate$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: RouterActions.go.type,
        payload: {
          path: ['/app'],
          queryParams: {
            param: '5',
          },
        },
      }));
    });

    it('should navigate', () => {
      const effects = new RouterEffects(actions$, routerSpy, locationSpy);

      effects.navigate$.subscribe(() => {
        expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/app'], { queryParams: { param: '5' } });
      });
    });
  });

  describe('navigateBack$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of(RouterActions.back));
    });

    it('should navigate back', () => {
      const effects = new RouterEffects(actions$, routerSpy, locationSpy);

      effects.navigateBack$.subscribe(() => {
        expect(locationSpy.back).toHaveBeenCalled();
      });
    });
  });

  describe('navigateBack$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of(RouterActions.forward));
    });

    it('should navigate forward', () => {
      const effects = new RouterEffects(actions$, routerSpy, locationSpy);

      effects.navigateForward$.subscribe(() => {
        expect(locationSpy.forward).toHaveBeenCalled();
      });
    });
  });
});
