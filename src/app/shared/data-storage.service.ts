import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient, 
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes(): Observable<any> {
    return this.httpClient.put(
      'https://recipe-85408.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>('https://recipe-85408.firebaseio.com/recipes.json')
    .pipe(
      map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe.ingredients = [];
          }
        }
        return recipes;
      })
    ).subscribe(
      (response: Recipe[]) => this.recipeService.setRecipes(response)
    );
  }
}
