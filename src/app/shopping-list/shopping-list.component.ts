import { StartEdit, StopEdit } from './store/shopping-list.action';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<AppState>;
  
  constructor(
    private store: Store<AppState>
  ) { }
  
  ngOnInit() {
    this.shoppingListState = this.store.pipe(select('shoppingList'));
  }

  onEditItem(index: number): void {
    this.store.dispatch(new StartEdit(index));
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEdit());
  }
}
