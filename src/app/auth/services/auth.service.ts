import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from '../models/credentials';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {}

    login(credentials: Credentials): Observable<Credentials> {
        // TODO: ping ApplicationInsights to find out if appId and Key are correct.
        return of(credentials);
    }

    logout() {
        return of(true);
    }
}
