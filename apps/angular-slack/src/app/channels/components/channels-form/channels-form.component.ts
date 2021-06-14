import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Channel, GlobalErrorStateMatcher, errorMessages, SubmitButton } from '@angular-slack/app/shared';

@Component({
  selector: 'app-channels-form',
  templateUrl: './channels-form.component.html',
  styleUrls: ['./channels-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsFormComponent implements OnInit, OnChanges {
  @Input() channel: Channel;
  @Input() submitButton: SubmitButton = { color: 'primary', text: 'Add' };
  @Input() loading: boolean;
  @Output() submitEmitter = new EventEmitter<Channel>();

  errorMessages = errorMessages;
  form: FormGroup;
  matcher = new GlobalErrorStateMatcher();

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.channel) {
      this.form?.patchValue({
        name: this.channel.name,
        description: this.channel.description
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    this.submitEmitter.emit(this.form.value);
  }

  private buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.channel?.name, [Validators.required]),
      description: new FormControl(this.channel?.description, [Validators.required])
    });
  }

}
