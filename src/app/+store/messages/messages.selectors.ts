import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MessagesState } from './messages.state';

const getMessages = (state: MessagesState) => state.messages;

export const getMessagesState = createFeatureSelector<MessagesState>('messages');
export const messagesSelector = createSelector(getMessagesState, getMessages);
