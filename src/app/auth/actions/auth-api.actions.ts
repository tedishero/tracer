import { Action } from '@ngrx/store';
import { Credentials } from '../models/credentials';

export enum AuthApiActionTypes {
    LoginSuccess = '[Auth/API] Login Success',
    LoginFailure = '[Auth/API] Login Failure',
    LoginRedirect = '[Auth/API] Login Redirect'
}

export class LoginSuccess implements Action {
    readonly type = AuthApiActionTypes.LoginSuccess;

    constructor(public payload: { credentials: Credentials }) {}
}

export class LoginFailure implements Action {
    readonly type = AuthApiActionTypes.LoginFailure;

    constructor(public payload: { error: any }) {}
}

export class LoginRedirect implements Action {
    readonly type = AuthApiActionTypes.LoginRedirect;
}

export type AuthApiActionsUnion = LoginSuccess | LoginFailure | LoginRedirect;
