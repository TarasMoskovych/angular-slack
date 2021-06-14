import { channel } from '@angular-slack/app/mocks';
import { ChannelsFormComponent } from './channels-form.component';

describe('ChannelsFormComponent', () => {
  let component: ChannelsFormComponent;

  beforeEach(() => {
    component = new ChannelsFormComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create form with empty fields', () => {
      component.ngOnInit();
      expect(component.form.get('name').value).toBeNull();
    });

    it('should create form with set fields', () => {
      component.channel = channel;
      component.ngOnInit();
      expect(component.form.get('name').value).toBe(channel.name);
    });

    afterEach(() => {
      expect(Object.keys(component.form.controls)).toEqual(['name', 'description']);
    });
  });

  describe('ngOnChanges', () => {
    it('should not patch values when form is undefined', () => {
      component.ngOnChanges({ channel } as any);
      expect(component.form).toBeUndefined();
    });

    describe('form exists', () => {
      beforeEach(() => {
        component.ngOnInit();
        spyOn(component.form, 'patchValue');
      })

      it('should not patch value when channel is falsy', () => {
        component.ngOnChanges({});
        expect(component.form.patchValue).not.toHaveBeenCalled();
      });

      it('should patch value when channel is defined', () => {
        component.channel = channel;
        component.ngOnChanges({ channel } as any);
        expect(component.form.patchValue).toHaveBeenCalledOnceWith({ name: channel.name, description: channel.description });
      });
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.ngOnInit();
      spyOn(component.submitEmitter, 'emit');
    });

    it('should not emit event when form is not valid', () => {
      component.onSubmit();
      expect(component.submitEmitter.emit).not.toHaveBeenCalled();
    });

    it('should emit event when form is valid', () => {
      component.form.patchValue({ name: channel.name, description: channel.description });
      component.onSubmit();
      expect(component.submitEmitter.emit).toHaveBeenCalledOnceWith(component.form.value);
    });
  });
});
