import * as fromTraceExplorer from './trace-exploerer.reducers';
import * as fromTraceFilter from './trace-filter.reducers';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TraceExplorerPageActions } from '../actions';

export interface TraceExplorerState {
    filters: fromTraceFilter.State;
    traces: fromTraceExplorer.State;
}

export interface State extends fromRoot.State {
    traces: TraceExplorerState;
}

export const reducers: ActionReducerMap<TraceExplorerState, TraceExplorerPageActions.TraceExplorerPageActionsUnion> = {
    filters: fromTraceFilter.reducer,
    traces: fromTraceExplorer.reducer
};

export const selectTraceState = createFeatureSelector<State, TraceExplorerState>('traces');
export const selectFilterState = createSelector(
    selectTraceState,
    (state: TraceExplorerState) => state.filters
);
export const selectTraceDataState = createSelector(
    selectTraceState,
    (state: TraceExplorerState) => state.traces
);

export const getDateRangeFilter = createSelector(
    selectFilterState,
    fromTraceFilter.getDateRange
);
