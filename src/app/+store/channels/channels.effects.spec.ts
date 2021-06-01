import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';

import { ChannelsService, UserProfileService } from 'src/app/core';
import { channel, error, mockStore, user } from 'src/app/mocks';
import * as ChannelsActions from './channels.actions';
import { ChannelsEffects } from './channels.effects';
import { ChannelsState } from './channels.state';

describe('ChannelsEffects', () => {
  const channelsServiceSpy: jasmine.SpyObj<ChannelsService> = jasmine.createSpyObj('ChannelsService', [
    'add',
    'get',
    'getStarred',
    'update',
    'remove',
  ]);
  const userServiceSpy: jasmine.SpyObj<UserProfileService> = jasmine.createSpyObj('UserProfileService', ['getById']);
  const store: jasmine.SpyObj<Store<ChannelsState>> = mockStore();

  describe('add$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of(ChannelsActions.addChannel));
      store.select.and.returnValue(of(user));
    });

    it('should return correct data when success', () => {
      channelsServiceSpy.add.and.returnValue(of(channel));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.add$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.addChannelSuccess.type);
        expect(action.channel).toEqual({ ...channel, createdBy: user });
      });
    });

    it('should return correct data when error', () => {
      channelsServiceSpy.add.and.returnValue(throwError(error));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.add$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.addChannelError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('get$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of(ChannelsActions.getChannels));
    });

    it('should return correct data when success', () => {
      channelsServiceSpy.get.and.returnValue(of([channel]));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.get$.subscribe(action => {
        expect(action.type).toBe(ChannelsActions.getChannelsSuccess.type);
      });
    });

    it('should return correct data when error', () => {
      channelsServiceSpy.get.and.returnValue(throwError(error));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.get$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.getChannelsError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('getStarred$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of(ChannelsActions.getStarredChannels));
    });

    it('should return correct data when success', () => {
      channelsServiceSpy.getStarred.and.returnValue(of([channel]));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.getStarred$.subscribe(action => {
        expect(action.type).toBe(ChannelsActions.getStarredChannelsSuccess.type);
      });
    });

    it('should return correct data when error', () => {
      channelsServiceSpy.getStarred.and.returnValue(throwError(error));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.getStarred$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.getStarredChannelsError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('getSuccess$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: ChannelsActions.getChannelsSuccess.type,
        channels: [channel],
      }));
    });

    it('should return correct data and dispatch selectChannel when selected is null', () => {
      store.select.and.returnValue(of(undefined));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.getSuccess$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.selectChannel.type);
        expect(action.channel).toEqual(channel);
      });
    });

    it('should return correct data and dispatch selectChannelSuccess when selected is defined', () => {
      store.select.and.returnValue(of(channel));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.getSuccess$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.selectChannelSuccess.type);
        expect(action.channel).toEqual(channel);
      });
    });
  });

  describe('select$', () => {
    let actions$: Actions;

    it('should return correct data when success', () => {
      actions$ = new Actions(of({
        type: ChannelsActions.selectChannel.type,
        channel,
      }));
      userServiceSpy.getById.and.returnValue(of(user));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.select$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.selectChannelSuccess.type);
        expect(action.channel).toEqual({ ...channel, createdBy: user });
      });
    });

    it('should throw and error when user or channel is not defined', () => {
      actions$ = new Actions(of({ type: ChannelsActions.selectChannel.type }));
      userServiceSpy.getById.and.returnValue(of(undefined));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.select$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.selectChannelError.type);
        expect(action.error.message).toBe('User or Channel is not defined');
      });
    });

    it('should return correct data when error', () => {
      actions$ = new Actions(of({
        type: ChannelsActions.selectChannel.type,
        channel,
      }));
      userServiceSpy.getById.and.returnValue(throwError(error));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.select$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.selectChannelError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('update$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of(ChannelsActions.updateChannel));
    });

    it('should return correct data when success', () => {
      channelsServiceSpy.update.and.returnValue(of(channel));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.update$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.updateChannelSuccess.type);
        expect(action.channel).toEqual(channel);
      });
    });

    it('should return correct data when error', () => {
      channelsServiceSpy.update.and.returnValue(throwError(error));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.update$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.updateChannelError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('remove$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: ChannelsActions.removeChannel.type,
        channel,
      }));
    });

    it('should return correct data when success', () => {
      channelsServiceSpy.remove.and.returnValue(of(channel));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.remove$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.removeChannelSuccess.type);
        expect(action.channel).toEqual(channel);
      });
    });

    it('should return correct data when error', () => {
      channelsServiceSpy.remove.and.returnValue(throwError(error));
      const effects = new ChannelsEffects(actions$, channelsServiceSpy, userServiceSpy, store);

      effects.remove$.subscribe((action: any) => {
        expect(action.type).toBe(ChannelsActions.removeChannelError.type);
        expect(action.error).toEqual(error);
      });
    });
  });
});
