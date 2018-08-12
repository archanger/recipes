import { AuthState, authReducer } from './../auth/store/auth.reducer';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { shoppingListReducer } from '../shopping-list/store/shopping-list.reducers';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer
};
