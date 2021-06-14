import { createReducer, on } from '@ngrx/store';

import * as messagesActions from './messages.actions';
import { initialMessagesState } from './messages.state';

export const messagesReducer = createReducer(
  initialMessagesState,
  on(messagesActions.getMessagesSuccess, (state, action) => ({ ...state, messages: [...action.messages] })),
  on(messagesActions.getPrivateMessagesSuccess, (state, action) => ({ ...state, messages: [...action.messages] })),
  on(messagesActions.searchMessages, (state, action) => ({ ...state, search: action.search })),
);
