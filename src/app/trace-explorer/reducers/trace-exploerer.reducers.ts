import { TraceExplorerPageActions } from '../actions';
import { EventNode } from '../models/event-node.model';

export interface State {
    eventNodes: EventNode[];
    currentSelectedNodeId: string;
    currentSelectedRootNodeId: string;
    loading: boolean;
}

export const initialState: State = {
    eventNodes: [],
    loading: false,
    currentSelectedNodeId: undefined,
    currentSelectedRootNodeId: undefined
};

export function reducer(state = initialState, action: TraceExplorerPageActions.TraceExplorerPageActionsUnion): State {
    switch (action.type) {
        case TraceExplorerPageActions.TraceExplorerPageActionTypes.DataUpdatedSuccessfully: {
            return {
                ...state,
                loading: false,
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
                        elapsedMilliseconds: r[4],
                        selectable: true
                    };
                })
            };
        }
        case TraceExplorerPageActions.TraceExplorerPageActionTypes.NodeExpanded: {
            return {
                ...state,
                // loading: true,
                currentSelectedNodeId: action.payload.nodeId,
                currentSelectedRootNodeId: action.payload.isLeaf
                    ? state.currentSelectedRootNodeId
                    : action.payload.nodeId
            };
        }
        default: {
            return state;
        }
    }
}

export const getEventNodes = (state: State) => state.eventNodes;
export const getLoadingState = (state: State) => state.loading;
export const getSelectedNodeId = (state: State) => state.currentSelectedNodeId;
export const getSelectedRootNodeId = (state: State) => state.currentSelectedRootNodeId;
