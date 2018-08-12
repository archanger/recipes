import { RecipeActions, SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from './recipe.actions';
import { Recipe } from './../recipe.model';
import { Ingredient } from './../../shared/ingredient.model';
import { AppState } from '../../store/app.reducer';

export interface FeatureState extends AppState {
    recipes: RecipeState;
}

export interface RecipeState {
    recipes: Recipe[];
}

const initialState: RecipeState = {
    recipes: [
        new Recipe('Tasty Schnitzel',
            'Super tasty schnitzel',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Wiener-Schnitzel02.jpg/220px-Wiener-Schnitzel02.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French fries', 20),
            ]
        ),
        // tslint:disable-next-line:max-line-length
        new Recipe('Burger',
            'King of Burger',
            'https://upload.wikimedia.org/wikipedia/ru/thumb/3/3a/Burger_King_Logo.svg/150px-Burger_King_Logo.svg.png',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1),
            ]
        )
    ]
};

export function recipeReducer(state = initialState, action: RecipeActions) {
    switch (action.type) {
        case SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updateRecipe = {
                ...recipe,
                ...action.payload.recipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updateRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }
}
