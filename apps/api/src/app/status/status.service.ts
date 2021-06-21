import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Collections, Events, Status } from '@libs/models';
import { firestore } from 'firebase-admin';

@Injectable()
export class StatusService {

  @OnEvent(`${Events.Status}.${Status.ONLINE}`)
  setOnline(uid: string) {
    this.setStatus(uid, Status.ONLINE);
  }

  @OnEvent(`${Events.Status}.${Status.OFFLINE}`)
  setOffline(uid: string) {
    this.setStatus(uid, Status.OFFLINE);
  }

  private setStatus(uid: string, status: string) {
    if (uid) {
      firestore().collection(Collections.Users).doc(uid).update({ status });
    }
  }
}
