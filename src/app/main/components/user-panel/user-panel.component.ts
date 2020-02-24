import { Component, OnInit } from '@angular/core';

import { fontIcons } from './../../../shared';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  icons = fontIcons;

  constructor() { }

  ngOnInit() {
  }

}
