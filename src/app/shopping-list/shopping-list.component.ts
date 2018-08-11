import { StartEdit } from './store/shopping-list.action';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<fromShoppingList.AppState>;
  
  constructor(
    private store: Store<fromShoppingList.AppState>
  ) { }
  
  ngOnInit() {
    this.shoppingListState = this.store.pipe(select('shoppingList'));
  }

  onEditItem(index: number): void {
    this.store.dispatch(new StartEdit(index));
  }
}
