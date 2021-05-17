import { Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

export const mockStore = () => {
  return jasmine.createSpyObj<Store<any>>('Store', ['dispatch', 'select']);
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
