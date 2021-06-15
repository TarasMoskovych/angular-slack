import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import * as fs from 'firebase-admin';

@Injectable()
export class StatusService {

  @OnEvent('status.online')
  setOnline(uid: string) {
    this.setStatus(uid, 'ONLINE');
  }

  @OnEvent('status.offline')
  setOffline(uid: string) {
    this.setStatus(uid, 'OFFLINE');
  }

  private setStatus(uid: string, status: string) {
    if (uid) {
      fs.firestore().collection('users').doc(uid).update({ status });
    }
  }
}
