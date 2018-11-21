import { TraceExplorerPageActions } from '../actions';
import { EventNode } from '../models/event-node.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<EventNode> {
    selectedNodeId: string | null;
    selectedRootNodeId: string | null;
    loading: boolean;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<EventNode> = createEntityAdapter<EventNode>({
    selectId: (node: EventNode) => node.key,
    sortComparer: false
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
    selectedNodeId: null,
    selectedRootNodeId: null,
    loading: false
});

export function reducer(state = initialState, action: TraceExplorerPageActions.TraceExplorerPageActionsUnion): State {
    switch (action.type) {
        case TraceExplorerPageActions.TraceExplorerPageActionTypes.LoadRootNodesSuccess: {
            /**
             * The addMany function provided by the created adapter
             * adds many records to the entity dictionary
             * and returns a new state including those records. If
             * the collection is to be sorted, the adapter will
             * sort each record upon entry into the sorted array.
             */
            return adapter.addMany(
                action.payload.data.tables[0].rows.map(r => {
                    return {
                        id: r[1],
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
                }),
                state
            );
        }
        // case TraceExplorerPageActions.TraceExplorerPageActionTypes.NodeExpanded: {
        //     return {
        //         ...state,
        //         // loading: true,
        //         currentSelectedNodeId: action.payload.nodeId,
        //         currentSelectedRootNodeId: action.payload.isLeaf
        //             ? state.currentSelectedRootNodeId
        //             : action.payload.nodeId
        //     };
        // }
        default: {
            return state;
        }
    }
}

export const getLoadingState = (state: State) => state.loading;
export const getSelectedNodeId = (state: State) => state.selectedNodeId;
export const getSelectedRootNodeId = (state: State) => state.selectedRootNodeId;
