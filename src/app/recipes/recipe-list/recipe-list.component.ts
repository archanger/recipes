import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    // tslint:disable-next-line:max-line-length
    new Recipe('Test Recipe', 'Test Test Test', 'https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fbest-ever-seafood-gumbo-sl.jpg%3Fitok%3D-pTK0I90&w=700&q=85'),
    // tslint:disable-next-line:max-line-length
    new Recipe('Test Recipe', 'Test Test Test', 'https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fbest-ever-seafood-gumbo-sl.jpg%3Fitok%3D-pTK0I90&w=700&q=85'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
