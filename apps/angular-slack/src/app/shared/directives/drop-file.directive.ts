import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropFile]'
})
export class DropFileDirective {
  @Output() fileDropped = new EventEmitter<FileList>();
  @HostBinding('class.fileover') fileOver: boolean;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    this.prevent(event);
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    this.prevent(event);
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    this.prevent(event);
    this.fileOver = false;
    const files = event.dataTransfer.files;

    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

  private prevent(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
