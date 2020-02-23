import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AuthState, authUserSelector } from '../+store/auth';
import { User } from '../shared';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.store.select(authUserSelector).subscribe((user: User) => console.log(user));
  }

}
