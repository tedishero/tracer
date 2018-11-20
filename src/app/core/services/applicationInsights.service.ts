import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AIResponse } from '../models/ai.model';
import { Credentials } from 'src/app/auth/models/credentials';

@Injectable({
    providedIn: 'root'
})
export class ApplicationInsightService {
    constructor(private http: HttpClient) {}

    query(credentials: Credentials, timeRange: string, query: string): Observable<AIResponse> {
        const headers = new HttpHeaders().set('x-api-key', credentials.key);
        return this.http.get<AIResponse>(
            `https://api.applicationinsights.io/v1/apps/${
                credentials.appId
            }/query?timespan=${timeRange}&query=${query}`,
            {
                headers: headers
            }
        );
    }

    metrics(credentials: Credentials): Observable<AIResponse> {
        const headers = new HttpHeaders().set('x-api-key', credentials.key);
        return this.http.get<AIResponse>(
            `https://api.applicationinsights.io/v1/apps/${credentials.appId}/metrics/requests/count?timespan=PT12H`,
            {
                headers: headers
            }
        );
    }
}
