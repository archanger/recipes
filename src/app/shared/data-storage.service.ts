import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: Http, 
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes(): Observable<any> {
    const token = this.authService.getToken();
    return this.http.put(
      'https://recipe-85408.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://recipe-85408.firebaseio.com/recipes.json?auth=' + token)
    .pipe(
      map((response: Response) => <Promise<Recipe[]>>response.json())
    ).subscribe(
      (response: Recipe[]) => this.recipeService.setRecipes(response)
    );
  }
}
