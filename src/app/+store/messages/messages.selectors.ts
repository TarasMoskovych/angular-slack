import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Message, Poster } from 'src/app/shared';
import { MessagesState } from './messages.state';

const getMessages = (state: MessagesState) => state.messages;

export const getMessagesState = createFeatureSelector<MessagesState>('messages');
export const messagesSelector = createSelector(getMessagesState, getMessages);
export const topPostersSelector = createSelector(
  messagesSelector,
  (messages: Message[]) => {
    return Object.values(messages.reduce((acc: { [key: string]: Poster }, message: Message) => {
      const { uid, displayName, photoURL } = message.user;
      const poster: Poster = {
        displayName,
        photoURL,
        length: 1,
      };

      if (!acc[uid]) {
        acc[uid] = poster;
      } else {
        acc[uid] = Object.assign(poster, { length: acc[uid].length + 1 });
      }

      return acc;
    }, {}))
      .sort((a: Poster, b: Poster) => b.length - a.length)
      .slice(0, 5);
  },
);
