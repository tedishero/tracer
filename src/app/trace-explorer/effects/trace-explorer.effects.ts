import { Injectable } from '@angular/core';
import { Credentials } from 'src/app/auth/models/credentials';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { TraceExplorerPageActions } from '../actions';
import { ApplicationInsightService } from 'src/app/core/services/applicationInsights.service';

const ParentEventsQuery: string = `customEvents| where name == "Microsoft.IT.Diagnostics.Activity.ActivityCompletedEvent"| where tostring(customDimensions['parentActivityName']) == "none"| extend methodName = tostring(customDimensions['activityName']) | extend activityId = tostring(customDimensions['activityId']) | extend correlationId = tostring(customDimensions['correlationId']) | extend clientIp = tostring(customDimensions['client-ip']) | extend elapsedMilliseconds = tolong(customDimensions['elapsedMilliseconds']) | project methodName , activityId, correlationId , clientIp, elapsedMilliseconds | where elapsedMilliseconds > 1000| sort by elapsedMilliseconds desc | take 100`;

@Injectable()
export class TraceExplorerEffects {
    @Effect()
    login$ = this.actions$.pipe(
        ofType<TraceExplorerPageActions.DataRequested>(
            TraceExplorerPageActions.TraceExplorerPageActionTypes.DataRequested
        ),
        map(action => action.payload),
        exhaustMap((data: { startTime: Date; endTime: Date; credential: Credentials }) =>
            this.ai
                .query(data.credential, ParentEventsQuery)
                .pipe(map(response => new TraceExplorerPageActions.DataUpdated({ data: response })))
        )
    );

    constructor(private actions$: Actions, private ai: ApplicationInsightService) {}
}
