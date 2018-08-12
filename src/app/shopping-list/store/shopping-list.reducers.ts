import { Ingredient } from '../../shared/ingredient.model';
import { 
    ShoppingListActions, 
    ShoppingListActionTypes, 
    UpdateIngredient, 
    StartEdit,
    AddIngredient, 
    AddIngredients
} from './shopping-list.action';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function  shoppingListReducer(state = initialState, action: ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActionTypes.AddIngredient:
            return {
                ...state,
                ingredients: [...state.ingredients, (<AddIngredient>action).payload]
            };
        case ShoppingListActionTypes.AddIngredients:
            return {
                ...state,
                ingredients: [...state.ingredients, ...(<AddIngredients>action).payload]
            };
        case ShoppingListActionTypes.UpdateIngredient:
            const updatePayload = (<UpdateIngredient>action).payload;
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...updatePayload.ingredient
            };
            const ingredientsForUpdate = [...state.ingredients];
            ingredientsForUpdate[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: ingredientsForUpdate,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListActionTypes.DeleteIngredient:
            const ingredientsForDelete = state.ingredients;
            ingredientsForDelete.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: ingredientsForDelete,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListActionTypes.StartEdit:
            const editingPayload = (<StartEdit>action).payload;
            const editedIngredient = {...state.ingredients[editingPayload]};
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: editingPayload
            };
        case ShoppingListActionTypes.StopEdit:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}
