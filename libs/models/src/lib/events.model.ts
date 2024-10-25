import { User } from './user.model';

export enum Events {
  Init = 'init',
  Status = 'status',
  Call = 'call',
  CallAccept = 'call-accept',
  CallDecline = 'call-decline',
}

export interface RtcEventPayload {
  caller: User;
  receiver: User;
  channel: string;
  token?: string;
}
