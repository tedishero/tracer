import { TraceExplorerPageActions } from '../actions';
import { EventNode } from '../models/event-node.model';

export interface State {
    eventNodes: EventNode[];
}

export const initialState: State = {
    eventNodes: []
};

export function reducer(state = initialState, action: TraceExplorerPageActions.TraceExplorerPageActionsUnion): State {
    switch (action.type) {
        case TraceExplorerPageActions.TraceExplorerPageActionTypes.DataUpdatedSuccessfully: {
            return {
                ...state,
                eventNodes: action.payload.data.tables[0].rows.map(r => {
                    return {
                        title:
                            r[0]
                                .split('.')
                                .slice(4)
                                .join('.') + ` (${r[4]})`,
                        clientIp: r[3],
                        key: r[1],
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

export const getEventNodes = (state: State) => state.eventNodes;
