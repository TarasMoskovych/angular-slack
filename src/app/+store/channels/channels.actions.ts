import { Action } from '@ngrx/store';

import { Channel } from 'src/app/shared';

export enum ChannelsActionTypes {
  ADD_CHANNEL_INIT       = '[Channels] Add Channel Init',
  ADD_CHANNEL            = '[Channels] Add Channel',
  ADD_CHANNEL_SUCCESS    = '[Channels] Add Channel Success',
  ADD_CHANNEL_ERROR      = '[Channels] Add Channel Error',

  GET_CHANNELS           = '[Channels] Get Channels',
  GET_CHANNELS_SUCCESS   = '[Channels] Get Channels Success',
  GET_CHANNELS_ERROR     = '[Channels] Get Channels Error',

  SELECT_CHANNEL         = '[Channels] Select Channel',
  SELECT_CHANNEL_SUCCESS = '[Channels] Select Channel Success',
  SELECT_CHANNEL_ERROR   = '[Channels] Select Channel Error',
}

export class AddChannelInit implements Action {
  readonly type = ChannelsActionTypes.ADD_CHANNEL_INIT;
}

export class AddChannel implements Action {
  readonly type = ChannelsActionTypes.ADD_CHANNEL;
  constructor(public payload: Channel) { }
}

export class AddChannelSuccess implements Action {
  readonly type = ChannelsActionTypes.ADD_CHANNEL_SUCCESS;
}

export class AddChannelError implements Action {
  readonly type = ChannelsActionTypes.ADD_CHANNEL_ERROR;
  constructor(public payload: firebase.auth.Error) { }
}

export class GetChannels implements Action {
  readonly type = ChannelsActionTypes.GET_CHANNELS;
}

export class GetChannelsSuccess implements Action {
  readonly type = ChannelsActionTypes.GET_CHANNELS_SUCCESS;
  constructor(public payload: Channel[]) { }
}

export class GetChannelsError implements Action {
  readonly type = ChannelsActionTypes.GET_CHANNELS_ERROR;
  constructor(public payload: any) { }
}

export class SelectChannel implements Action {
  readonly type = ChannelsActionTypes.SELECT_CHANNEL;
  constructor(public payload: Channel) { }
}

export class SelectChannelSuccess implements Action {
  readonly type = ChannelsActionTypes.SELECT_CHANNEL_SUCCESS;
  constructor(public payload: Channel) { }
}

export class SelectChannelError implements Action {
  readonly type = ChannelsActionTypes.SELECT_CHANNEL_ERROR;
  constructor(public payload: any) { }
}

export type ChannelsActions
  = AddChannelInit

  | AddChannel
  | AddChannelSuccess
  | AddChannelError

  | GetChannels
  | GetChannelsSuccess
  | GetChannelsError

  | SelectChannel
  | SelectChannelSuccess
  | SelectChannelError;
