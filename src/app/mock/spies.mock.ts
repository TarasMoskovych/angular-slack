import { ElementRef, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
