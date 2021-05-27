import { CustomValidators, GlobalErrorStateMatcher, ParentErrorStateMatcher } from './validators.helper';

describe('validators', () => {
  describe('CustomValidators', () => {
    describe('passwordMatcher', () => {
      it('should return null if values equal', () => {
        const control = {
          value: '123456',
          get(key: string) {
            return this;
          }
        } as any;

        expect(CustomValidators.passwordMatcher(control)).toBeNull();
      });

      it('should return passwordMatch if values do not equal', () => {
        const control = {
          get(key: string) {
            if (key === 'password') {
              return { value: '12345' };
            };
            return { value: '123456' };
          },
        } as any;

        expect(CustomValidators.passwordMatcher(control)).toEqual({ passwordMatch: true });
      });
    });
  });

  describe('GlobalErrorStateMatcher', () => {
    let errorStateMatcher: GlobalErrorStateMatcher;

    beforeEach(() => {
      errorStateMatcher = new GlobalErrorStateMatcher();
    });

    it('should return true if control is touched and invalid', () => {
      const form = {
        submitted: false,
      } as any;
      const control = {
        invalid: true,
        touched: true,
      } as any;

      expect(errorStateMatcher.isErrorState(control, form)).toBe(true);
    });

    it('should return true if control is dirty, pristine and invalid', () => {
      const form = {
        submitted: false,
      } as any;
      const control = {
        invalid: true,
        pristine: true,
        dirty: true,
      } as any;

      expect(errorStateMatcher.isErrorState(control, form)).toBe(true);
    });

    it('should return true if control is invalid and form is submitted', () => {
      const form = {
        submitted: true,
      } as any;
      const control = {
        invalid: true,
      } as any;

      expect(errorStateMatcher.isErrorState(control, form)).toBe(true);
    });

    it('should return false if control is valid', () => {
      const form = {
        submitted: true,
      } as any;
      const control = {
        invalid: false,
      } as any;

      expect(errorStateMatcher.isErrorState(control, form)).toBe(false);
    });
  });

  describe('ParentErrorStateMatcher', () => {
    let errorStateMatcher: ParentErrorStateMatcher;

    beforeEach(() => {
      errorStateMatcher = new ParentErrorStateMatcher();
    });

    it('should return true if control is touched and invalid', () => {
      const form = {
        submitted: false,
      } as any;
      const control = {
        parent: {
          invalid: false,
        },
        invalid: true,
        touched: true,
      } as any;

      expect(errorStateMatcher.isErrorState(control, form)).toBe(true);
    });

    it('should return true if control is touched and parent control is invalid', () => {
      const form = {
        submitted: false,
      } as any;
      const control = {
        parent: {
          invalid: true,
        },
        invalid: false,
        touched: true,
      } as any;

      expect(errorStateMatcher.isErrorState(control, form)).toBe(true);
    });

    it('should return true if control is dirty, pristine and invalid', () => {
      const form = {
        submitted: false,
      } as any;
      const control = {
        invalid: true,
        pristine: true,
        dirty: true,
        parent: {
          invalid: false,
        }
      } as any;

      expect(errorStateMatcher.isErrorState(control, form)).toBe(true);
    });

    it('should return true if control is invalid and form is submitted', () => {
      const form = {
        submitted: true,
      } as any;
      const control = {
        invalid: true,
        parent: {
          invalid: false,
        },
      } as any;

      expect(errorStateMatcher.isErrorState(control, form)).toBe(true);
    });

    it('should return false if control is valid', () => {
      const form = {
        submitted: true,
      } as any;
      const control = {
        invalid: false,
        parent: {
          invalid: false,
        },
      } as any;

      expect(errorStateMatcher.isErrorState(control, form)).toBe(false);
    });
  });
});
