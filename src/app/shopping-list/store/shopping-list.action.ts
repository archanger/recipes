import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';

export enum ShoppingListActionTypes {
    AddIngredient = 'ADD_INGREDIENT',
    AddIngredients = 'Add_INGREDIENTS',
    UpdateIngredient = 'UPDATE_INGREDIENT',
    DeleteIngredient = 'DELETE_ INGREDIENT',
    StartEdit = 'START_EDIT',
    StopEdit = 'START_EDIT',
}

export class AddIngredient implements Action {
    readonly type: string = ShoppingListActionTypes.AddIngredient;
    
    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ShoppingListActionTypes.AddIngredients;

    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
    readonly type = ShoppingListActionTypes.UpdateIngredient;

    constructor(public payload: {ingredient: Ingredient}) {}
}

export class DeleteIngredient implements Action {
    readonly type = ShoppingListActionTypes.DeleteIngredient;
}

export class StartEdit implements Action {
    readonly type = ShoppingListActionTypes.StartEdit;

    constructor(public payload: number) {}
}

export class StopEdit implements Action {
    readonly type = ShoppingListActionTypes.StopEdit;
}

export type ShoppingListActions = 
    | AddIngredient 
    | AddIngredients
    | UpdateIngredient
    | DeleteIngredient
    | StartEdit
    | StopEdit;
