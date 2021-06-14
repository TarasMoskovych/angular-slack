import { Message } from '@angular-slack/app/shared';

export interface MessagesState {
  messages: Message[];
  search: string;
}

export const initialMessagesState: MessagesState = {
  messages: [],
  search: '',
};
