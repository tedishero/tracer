import { TraceExplorerPageActions } from '../actions';
import { AIResponse, AIEvent } from 'src/app/core/models/ai.model';

export interface State {
    traceData: AIEvent[];
}

export const initialState: State = {
    traceData: []
};

export function reducer(state = initialState, action: TraceExplorerPageActions.TraceExplorerPageActionsUnion): State {
    switch (action.type) {
        case TraceExplorerPageActions.TraceExplorerPageActionTypes.DataUpdatedSuccessfully: {
            return {
                ...state,
                traceData: action.payload.data.tables[0].rows.map(r => {
                    return {
                        methodName: r[0],
                        clientIp: r[3],
                        activityId: r[1],
                        correlationId: r[2],
                        elapsedMilliseconds: r[4]
                    };
                })
            };
        }

        default: {
            return state;
        }
    }
}

export const getTraceData = (state: State) => state.traceData;
