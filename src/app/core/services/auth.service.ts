import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { CoreModule } from '../core.module';
import { NotificationService } from './notification.service';
import { Collections, generateAvatar } from 'src/app/shared';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {

  constructor(
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.afauth.authState.subscribe((userInfo: any) => {
      if (userInfo.emailVerified) {
        this.router.navigate(['/app']);
      }
    });
  }

  login(email: string, password: string) {
    return this.afauth.auth.signInWithEmailAndPassword(email, password)
      .catch(e => this.notificationService.show(e.message));
  }

  register(displayName: string, email: string, password: string) {
    return this.afauth.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential: firebase.auth.UserCredential) => {
        const { user } = userCredential;

        user.sendEmailVerification();
        user.updateProfile({
          displayName,
          photoURL: generateAvatar(user.uid)
        }).then(() => this.save(user));
      })
      .catch(e => this.notificationService.show(e.message));
  }

  private save(user: firebase.UserInfo) {
    const { displayName, email, photoURL, uid } = user;

    return this.afs
      .doc(`${Collections.Users}/${uid}`)
      .set({ displayName, email, photoURL });
  }
}
