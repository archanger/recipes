import { Subscription } from 'rxjs';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemImdex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
    .subscribe((index: number) => {
      this.editMode = true;
      this.editedItemImdex = index;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue(this.editedItem);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(
      form.value.name,
      form.value.amount
    );
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemImdex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.reset();
  }

  reset() {
    this.editMode = false;
    this.slForm.reset();
  }

  delete() {
    this.slService.deleteIngredient(this.editedItemImdex);
    this.reset();
  }

}
