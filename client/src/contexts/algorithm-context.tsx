import React from "react";

import {BubbleSort} from "../algorithms/sort/BubbleSort"
import {ShellSort} from "../algorithms/sort/ShellSort"
import {MergeSort} from "../algorithms/sort/MergeSort"
import {QuickSort} from "../algorithms/sort/QuickSort"
import {HeapSort} from "../algorithms/sort/HeapSort"

import {BreadthFirstSearch} from "../algorithms/graph/BreadthFirstSearch"
import {DepthFirstSearch} from "../algorithms/graph/DepthFirstSearch"
import {DijkstraSearch} from "../algorithms/graph/DijkstraSearch"
import {AStarSearch} from "../algorithms/graph/AStarSearch"

import {BinarySearchTreeInsert} from "../algorithms/tree/BinarySearchTreeInsert"
import {BinarySearchTreeDelete} from "../algorithms/tree/BinarySearchTreeDelete"
import {HeapTree} from "../algorithms/tree/HeapTree"

import {Node} from "../models/Node";
import {TreeNode} from "../models/TreeNode";

type GraphState = { 
    algorithm: String,
    graphData: Array,
    startNode: Node,
    endNode: Node,
    walls:Array,
    rowSize: Number,
    columnSize: Number,
    dispatch: Function,
    stateFileName: String,
    algorithmRunningState: string,
    weighted: String
};

type GraphAction = { 
    type: String,
    data: Array 
};

type GraphDispatch = (action: GraphAction) => void;

type SortState = { 
    sortData: Array,
    algorithm: String,
    sortDataSize: Number,
    speedLevel: String,
    algorithmRunningState: String,
    sortAnimation: Object,
    dispatch: Function
};

type SortAction = { 
    type: String,
    data: Array 
};

type SortDispatch = (action: SortAction) => void;

type TreeState = { 
    treeData: Array,
    algorithm: String,
    operation: String,
    kind: String,
    rootNode: TreeNode,
    treeLevel: Number,
    inputValue: Number,
    updateStep: Number,
    treeStoredArray: Array,
    nodeAnimations: Object,
    dispatch: Function
};

type TreeAction = { 
    type: String,
    data: Array 
};

type TreeDispatch = (action: TreeAction) => void;

