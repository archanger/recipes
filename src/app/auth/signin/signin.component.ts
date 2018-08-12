import { Store } from '@ngrx/store';
import { AppState } from './../../store/app.reducer';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TrySignin } from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  signin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new TrySignin({username: email, password: password}));
  }
}
