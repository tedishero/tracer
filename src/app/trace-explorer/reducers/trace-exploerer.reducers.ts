import { TraceExplorerPageActions } from '../actions';
import { EventNode } from '../models/event-node.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AIResponse } from 'src/app/core/models/ai.model';

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
    expandedIds: string[];
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
    selectId: (node: EventNode) => node.id,
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
    expandedIds: null,
    loading: false
});

function toEventNodes(response: AIResponse): EventNode[] {
    return response.tables[0].rows.map(r => {
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
    });
}

function findChildRecursively(parentNode: EventNode, targetId: string): EventNode {
    if (!parentNode) {
        return undefined;
    }

    if (parentNode.id === targetId) {
        return parentNode;
    }

    if (!parentNode.children) {
        return undefined;
    }

    let result: EventNode = undefined;
    for (var i = 0; i < parentNode.children.length; i++) {
        result = findChildRecursively(parentNode.children[i], targetId);
        if (result) {
            break;
        }
    }

    return result;
}

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
            return adapter.addMany(toEventNodes(action.payload.data), state);
        }
        case TraceExplorerPageActions.TraceExplorerPageActionTypes.NodeExpanded: {
            return {
                ...state,
                loading: true,
                selectedNodeId: action.payload.nodeId,
                selectedRootNodeId: action.payload.isRoot ? action.payload.nodeId : state.selectedRootNodeId
            };
        }
        case TraceExplorerPageActions.TraceExplorerPageActionTypes.ChildrenFetchedSuccess: {
            let expandedIdsUpdated = state.expandedIds ? state.expandedIds.slice(0) : [];
            expandedIdsUpdated.push(state.selectedNodeId);
            let updatedState = {
                ...state,
                loading: false,
                expandedIds: expandedIdsUpdated
            };
            let selectedRootNode = state.entities[state.selectedRootNodeId];
            if (state.selectedNodeId === state.selectedRootNodeId) {
                // we just fetched the children of a parent node
                selectedRootNode.children = toEventNodes(action.payload.data);
                return adapter.updateOne(
                    {
                        id: selectedRootNode.id,
                        changes: {
                            children: selectedRootNode.children
                        }
                    },
                    updatedState
                );
            } else {
                // we just fetched the children of a leave node.
                // this means we need to get the root node of this leaf,
                // and find that leaf within that root node, update it
                let selectedNode = findChildRecursively(selectedRootNode, state.selectedNodeId);
                if (selectedNode) {
                    selectedNode.children = toEventNodes(action.payload.data);
                    return adapter.updateOne(
                        {
                            id: selectedRootNode.id,
                            changes: {
                                children: selectedRootNode.children
                            }
                        },
                        updatedState
                    );
                } else {
                    throw new Error('Node not found: ' + state.selectedNodeId);
                }
            }
        }
        default: {
            return state;
        }
    }
}

export const getLoadingState = (state: State) => state.loading;
export const getSelectedNodeId = (state: State) => state.selectedNodeId;
export const getSelectedRootNodeId = (state: State) => state.selectedRootNodeId;
export const getExpandedIds = (state: State) => state.expandedIds;