async function GraphReducer(state, action) {
    switch (action.type) {
        case "startGraphAlgorithm": {
            console.log('====================== start startGraphAlgorithm ==========================');
            state.algorithm = action.algorithm;

            if (state.graphData && state.graphData.length > 0) {
                if (state.algorithm === 'bfs') {
                    console.log('bfs', state);
                    const bfSearch = new BreadthFirstSearch(state.graphData, state.startNode, state.endNode, state.weighted, action.dispatch);
                    await bfSearch.doSearch();
                } else if (state.algorithm === 'dfs') {
                    console.log('dfs', state);
                    const dfSearch = new DepthFirstSearch(state.graphData, state.startNode, state.endNode, state.weighted, action.dispatch);
                    await dfSearch.doSearch();
                } else if (state.algorithm === 'dijkstra') {
                    console.log('dijkstra', state);
                    const dijkstra = new DijkstraSearch(state.graphData, state.startNode, state.endNode, state.weighted, action.dispatch);
                    await dijkstra.doSearch();
                } else if (state.algorithm === 'astar') {
                    console.log('astar', state);
                    const astar = new AStarSearch(state.graphData, state.startNode, state.endNode, state.weighted, action.dispatch);
                    await astar.doSearch();
                }
            }
            console.log('====================== end startGraphAlgorithm ==========================');
            return { 
                algorithm: state.algorithm,
                graphData: state.graphData,
                startNode: state.startNode,
                endNode: state.endNode,
                walls: state.walls,
                rowSize: state.rowSize,
                columnSize: state.columnSize,
                stateFileName: state.stateFileName,
                algorithmRunningState: 'end',
                weighted: state.weighted
            };
        }
        case "updateGraphScreen": {
            if (action.graphData) {
                state.graphData = action.graphData;
            }
            if (action.startNode) {
                state.startNode = action.startNode;
            }
            if (action.endNode) {
                state.endNode = action.endNode;
            }
            if (action.algorithm) {
                state.algorithm = action.algorithm;
            }
            if (action.walls) {
                state.walls = action.walls;
            }
            if (action.rowSize) {
                state.rowSize = action.rowSize;
            }
            if (action.columnSize) {
                state.columnSize = action.columnSize;
            }
            if (action.stateFileName) {
                state.stateFileName = action.stateFileName;
            }
            if (action.algorithmRunningState) {
                state.algorithmRunningState = action.algorithmRunningState;
            }
            if (action.weighted) {
                state.weighted = action.weighted;
            }

            return {
                graphData: state.graphData,
                startNode: state.startNode,
                endNode: state.endNode,
                algorithm: state.algorithm,
                walls: state.walls,
                rowSize: state.rowSize,
                columnSize: state.columnSize,
                stateFileName: state.stateFileName,
                algorithmRunningState: state.algorithmRunningState,
                weighted: state.weighted
            }
        }
        case "updateNode" : {
            if (action.startNode) {
                state.startNode = action.startNode;
            }
            if (action.endNode) {
                state.endNode = action.endNode;
            }
            if (action.weighted) {
                state.weighted = action.weighted;
            }

            return {
                graphData: state.graphData,
                startNode: state.startNode,
                endNode: state.endNode,
                algorithm: state.algorithm,
                walls: state.walls,
                rowSize: state.rowSize,
                columnSize: state.columnSize,
                stateFileName: state.stateFileName,
                algorithmRunningState: state.algorithmRunningState,
                weighted: state.weighted
            }
        }
        // Default action
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

async function SortReducer(state, action) {
    switch (action.type) {
        case "startSortAlgorithm": {
            console.log('====================== start updateSortAlgorithm ==========================');
            state.algorithm = action.algorithm;
            state.sortAnimation = action.sortAnimation;

            if (state.sortData && state.sortData.length) {
                if (state.algorithm === 'bubble') {
                    const bubbleSort = new BubbleSort(action.dispatch, state.algorithm, state.speedLevel);
                    await bubbleSort.doSort(state.sortData);
                } else if (state.algorithm === 'shell') {
                    const shellSort = new ShellSort(action.dispatch, state.algorithm, state.speedLevel);
                    await shellSort.doSort(state.sortData);
                }  else if (state.algorithm === 'merge') {
                    const mergeSort = new MergeSort(action.dispatch, state.algorithm, state.speedLevel);
                    await mergeSort.doSort(state.sortData);
                } else if (state.algorithm === 'quick') {
                    const quickSort = new QuickSort(action.dispatch, state.algorithm, state.speedLevel);
                    await quickSort.doSort(state.sortData);
                } else if (state.algorithm === 'heap') {
                    const heapSort = new HeapSort(action.dispatch, state.algorithm, state.speedLevel);
                    await heapSort.doSort(state.sortData);
                }  
            }
            console.log('====================== end updateSortAlgorithm ==========================');
            return { 
                algorithm: state.algorithm,
                sortData: state.sortData,
                sortDataSize: state.sortDataSize,
                speedLevel: state.speedLevel,
                algorithmRunningState: 'end',
                sortAnimation: state.sortAnimation
            };
        }
        case "updateSortScreen": {
            if (action.sortData) {
                state.sortData = action.sortData;
            }
            if (action.algorithm) {
                state.algorithm = action.algorithm;
            }
            if (action.sortDataSize) {
                state.sortDataSize = action.sortDataSize;
            }
            if (action.speedLevel) {
                state.speedLevel = action.speedLevel;
            } 
            if (action.algorithmRunningState) {
                state.algorithmRunningState = action.algorithmRunningState;
            }

            if (action.sortAnimation) {
                state.sortAnimation = action.sortAnimation;
            }

            return { 
                sortData: state.sortData,
                algorithm: state.algorithm,
                startIndex: state.startIndex,
                endIndex: state.endIndex,
                pivotIndex: state.pivotIndex,
                sortDataSize: state.sortDataSize,
                speedLevel: state.speedLevel,
                algorithmRunningState: state.algorithmRunningState,
                sortAnimation: state.sortAnimation
            };
        }
        // Default action
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

async function TreeReducer(state, action) {
    switch (action.type) {
        case "startTreeAlgorithm": {
            console.log('====================== start treeAlgorithm ==========================');
            state.algorithm = action.algorithm;
            state.operation = action.operation;
            state.kind = action.kind;
            state.inputValue = action.inputValue;

            if (state.rootNode) {
                if (state.algorithm === 'bst') {
                    if (state.operation === 'insert') {
                        const bstInsert = new BinarySearchTreeInsert(action.dispatch, state.rootNode, state.inputValue);
                        await bstInsert.doAction(state.treeData);
                    } else if (state.operation === 'delete') {
                        const bstDelete = new BinarySearchTreeDelete(action.dispatch, state.rootNode, state.inputValue);
                        await bstDelete.doAction(state.treeData);
                    }
                } else if (state.algorithm === 'heap') {
                    const heapTree = new HeapTree(action.dispatch, state.rootNode, state.inputValue, state.treeStoredArray);
                    await heapTree.doAction(state.operation, state.kind, state.treeStoredArray);
                }
            }
            console.log('====================== end treeAlgorithm ==========================');
            return { 
                algorithm: state.algorithm,
                operation:state.operation,
                kind: state.kind,
                treeData: state.treeData,
                rootNode: state.rootNode,
                treeLevel: state.treeLevel,
                inputValue: state.inputValue,
                updateStep: state.updateStep,
                treeStoredArray: state.treeStoredArray,
                nodeAnimations: state.nodeAnimations
            };
        }
        case "updateTreeScreen": {
            if (action.algorithm) {
                state.algorithm = action.algorithm;
            }
            if (action.operation) {
                state.operation = action.operation;
            }
            if (action.kind) {
                state.kind = action.kind;
            }
            if (action.treeData) {
                state.treeData = action.treeData;
            }
            if (action.rootNode) {
                state.rootNode = action.rootNode;
            }
            if (action.treeLevel) {
                state.treeLevel = action.treeLevel;
            }
            if (action.inputValue) {
                state.inputValue = action.inputValue;
            }
            if (action.updateStep) {
                state.updateStep = action.updateStep;
            }
            if (action.treeStoredArray) {
                state.treeStoredArray = action.treeStoredArray;
            }
            if (action.nodeAnimations) {
                state.nodeAnimations = action.nodeAnimations
            }

            return { 
                algorithm: state.algorithm,
                operation:state.operation,
                kind: state.kind,
                treeData: state.treeData,
                rootNode: state.rootNode,
                treeLevel: state.treeLevel,
                inputValue: state.inputValue,
                updateStep: state.updateStep,
                treeStoredArray: state.treeStoredArray,
                nodeAnimations: state.nodeAnimations
            };
        }
        // Default action
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function useAsyncReducer(reducer, initState) {
    const [state, setState] = React.useState(initState);
    const dispatchState = async (action) => setState(await reducer(state, action));
    return [state, dispatchState];
}

type AlgorithmProviderProps = { 
    children: React.ReactNode 
    value: Any
};

function AlgorithmProvider({ children, value }: AlgorithmProviderProps) {

    // console.log('value', value);

    const graphInitialState = {
        algorithm: "",
        graphData: [],
        walls: [11, 71, 91, 111],
        // walls: [7, 37, 67, 97, 217, 247, 277, 307, 337,
        //         98,
        //         99, 129, 159, 249, 
        //         10, 70, 280, 310, 
        //         71, 101, 131, 161, 191,
        //         79, 109, 139,169, 199, 229, 259]
        // walls: [
        // 3,
        // 23, 
        // 43, 44, 45, 46, 47, 48, 49, 50,
        // 61, 70, 
        // 83, 84, 85, 86, 87, 88, 90,
        // 102, 110,
        // 122, 124, 125, 126, 127, 128, 129, 130,
        // 142,
        // 162, 163, 164, 165, 166, 167, 168, 169, 170
        // ],
        // walls: [],
        rowSize: 10,
        columnSize: 20,
        startNode: new Node(0, 0, 5, 4),
        endNode: new Node(0, 0, 15, 4),
        stateFileName: '',
        algorithmRunningState: 'ready',
        weighted: "false"
    };

    const sortInitialState = {
        algorithm: "",
        sortData: [],
        sortDataSize: 60,
        speedLevel: 'Medium',
        algorithmRunningState: 'ready',
        sortAnimation: {}
    };

    const treeInitialState = {
        algorithm: "",
        treeData: [],
        treeLevel: 4,
        updateStep: 1
    };

    // value.treeState = treeInitialState;

    const [graphState, graphDispatch] = useAsyncReducer(GraphReducer, graphInitialState);
    const [sortState, sortDispatch] = useAsyncReducer(SortReducer, sortInitialState);
    const [treeState, treeDispatch] = useAsyncReducer(TreeReducer, treeInitialState );
    // const [treeState, treeDispatch] = useAsyncReducerXXX(TreeReducer, treeInitialState);

    // treeState = treeState;
    // treeDispatch = treeDispatch;
    // let dummy  = {
    //     value: {
    //         something: treeState
    //     },
    // };

    return (
        <GraphStateContext.Provider value={graphState}>
          <GraphDispatchContext.Provider value={graphDispatch}>
            <SortStateContext.Provider value={sortState}>
              <SortDispatchContext.Provider value={sortDispatch}>  
                <TreeStateContext.Provider value={treeState}>
                  <TreeDispatchContext.Provider value={treeDispatch}>  
                  
                    {children}
                    
                  </TreeDispatchContext.Provider>    
                </TreeStateContext.Provider>   
              </SortDispatchContext.Provider>
            </SortStateContext.Provider>
          </GraphDispatchContext.Provider>
        </GraphStateContext.Provider>
    );
}

const GraphStateContext = React.createContext<GraphState | undefined>(undefined);

const GraphDispatchContext = React.createContext<GraphDispatch | undefined>(undefined);

const SortStateContext = React.createContext<SortState | undefined>(undefined);

const SortDispatchContext = React.createContext<SortDispatch | undefined>(undefined);

const TreeStateContext = React.createContext<TreeState | undefined>(undefined);

const TreeDispatchContext = React.createContext<TreeDispatch | undefined>(undefined);

function GraphState() {
  const context = React.useContext(GraphStateContext);

  if (context !== undefined) {
    return context;
  }
  throw new Error("GraphState must be used within a GraphProvider");
}

function GraphDispatch() {
  const context = React.useContext(GraphDispatchContext);

  if (context !== undefined) {
    return context;
  }
  throw new Error("GraphDispatch must be used within a GraphProvider");
}

function SortState() {
  const context = React.useContext(SortStateContext);

  if (context !== undefined) {
    return context;
  }
  throw new Error("SortState must be used within a SortProvider");
}

function SortDispatch() {
  const context = React.useContext(SortDispatchContext);

  if (context !== undefined) {
    return context;
  }
  throw new Error("SortDispatch must be used within a SortProvider");
}

function TreeState(setState) {
  const context = React.useContext(TreeStateContext);

  if (context !== undefined) {
    return context;
  }
  throw new Error("TreeState must be used within a TreeProvider");
}

function TreeDispatch() {
  const context = React.useContext(TreeDispatchContext);

  if (context !== undefined) {
    return context;
  }
  throw new Error("TreeDispatch must be used within a TreeProvider");
}

export { AlgorithmProvider, GraphState, GraphDispatch, SortState, SortDispatch, TreeState, TreeDispatch };