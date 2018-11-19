import { TraceExplorerPageActions } from '../actions';

export interface State {
    dateRange: Date[];
}

export const initialState: State = {
    dateRange: [new Date(), new Date()]
};

export function reducer(state = initialState, action: TraceExplorerPageActions.TraceExplorerPageActionsUnion): State {
    switch (action.type) {
        case TraceExplorerPageActions.TraceExplorerPageActionTypes.DateRangeUpdated: {
            return {
                ...state,
                dateRange: action.payload.range
            };
        }
        default: {
            return state;
        }
    }
}

export const getDateRange = (state: State) => state.dateRange;
