import { switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppState } from '../store/app.reducer';
import { AuthState } from '../auth/store/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return this.store.select('auth').pipe(take(1), switchMap( (authState: AuthState) => {
            const copiedReq = req.clone(
                { 
                    params: req.params.set('auth', authState.token)
                }
            );
            return next.handle(copiedReq);
        }));
    }
}
