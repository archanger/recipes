import { DeleteRecipe } from './../store/recipe.actions';
import { FeatureState, RecipeState } from './../store/recipe.reducer';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddIngredients } from '../../shopping-list/store/shopping-list.action';
import { take } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<RecipeState>;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FeatureState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: RecipeState) => {
        this.store.dispatch(new AddIngredients(
          recipeState.recipes[this.id].ingredients
        ));
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
