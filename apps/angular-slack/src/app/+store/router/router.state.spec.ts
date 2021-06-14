import { RouterStateSnapshot } from '@angular/router';
import { CustomSerializer } from './router.state';

describe('RouterState', () => {
  describe('CustomSerializer', () => {
    const routerStateSerializer = new CustomSerializer();
    const routerState: RouterStateSnapshot = {
      url: '/app',
      root: {
        queryParams: {},
        firstChild: {
          params: {},
          fragment: '#fragment',
          url: [{
            path: '/main',
          }],
        },
      },
    } as RouterStateSnapshot;

    it('should return correct data', () => {
      expect(routerStateSerializer.serialize(routerState)).toEqual({
        url: '/app',
        queryParams: {},
        params: {},
        fragment: '#fragment',
      });
    });
  });
});
