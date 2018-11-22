import { Action } from '@ngrx/store';
import { AIResponse } from 'src/app/core/models/ai.model';

export enum TraceExplorerPageActionTypes {
    DataRequested = '[Trace Explorer Page] Data Requested',
    LoadRootNodesSuccess = '[Trace Explorer Page] Load Root Nodes Successfully',
    NodeExpanded = '[Trace Explorer Page] Node Expanded',
    ChildrenFetchedSuccess = '[Trace Explorer Page] Children Fetched Successfully',
    DateRangeUpdated = '[Trace Explorer Page] Date Time Range Updated'
}

export class NodeExpanded implements Action {
    readonly type = TraceExplorerPageActionTypes.NodeExpanded;
    constructor(public payload: { nodeId: string; isRoot: boolean }) {}
}

export class ChildrenFetchedSuccess implements Action {
    readonly type = TraceExplorerPageActionTypes.ChildrenFetchedSuccess;
    constructor(public payload: { data: AIResponse }) {}
}

export class LoadRootNodesSuccess implements Action {
    readonly type = TraceExplorerPageActionTypes.LoadRootNodesSuccess;
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

export type TraceExplorerPageActionsUnion =
    | LoadRootNodesSuccess
    | DataRequested
    | DateRangeUpdated
    | NodeExpanded
    | ChildrenFetchedSuccess;
