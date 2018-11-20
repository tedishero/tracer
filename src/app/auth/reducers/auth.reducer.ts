import { Credentials } from '../models/credentials';
import { AuthApiActions } from '../actions';

export interface State {
    credentials: Credentials | null;
}

export const initialState: State = {
    //TODO: set it back to null after testing the trace page
    credentials: {
        key: '7p25c1rb75q00hduoauguj1sfcz0cukmlkz20eyg',
        appId: '76e52468-077d-464d-97bb-13e1cccb1a3c'
    }
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
