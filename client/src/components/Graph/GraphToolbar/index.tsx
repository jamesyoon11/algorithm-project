import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import {GraphDispatch, GraphState} from "../../../contexts/algorithm-context";
import {download, loadBoard, retrieveBoard} from "../../../utils/helper";
import {Node} from "../../../models/Node";
import "./GraphToolbar.css";

interface GraphToolbarProps {
  toolbarHeight: Number;
}

const GraphToolbar: React.FC<GraphToolbarProps> = ({toolbarHeight}) => {

    let fontSize = toolbarHeight / 3;

    const dispatch = GraphDispatch();

    const graphState = GraphState();

    const { graphAlgorithm } = useParams();

    const [isDisabled, setIsDisabled] = useState(false);
    const [graphTitle, setGraphTitle] = useState('');
    const [weightChecked, setWeightChecked] = useState(false);
    const [isWeightDisabled, setIsWeightDisabled] = useState(false);

    let startNode;
    let endNode;
  
    useEffect(() => {
        if (graphAlgorithm === 'dfs') {
            setGraphTitle('Depth First Search');
            if (graphState.weighted === 'true') {
                dispatch({ type: "updateGraphScreen", weighted: 'false' });
            }
            setIsWeightDisabled(true);
        } else if (graphAlgorithm === 'bfs') {
            setGraphTitle('Breadth First Search');
            if (graphState.weighted === 'true') {
                dispatch({ type: "updateGraphScreen", weighted: 'false' });
            }
            setIsWeightDisabled(true);
        } else if (graphAlgorithm === 'dijkstra') {
            setGraphTitle('Dijkstra Search');
            setIsWeightDisabled(false);
        } else if (graphAlgorithm === 'astar') {
            setGraphTitle('A* Search');
            setIsWeightDisabled(false);
        }
        // setWeightChecked(graphState.weighted === 'true' && graphAlgorithm !== 'dfs' && graphAlgorithm !== 'bfs');
        resetGraphData();
    }, [graphAlgorithm]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (graphState.algorithmRunningState === 'end') {
            setIsDisabled(false);
        }
        setWeightChecked(graphState.weighted === 'true');
    }, [graphState.algorithmRunningState]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setWeightChecked(graphState.weighted === 'true' && graphAlgorithm !== 'dfs' && graphAlgorithm !== 'bfs');
        resetGraphData();
    }, [graphState.rowSize, graphState.columnSize, graphState.stateFileName, graphState.weighted]); // eslint-disable-line react-hooks/exhaustive-deps

    const resetGraphData = () => {

        const rows = graphState.rowSize;
        const columns = graphState.columnSize;

        startNode = graphState.startNode;
        endNode =  graphState.endNode;

        const rowArray = [];
        const nodeArray = [];

        let count = 1;
        for (let r = 0; r < rows; r++) {
            let columnArray = [];
            nodeArray.push([]);
            for (let c = 0; c < columns; c++) {    
                
                // let weight = parseInt(Math.floor(Math.random() * 20), 10) + 1;

                let weight = parseInt(Math.floor(Math.random() * 2), 10) + 1;

                let node = new Node(count, weight, c, r);

                if (graphState.walls && graphState.walls.indexOf(count) > -1) {
                    node.isWall = true;
                }
                nodeArray[r].push(node); 
                count++;

                columnArray.push(false);
            }
            rowArray.push(columnArray);
        }

        if (startNode.y < graphState.rowSize && startNode.x < graphState.columnSize) {
            startNode = nodeArray[startNode.y][startNode.x];
        } else {
            startNode = nodeArray[0][0];
        }

        if (endNode.y < graphState.rowSize && endNode.x < graphState.columnSize) {
            endNode = nodeArray[endNode.y][endNode.x];
        } else {
            endNode = nodeArray[graphState.rowSize - 1][graphState.columnSize - 1];
        }

        for (let r = 0; r < rows; r++) {
            let columnArray = [];
            for (let c = 0; c < columns; c++) {

                let node = nodeArray[r][c];
                
                if (r !== 0) {
                    node.addEdge(0, nodeArray[r - 1][c]);
                }
                if (c !== columns - 1) {
                    node.addEdge(1, nodeArray[r][c + 1]);
                }
                if (r !== rows - 1) {
                    node.addEdge(2, nodeArray[r + 1][c]);
                }
                if (c !== 0) {
                    node.addEdge(3, nodeArray[r][c - 1]);
                }

                columnArray.push(false);
            }
            rowArray.push(columnArray);
        }

        dispatch({ type: "updateGraphScreen", algorithm: graphAlgorithm, graphData: nodeArray, startNode:startNode, endNode:endNode });
    };

    const startAlgorithm = async  (algorithm) => {
        graphState.algorithmRunningState = 'running';
        dispatch({ type: "startGraphAlgorithm", algorithm: graphAlgorithm, dispatch: dispatch });
        setIsDisabled(true);
    };

    const updateGraphRowSize = (e) => {
        let rowSize = Number(e.target.value);
        dispatch({ type: "updateGraphScreen", rowSize: rowSize });
    };

    const updateGraphColumnSize = (e) => {
        let columnSize = Number(e.target.value);
        dispatch({ type: "updateGraphScreen", columnSize: columnSize });
    };

    const updateStartNode = () => {
        graphState.updateMode = 'startNode';
    };

    const updateEndNode = () => {
        graphState.updateMode = 'endNode';
    };

    const saveBoard = (e) => {
        // e.preventDefault();
        download(e, graphState);
    };

    const loadSavedBoard = (e) => {
        loadBoard(e, (contents, fileName) => {

            let tempState = JSON.parse(contents);

            if (tempState) {

                let sNode = new Node(0, 0, tempState.startNodeX, tempState.startNodeY);
                let eNode = new Node(0, 0, tempState.endNodeX, tempState.endNodeY);

                dispatch({ 
                    type: "updateGraphScreen", 
                    walls: tempState.walls, 
                    rowSize: tempState.rowSize, 
                    columnSize: tempState.columnSize, 
                    startNode:sNode, 
                    endNode:eNode, 
                    stateFileName: fileName 
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const fileSelect = (e) => {
        e.preventDefault();
        retrieveBoard(e.target.files);
    };

    const handleWeightChange = (e) => {
        let weighted = e.currentTarget.checked ? "true" : "false";
        dispatch({ type: "updateGraphScreen", weighted: weighted });
        setWeightChecked(weighted === 'true');
    }

    return (
        <div className={(isDisabled) ? 'graph-toolbar disabled' : ' graph-toolbar'} style={{height: `${toolbarHeight}px`, fontSize: `${fontSize}px`}} disabled={isDisabled}>
            <span className="graph-title">{graphTitle}</span>
            <div className="graph-weight-placeholder" disabled={isDisabled || isWeightDisabled}>
                <input type="checkbox" id="isWeighted" name="isWeighted" checked={weightChecked} onChange={handleWeightChange} disabled={isDisabled || isWeightDisabled}></input>
                <label htmlFor="isWeighted" disabled={isDisabled || isWeightDisabled}>Weighted </label>
            </div>
            
            <button className="graph-toolbar-button" disabled={isDisabled} onClick={()=> { startAlgorithm() }}>Start</button>
            <button className="graph-toolbar-button" disabled={isDisabled}  onClick={()=> { resetGraphData() }}>Reset</button>

            <div className="row-size-selector">
                <label>Rows: </label>
                <form className="row-size-select-form">
                    <select className="graph-size-selector" disabled={isDisabled} onChange={updateGraphRowSize} value={graphState.rowSize} >
                    {   Array(15).fill(null).map(function (x, index) {
                            const size = index + 2;
                            return (
                                <option key={index} value={size}>{size}</option>
                            )
                        })
                    }
                    </select>
                </form>
            </div>
            <div className="column-size-selector">
                <label>Columns: </label>
                <form className="column-size-select-form">
                    <select className="graph-size-selector" disabled={isDisabled} onChange={updateGraphColumnSize} value={graphState.columnSize} >
                    {   Array(29).fill(null).map(function (x, index) {
                            const size = index + 2;
                            return (
                                <option key={index} value={size}>{size}</option>
                            )
                        })
                    }
                    </select>
                </form>
            </div>
            <a className="graph-toolbar-anchor" disabled={isDisabled} onClick={saveBoard}>Save Board</a>
            <button className="graph-toolbar-button load-button" disabled={isDisabled} onClick={loadSavedBoard}>Load Board</button>
        </div> 
    )
}

export default GraphToolbar;