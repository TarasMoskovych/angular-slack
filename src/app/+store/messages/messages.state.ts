import { Message } from 'src/app/shared';

export interface MessagesState {
  messages: Message[];
}

export const initialMessagesState: MessagesState = {
  messages: [],
};
