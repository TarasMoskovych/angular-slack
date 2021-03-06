import { createAction, props } from '@ngrx/store';
import { AuthError, Message } from '@angular-slack/app/shared';

const BASE = '[Messages]';

// add messages
export const addMessage = createAction(
  `${BASE} Add Message`,
  props<{ message: Message }>(),
);

export const addMessageSuccess = createAction(
  `${BASE} Add Message Success`,
);

export const addMessageError = createAction(
  `${BASE} Add Message Error`,
  props<{ error: AuthError }>(),
);

// get messages
export const getMessages = createAction(
  `${BASE} Get Messages`,
  props<{ channelId: string }>(),
);

export const getMessagesSuccess = createAction(
  `${BASE} Get Messages Success`,
  props<{ messages: Message[] }>(),
);

export const getMessagesError = createAction(
  `${BASE} Get Messages Error`,
  props<{ error: AuthError }>(),
);

// get private messages
export const getPrivateMessages = createAction(
  `${BASE} Get Private Messages`,
  props<{ channelId: string }>(),
);

export const getPrivateMessagesSuccess = createAction(
  `${BASE} Get Private Messages Success`,
  props<{ messages: Message[] }>(),
);

export const getPrivateMessagesError = createAction(
  `${BASE} Get Private Messages Error`,
  props<{ error: AuthError }>(),
);

export const searchMessages = createAction(
  `${BASE} Search Messages`,
  props<{ search: string }>(),
);
