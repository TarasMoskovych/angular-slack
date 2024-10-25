import { RtcTokenPayload } from '@libs/models';
import { IsNotEmpty } from 'class-validator';

export class RtcTokenDto implements RtcTokenPayload {
  @IsNotEmpty()
  uid: string;

  @IsNotEmpty()
  channel: string;
}
