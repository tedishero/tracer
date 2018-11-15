import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Credentials } from '../models/credentials';
import * as fromAuth from '../reducers';
import { LoginPageActions } from '../actions';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styles: []
})
export class LoginPageComponent implements OnInit {
    pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
    error$ = this.store.pipe(select(fromAuth.getLoginPageError));
    public loading: boolean = false;
    constructor(private store: Store<fromAuth.State>) {}

    ngOnInit() {}

    onSubmit(credentials: Credentials) {
        this.store.dispatch(new LoginPageActions.Login({ credentials }));
    }
}
