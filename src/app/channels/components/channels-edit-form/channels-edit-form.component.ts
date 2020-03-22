import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Channel } from 'src/app/shared';

@Component({
  selector: 'app-channels-edit-form',
  templateUrl: './channels-edit-form.component.html',
  styleUrls: ['./channels-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsEditFormComponent implements OnInit {
  @Input() channel: Channel;

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.channel.name, [Validators.required]),
      description: new FormControl(this.channel.description, [Validators.required])
    });
  }

}
