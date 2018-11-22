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

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const selectTraceDataState = createSelector(
    selectTraceState,
    (state: TraceExplorerState) => state.traces
);

export const getSelectedNodeId = createSelector(
    selectTraceDataState,
    fromTraceExplorer.getSelectedNodeId
);

export const getSelectedRootNodeId = createSelector(
    selectTraceDataState,
    fromTraceExplorer.getSelectedRootNodeId
);

export const getLoadingState = createSelector(
    selectTraceDataState,
    fromTraceExplorer.getLoadingState
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
    selectIds: getRootNodeIds,
    selectEntities: getRootNodeEntities,
    selectAll: getAllRootNodes,
    selectTotal: getTotalRootNodes
} = fromTraceExplorer.adapter.getSelectors(selectTraceDataState);

export const getSelectedRootNode = createSelector(
    getRootNodeEntities,
    getSelectedRootNodeId,
    (entities, selectedRootId) => {
        return selectedRootId && entities[selectedRootId];
    }
);

export const getDateRangeFilter = createSelector(
    selectFilterState,
    fromTraceFilter.getDateRange
);
