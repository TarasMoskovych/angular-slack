import { createAction, props } from '@ngrx/store';

import { AuthError, Channel } from 'src/app/shared';

const BASE = '[Channels]';

// add channels
export const addChannelInit = createAction(
  `${BASE} Add Channel Init`,
);

export const addChannel = createAction(
  `${BASE} Add Channel`,
  props<{ channel: Channel }>(),
);

export const addChannelSuccess = createAction(
  `${BASE} Add Channel Success`,
  props<{ channel: Channel }>(),
);

export const addChannelError = createAction(
  `${BASE} Add Channel Error`,
  props<{ error: AuthError }>(),
);

// get channels
export const getChannels = createAction(
  `${BASE} Get Channels`,
);

export const getChannelsSuccess = createAction(
  `${BASE} Get Channels Success`,
  props<{ channels: Channel[] }>(),
);

export const getChannelsError = createAction(
  `${BASE} Get Channels Error`,
  props<{ error: any }>(),
);

export const getStarredChannels = createAction(
  `${BASE} Get Starred Channels`,
);

export const getStarredChannelsSuccess = createAction(
  `${BASE} Get Starred Channels Success`,
  props<{ channels: Channel[] }>(),
);

export const getStarredChannelsError = createAction(
  `${BASE} Get Starred Channels Error`,
  props<{ error: any }>(),
);

// select channel
export const selectChannel = createAction(
  `${BASE} Select Channel`,
  props<{ channel: Channel }>(),
);

export const selectChannelSuccess = createAction(
  `${BASE} Select Channel Success`,
  props<{ channel: Channel }>(),
);

export const selectChannelError = createAction(
  `${BASE} Select Channel Error`,
  props<{ error: any }>(),
);

// update channel
export const updateChannel = createAction(
  `${BASE} Update Channel`,
  props<{ channel: Channel }>(),
);

export const updateChannelSuccess = createAction(
  `${BASE} Update Channel Success`,
  props<{ channel: Channel }>(),
);

export const updateChannelError = createAction(
  `${BASE} Update Channel Error`,
  props<{ error: any }>(),
);

// remove channel
export const removeChannel = createAction(
  `${BASE} Remove Channel`,
  props<{ channel: Channel }>(),
);

export const removeChannelSuccess = createAction(
  `${BASE} Remove Channel Success`,
  props<{ channel: Channel }>(),
);

export const removeChannelError = createAction(
  `${BASE} Remove Channel Error`,
  props<{ error: any }>(),
);
