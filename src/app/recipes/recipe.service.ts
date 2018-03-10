import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        // tslint:disable-next-line:max-line-length
        new Recipe('Tasty Schnitzel',
            'Super tasty schnitzel',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Wiener-Schnitzel02.jpg/220px-Wiener-Schnitzel02.jpg',
            [
                new Ingredient("Meat", 1),
                new Ingredient("French fries", 20),
            ]),
        // tslint:disable-next-line:max-line-length
        new Recipe('Burger',
            'King of Burger',
            'https://upload.wikimedia.org/wikipedia/ru/thumb/3/3a/Burger_King_Logo.svg/150px-Burger_King_Logo.svg.png',
            [
                new Ingredient("Buns", 2),
                new Ingredient("Meat", 1),
            ]),
    ];

    constructor(private slService: ShoppingListService) {
        
    }

    public getRecipes() {
        return this.recipes.slice();
    }

    public addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}