import { ElementRef, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, of, throwError } from 'rxjs';

import { AuthService, MessagesService, NotificationService, StorageService } from '../core';
import { error, firebaseUser } from './test-data.mock';

export const mockStore = () => {
  return jasmine.createSpyObj('Store', ['dispatch', 'select']);
};

export const mockDialog = () => {
  return jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
};

export const mockDialogRef = () => {
  return jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['close']);
};

export const mockRenderer = () => {
  return jasmine.createSpyObj<Renderer2>('Renderer2', ['setStyle']);
};

export const mockElementRef = () => {
  return jasmine.createSpyObj<ElementRef>('ElementRef', [], {
    nativeElement: {
      scrollIntoView: jasmine.createSpy(),
      querySelector: jasmine.createSpy(),
      focus: jasmine.createSpy(),
    },
  });
};

export const mockRouter = () => {
  return jasmine.createSpyObj<Router>('Router', ['navigate']);
};

export const mockSnackBar = () => {
  return jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
};

export const mockNotificationService = () => {
  return jasmine.createSpyObj<NotificationService>('NotificationService', {
    show: undefined,
    handleError: throwError(error),
  });
};

export const mockStorageService = () => {
  return jasmine.createSpyObj<StorageService>('StorageService', ['uploadPhoto'], {
    progress$: new BehaviorSubject(50),
  });
};

export const mockAuthService = () => {
  return jasmine.createSpyObj<AuthService>('AuthService', ['getFirebaseUser', 'getRtcToken']);
};

export const mockMessagesService = () => {
  return jasmine.createSpyObj<MessagesService>('MessagesService', ['removeAll']);
};

export const mockVideoCallService = () => {
  return jasmine.createSpyObj('VideoCallService', ['onCall', 'call', 'openVideoCallDialog']);
};

export const mockVideoCallDialogService = () => {
  return jasmine.createSpyObj('VideoCallDialogService', ['open', 'afterConfirmation', 'acceptCall', 'close', 'afterCallEnd']);
};

export const mockFireAuth = () => {
  return jasmine.createSpyObj<AngularFireAuth>('AngularFireAuth', [
    'signInWithEmailAndPassword',
    'signInWithPopup',
    'signOut',
    'createUserWithEmailAndPassword',
  ], {
    authState: of(firebaseUser),
    currentUser: Promise.resolve(firebaseUser),
  });
};

export const mockFireStore = () => {
  return jasmine.createSpyObj<AngularFirestore>('AngularFirestore', ['collection', 'doc']);
};

export const mockFireStorage = () => {
  return jasmine.createSpyObj<AngularFireStorage>('AngularFireStorage', ['upload']);
};

export const mockSocket = () => {
  return jasmine.createSpyObj<Socket>('Socket', ['emit', 'on', 'once']);
};

export const mockHttpClient = () => {
  return jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
};

export const spyOnCollection = (
  firestoreRef: jasmine.SpyObj<AngularFirestore>,
  value?: any,
  key?: string,
  reject = false,
  remove = false,
) => {
  let spy: any;
  const document = {
    ref: {
      delete: jasmine.createSpy(),
    },
  };

  if (remove) {
    spy = document;
  }

  firestoreRef.collection.and.callFake((path: any, queryFn: any) => {
    const query = {
      where: () => query,
      orderBy: () => query,
    };

    if (key) {
      expect(path).toBe(key);
    }

    if (typeof queryFn === 'function') {
      queryFn(query);
    }

    if (reject) {
      return {
        add: (data: any) => Promise.reject(data),
        get: () => throwError(error),
        doc: () => ({ valueChanges: () => throwError(value) }),
      };
    }

    if (remove) {
      return {
        get: () => of([document, document]),
      };
    }

    return {
      add: (data: any) => Promise.resolve(data),
      get: () => of(value === null ? { empty: true } : { docs: [{ id: 1 }] }),
      valueChanges: () => of(value),
      doc: () => ({ valueChanges: () => of(value) }),
    } as any;
  });

  return spy;
};

export const spyOnDoc = (firestoreRef: jasmine.SpyObj<AngularFirestore>, exists: boolean = false) => {
  firestoreRef.doc.and.callFake(() => {
    return {
      get: () => of({ exists }),
      set: () => Promise.resolve(),
      delete: (value: any) => Promise.resolve(value),
      update: (value: any) => Promise.resolve(value),
    } as any;
  });
};
