import { AuthState } from './auth/store/auth.reducer';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(
      take(1),
      map( (authState: AuthState) => authState.authenticated )
    );
  }
}
