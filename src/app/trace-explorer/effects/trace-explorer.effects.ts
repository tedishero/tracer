import { Injectable } from '@angular/core';
import { Credentials } from 'src/app/auth/models/credentials';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, withLatestFrom, combineLatest } from 'rxjs/operators';
import { TraceExplorerPageActions } from '../actions';
import { ApplicationInsightService } from 'src/app/core/services/applicationInsights.service';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import * as fromTraces from '../reducers';
import * as fromRoot from '../../reducers';

const ChildrenEventsQuery: string = `customEvents| where name == "Microsoft.IT.Diagnostics.Activity.ActivityCompletedEvent"| where tostring(customDimensions['parentActivityId']) == "IdPlaceHolder" | extend methodName = tostring(customDimensions['activityName']) | extend activityId = tostring(customDimensions['activityId']) | extend correlationId = tostring(customDimensions['correlationId']) | extend clientIp = tostring(customDimensions['client-ip']) | extend elapsedMilliseconds = tolong(customDimensions['elapsedMilliseconds']) | project methodName , activityId, correlationId , clientIp, elapsedMilliseconds, timestamp  | sort by timestamp desc | take 25`;
const ParentEventsQuery: string = `customEvents| where name == "Microsoft.IT.Diagnostics.Activity.ActivityCompletedEvent"| where tostring(customDimensions['parentActivityName']) == "none"| extend methodName = tostring(customDimensions['activityName']) | extend activityId = tostring(customDimensions['activityId']) | extend correlationId = tostring(customDimensions['correlationId']) | extend clientIp = tostring(customDimensions['client-ip']) | extend elapsedMilliseconds = tolong(customDimensions['elapsedMilliseconds']) | project methodName , activityId, correlationId , clientIp, elapsedMilliseconds | where elapsedMilliseconds > 1000| sort by elapsedMilliseconds desc | take 25`;

@Injectable()
export class TraceExplorerEffects {
    @Effect()
    requestData$ = this.actions$.pipe(
        ofType<TraceExplorerPageActions.DataRequested>(
            TraceExplorerPageActions.TraceExplorerPageActionTypes.DataRequested
        ),
        combineLatest(
            this.store.pipe(select(fromAuth.getCredentials)),
            this.store.pipe(select(fromTraces.getDateRangeFilter)),
            (action, credential, dateRange) => ({ cred: credential, dateRange: dateRange })
        ),
        exhaustMap(payload =>
            this.ai
                .query(payload.cred, payload.dateRange.map(t => t.toISOString()).join('/'), ParentEventsQuery)
                .pipe(map(response => new TraceExplorerPageActions.DataUpdatedSuccessfully({ data: response })))
        )
    );

    @Effect()
    nodeExpanded$ = this.actions$.pipe(
        ofType<TraceExplorerPageActions.NodeExpanded>(
            TraceExplorerPageActions.TraceExplorerPageActionTypes.NodeExpanded
        ),
        map(action => action.payload.nodeId),
        combineLatest(
            this.store.pipe(select(fromAuth.getCredentials)),
            this.store.pipe(select(fromTraces.getDateRangeFilter)),
            (parentId, credential, dateRange) => ({ cred: credential, parentId: parentId, dateRange: dateRange })
        ),
        exhaustMap(payload =>
            this.ai
                .query(
                    payload.cred,
                    payload.dateRange.map(t => t.toISOString()).join('/'),
                    ChildrenEventsQuery.replace('IdPlaceHolder', payload.parentId)
                )
                .pipe(map(response => new TraceExplorerPageActions.ChildrenFetchedSuccessfully({ data: response })))
        )
    );

    constructor(
        private actions$: Actions,
        private ai: ApplicationInsightService,
        private store: Store<fromRoot.State>
    ) {}
}
