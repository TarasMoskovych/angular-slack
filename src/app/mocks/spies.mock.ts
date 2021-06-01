import { ElementRef, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, NotificationService } from '../core';

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
  return jasmine.createSpyObj<NotificationService>('NotificationService', ['show', 'handleError']);
};

export const mockAuthService = () => {
  return jasmine.createSpyObj<AuthService>('AuthService', ['getFirebaseUser']);
};

export const mockFireAuth = () => {
  return jasmine.createSpyObj<AngularFireAuth>('AngularFireAuth', [
    'signInWithEmailAndPassword',
    'signInWithPopup',
    'signOut',
    'createUserWithEmailAndPassword',
  ], [
    'authState',
  ]);
};

export const mockFireStore = () => {
  return jasmine.createSpyObj<AngularFirestore>('AngularFirestore', ['collection', 'doc']);
};

export const mockFireStorage = () => {
  return jasmine.createSpyObj<AngularFireStorage>('AngularFireStorage', ['upload']);
};
