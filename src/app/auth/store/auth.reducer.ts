import * as fromAuthActions from './auth.actions';

export interface AuthState {
    token: string;
    authenticated: boolean;
}

const initialAuthState: AuthState = {
    token: null,
    authenticated: false
};

export function authReducer(state = initialAuthState, action: fromAuthActions.Action) {

    switch (action.type) {
        case fromAuthActions.SIGNIN:
        case fromAuthActions.SIGNUP:
            return {
                ...state,
                authenticated: true
            };
        case fromAuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case fromAuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        default:
            return state;
    }
}
