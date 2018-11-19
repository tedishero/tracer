import { TraceExplorerPageActions } from '../actions';
import { AIResponse } from 'src/app/core/models/ai.model';

export interface State {
    traceData: AIResponse;
}

export const initialState: State = {
    traceData: undefined
};

export function reducer(state = initialState, action: TraceExplorerPageActions.TraceExplorerPageActionsUnion): State {
    switch (action.type) {
        case TraceExplorerPageActions.TraceExplorerPageActionTypes.DataUpdated: {
            return {
                ...state,
                traceData: action.payload.data
            };
        }

        default: {
            return state;
        }
    }
}

export const getTraceData = (state: State) => state.traceData;
