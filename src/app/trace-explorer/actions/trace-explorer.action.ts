import { Action } from '@ngrx/store';
import { AIResponse } from 'src/app/core/models/ai.model';

export enum TraceExplorerPageActionTypes {
    DataRequested = '[Trace Explorer Page] Data Requested',
    DataUpdated = '[Trace Explorer Page] Data Updated',
    DateRangeUpdated = '[Trace Explorer Page] Date Time Range Updated'
}

export class DataUpdated implements Action {
    readonly type = TraceExplorerPageActionTypes.DataUpdated;
    constructor(public payload: { data: AIResponse }) {}
}

export class DataRequested implements Action {
    readonly type = TraceExplorerPageActionTypes.DataRequested;
    constructor(public payload: {}) {}
}

export class DateRangeUpdated implements Action {
    readonly type = TraceExplorerPageActionTypes.DateRangeUpdated;
    constructor(public payload: { range: Date[] }) {}
}

export type TraceExplorerPageActionsUnion = DataUpdated | DataRequested | DateRangeUpdated;
