import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from '../models/credentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(credentials: Credentials): Observable<Credentials> {
        const headers = new HttpHeaders().set('x-api-key', credentials.key);
        return this.http
            .get(
                `https://api.applicationinsights.io/v1/apps/${credentials.appId}/metrics/requests/count?timespan=PT12H`,
                {
                    headers: headers
                }
            )
            .pipe(map(data => (!!data ? credentials : undefined)));
    }

    logout() {
        return of(true);
    }
}
