import { Action } from '@ngrx/store';
import { AIResponse } from 'src/app/core/models/ai.model';

export enum TraceExplorerPageActionTypes {
    DataRequested = '[Trace Explorer Page] Data Requested',
    DataUpdatedSuccessfully = '[Trace Explorer Page] Data Updated Successfully',
    DateRangeUpdated = '[Trace Explorer Page] Date Time Range Updated'
}

export class DataUpdatedSuccessfully implements Action {
    readonly type = TraceExplorerPageActionTypes.DataUpdatedSuccessfully;
    constructor(public payload: { data: AIResponse }) {}
}

export class DataRequested implements Action {
    readonly type = TraceExplorerPageActionTypes.DataRequested;
    constructor() {}
}

export class DateRangeUpdated implements Action {
    readonly type = TraceExplorerPageActionTypes.DateRangeUpdated;
    constructor(public payload: { range: Date[] }) {}
}

export type TraceExplorerPageActionsUnion = DataUpdatedSuccessfully | DataRequested | DateRangeUpdated;
