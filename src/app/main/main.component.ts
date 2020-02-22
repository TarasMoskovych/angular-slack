import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AuthState, getAuthState } from '../+store/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.store.select(getAuthState).subscribe(data => console.log(data.user));
  }

}
