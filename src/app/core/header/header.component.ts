import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FetchRecipes, StoreRecipes } from './../../recipes/store/recipe.actions';
import { Logout } from './../../auth/store/auth.actions';
import { AppState } from '../../store/app.reducer';
import { AuthState } from '../../auth/store/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor (
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  saveData() {
    this.store.dispatch(new StoreRecipes());
  }

  fetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
