import { Store } from '@ngrx/store';
import { FeatureState } from './recipe.reducer';
import { HttpClient } from '@angular/common/http';
import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { Recipe } from './../recipe.model';
import { FETCH_RECIPES, FetchRecipes, SET_RECIPES, STORE_RECIPES } from './recipe.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(FETCH_RECIPES)
        .pipe(
            switchMap((action: FetchRecipes) => {
                return this.httpClient.get<Recipe[]>('https://recipe-85408.firebaseio.com/recipes.json');
            }),
            map((recipes) => {
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                    recipe.ingredients = [];
                    }
                }
                return {
                    type: SET_RECIPES,
                    payload: recipes   
                };
            })
        );

    @Effect({dispatch: false})
    recipesStore = this.actions$
        .ofType(STORE_RECIPES)
        .pipe(
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                return this.httpClient.put(
                    'https://recipe-85408.firebaseio.com/recipes.json',
                    state.recipes
                  );
            })
        );
    
    constructor(
        private actions$: Actions, 
        private httpClient: HttpClient,
        private store: Store<FeatureState>
    ) {}
}
