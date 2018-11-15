import { Credentials } from '../models/credentials';
import { AuthApiActions } from '../actions';

export interface State {
    credentials: Credentials | null;
}

export const initialState: State = {
    credentials: null
};

export function reducer(state = initialState, action: AuthApiActions.AuthApiActionsUnion): State {
    switch (action.type) {
        case AuthApiActions.AuthApiActionTypes.LoginSuccess: {
            return {
                ...state,
                credentials: action.payload.credentials
            };
        }

        default: {
            return state;
        }
    }
}

export const getCredentials = (state: State) => state.credentials;
