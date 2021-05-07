import * as RouterActions from './router.actions';

describe('RouterActions', () => {
  describe('go', () => {
    let result: any;

    beforeAll(() => {
      result = RouterActions.go({ payload: { path: ['/app'] } });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Router] Go');
    });

    it('should have correct payload', () => {
      expect(result.payload).toEqual({ path: ['/app'] });
    });
  });

  describe('back', () => {
    let result: any;

    beforeAll(() => {
      result = RouterActions.back();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Router] Back');
    });
  });

  describe('forward', () => {
    let result: any;

    beforeAll(() => {
      result = RouterActions.forward();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Router] Forward');
    });
  });
});
