import { Router } from '@angular/router';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TRY_SIGNUP, TrySignup, SIGNUP, SET_TOKEN, TRY_SIGNIN, TrySignin, SIGNIN, LOGOUT } from './auth.actions';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
        .ofType(TRY_SIGNUP)
        .pipe(
            map((action: TrySignup) => action.payload),
            switchMap((authData: {username: string, password: string}) => {
                return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());
            }),
            mergeMap((token: string) => {
                return [
                    {
                        type: SIGNUP
                    },
                    {
                        type: SET_TOKEN,
                        payload: token
                    }
                ];
            })
        );

    @Effect()
    authSignin = this.actions$
        .ofType(TRY_SIGNIN)
        .pipe(
            map((action: TrySignin) => action.payload),
            switchMap((authData: {username: string, password: string}) => {
                return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());
            }),
            mergeMap((token: string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: SIGNIN
                    },
                    {
                        type: SET_TOKEN,
                        token: token
                    }
                ];
            })
        );
    
    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(LOGOUT)
        .pipe(
            tap(() => {
                this.router.navigate(['/']);
            })
        );
    constructor(private actions$: Actions, private router: Router) {}
}
