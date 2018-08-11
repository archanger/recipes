import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        // tslint:disable-next-line:max-line-length
        new Recipe('Tasty Schnitzel',
            'Super tasty schnitzel',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Wiener-Schnitzel02.jpg/220px-Wiener-Schnitzel02.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French fries', 20),
            ]),
        // tslint:disable-next-line:max-line-length
        new Recipe('Burger',
            'King of Burger',
            'https://upload.wikimedia.org/wikipedia/ru/thumb/3/3a/Burger_King_Logo.svg/150px-Burger_King_Logo.svg.png',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1),
            ]),
    ];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    public getRecipes() {
        return this.recipes.slice();
    }

    public getRecipe(id: number): Recipe {
        return this.recipes.slice()[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.getRecipes());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.getRecipes());
    }
}
