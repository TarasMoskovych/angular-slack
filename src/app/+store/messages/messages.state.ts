import { Message } from 'src/app/shared';

export interface MessagesState {
  messages: Message[];
  search: string;
}

export const initialMessagesState: MessagesState = {
  messages: [],
  search: '',
};
