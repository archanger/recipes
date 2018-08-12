import { State } from './../store/shopping-list.reducers';
import { AddIngredient, DeleteIngredient, UpdateIngredient, StopEdit } from './../store/shopping-list.action';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromShoppingList.State>
  ) { }

  ngOnInit() {
    this.subscription = this.store.pipe(select('shoppingList')).subscribe(
      (data: State) => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue(this.editedItem);
        } else {
          this.editMode = false;
        }
      }
    );
  }

  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(
      form.value.name,
      form.value.amount
    );
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient(
        {
          ingredient: newIngredient
        }
      ));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.reset();
  }

  reset() {
    this.editMode = false;
    this.slForm.reset();
  }

  delete() {
    this.store.dispatch(new DeleteIngredient());
    this.reset();
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEdit());
  }

}
