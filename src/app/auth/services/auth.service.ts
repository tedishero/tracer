import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from '../models/credentials';
import { map } from 'rxjs/operators';
import { ApplicationInsightService } from 'src/app/core/services/applicationInsights.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private ai: ApplicationInsightService) {}

    login(credentials: Credentials): Observable<Credentials> {
        return this.ai.metrics(credentials).pipe(map(data => (!!data ? credentials : undefined)));
    }

    logout() {
        return of(true);
    }
}
