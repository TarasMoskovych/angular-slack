import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fontIcons } from 'src/app/shared';

@Component({
  selector: 'app-messages-actions',
  templateUrl: './messages-actions.component.html',
  styleUrls: ['./messages-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesActionsComponent implements OnInit {
  icons = fontIcons;

  constructor() { }

  ngOnInit(): void {
  }

}
