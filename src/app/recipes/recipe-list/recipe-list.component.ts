import { FeatureState, RecipeState } from './../store/recipe.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<RecipeState>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<FeatureState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }

  onRecipeSelected(recipe: Recipe) {
    
  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
