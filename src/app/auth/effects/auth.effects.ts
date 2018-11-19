import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { LoginPageActions, AuthApiActions } from '../actions';
import { Credentials } from '../models/credentials';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
    @Effect()
    login$ = this.actions$.pipe(
        ofType<LoginPageActions.Login>(LoginPageActions.LoginPageActionTypes.Login),
        map(action => action.payload.credentials),
        exhaustMap((auth: Credentials) =>
            this.authService.login(auth).pipe(
                map(credentials => new AuthApiActions.LoginSuccess({ credentials })),
                catchError(error => of(new AuthApiActions.LoginFailure({ error })))
            )
        )
    );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthApiActions.AuthApiActionTypes.LoginSuccess),
        tap(() => this.router.navigate(['/']))
    );

    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$.pipe(
        ofType(AuthApiActions.AuthApiActionTypes.LoginRedirect),
        tap(authed => {
            this.router.navigate(['/login']);
        })
    );

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
