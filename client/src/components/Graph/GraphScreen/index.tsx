import React, { useEffect, useState } from "react";

import {GraphDispatch, GraphState} from "../../../contexts/algorithm-context";
import GraphNode from "../GraphNode";
import {Node} from "../../../models/Node";
import "./GraphScreen.css";

interface GraphScreenProps {
  screenHeight: Number;
  screenWidth: Number;
  marginLeft: Number;
}

const GraphScreen: React.FC<GraphScreenProps> = ({ screenHeight, screenWidth, marginLeft }) => {

    const dispatch = GraphDispatch();

    const graphState = GraphState();

    const [configState, setConfigState] = useState('readyToRun');
    const [previousSelectNode, setPreviousSelectNode] = useState(0);

    useEffect(() => {
    }, [graphState.startNode, graphState.endNode]); // eslint-disable-line react-hooks/exhaustive-deps

    // const isWeightGraph = ['dijkstra', 'astar'].indexOf(graphState.algorithm) > -1;

    const isWeightGraph = graphState.weighted === "true";

    let fontSize = Math.min(Math.floor(screenWidth / (graphState.columnSize * 2)), 50);

    fontSize = Math.min(Math.floor(screenHeight / (graphState.rowSize * 1.9)), 200);

    let keyCount = 0;

    let isStartDragging = false;
    let isEndDragging = false;
    let prevEnteredStartTarget;
    let prevEnteredEndTarget;
    let previousDraggedStartNode;
    let previousDraggedEndNode;

    let onGraphNodeClick = (node:Node) => {
        if (node) {
            if (configState === 'updateStartNode') {
                if (node.isWall) {
                    alert('Do not select the wall');
                    return;
                } else if (node.id === graphState.endNode.id) {
                    alert('Do not select the end node');
                    return;
                } else {
                    document.getElementById(previousSelectNode + '-node-circle').classList.remove('blink');
                    dispatch({ type: "updateNode", startNode: node });
                    setConfigState('readyToRun');
                    setPreviousSelectNode(0);
                }
            } else if (configState === 'updateEndNode') {
                if (node.isWall) {
                    alert('Do not select the wall');
                    return;
                } else if (node.id === graphState.startNode.id) {
                    alert('Do not select the start node');
                    return;
                } else {
                    document.getElementById(previousSelectNode + '-node-circle').classList.remove('blink');
                    dispatch({ type: "updateNode", endNode: node });
                    setConfigState('readyToRun');
                    setPreviousSelectNode(0);
                }
            } else if (configState === 'readyToRun') {
                if (node.id === graphState.startNode.id) {
                    document.getElementById(node.id + '-node-circle').classList.add('blink');
                    setConfigState('updateStartNode');
                    setPreviousSelectNode(node.id);
                } else if (node.id === graphState.endNode.id) {
                    document.getElementById(node.id + '-node-circle').classList.add('blink');
                    setConfigState('updateEndNode');
                    setPreviousSelectNode(node.id);
                } else {
                    if (node.id === graphState.startNode.id) {
                        alert('Do not select the start node');
                        return;
                    } else if (node.id === graphState.endNode.id) {
                        alert('Do not select the end node');
                        return;
                    } else {
                        let wallIndex = graphState.walls.indexOf(node.id);
                        if (node.isWall) {
                            node.isWall = false;
                            graphState.walls.splice(wallIndex, 1);
                        } else {
                            node.isWall = true;
                            graphState.walls.push(node.id);
                        }

                        dispatch({ type: "updateGraphScreen", walls: graphState.walls });
                    }
                }
            }
        }
    }

    return (
      <div className="graph-screen" style={{width: `${screenWidth}px`, height: `${screenHeight}px`, marginLeft: `${marginLeft}px`, fontSize: `${fontSize}px`}} >
        { graphState.graphData && graphState.graphData.length ? graphState.graphData.map((columnArray, rowIndex) => {

              return (
                  <div className="row" key={rowIndex}>
                  { columnArray.map((node, columnIndex) => {

                      let nodeStyle = graphState.graphData[rowIndex][columnIndex] === true ? 'node-selected' : 'node';

                      if (node.visited) {
                          nodeStyle = 'node-visited';
                      }

                      if (node.isPath) {
                          nodeStyle = 'node-path';
                      }

                      if (node.id === graphState.endNode.id) {
                          nodeStyle = 'node-end';
                          if (node.isPath) {
                              nodeStyle += ' node-end-path';
                          }
                      } else if (node.id === graphState.startNode.id) {
                          nodeStyle = 'node-start';
                          if (node.isPath) {
                              nodeStyle += ' node-start-path';
                          }
                      }

                      if (node.isWall) {
                          nodeStyle = 'node-wall';
                      }
                      
                      let topWeight = 0;
                      let bottomWeight = 0;
                      let leftWeight = 0;
                      let rightWeight = 0;

                      if (rowIndex < graphState.graphData.length - 1) {
                         bottomWeight = node.weight + graphState.graphData[rowIndex + 1][columnIndex].weight;
                      }

                      if (columnIndex < columnArray.length - 1) {
                          rightWeight = node.weight + graphState.graphData[rowIndex][columnIndex + 1].weight;
                      }

                      return (
                            <GraphNode key={keyCount++} node={node} nodeStyle={nodeStyle} 
                                       clickHandler={onGraphNodeClick} 
                                       isWeightGraph={isWeightGraph} 
                                       rowIndex={rowIndex} columnIndex={columnIndex} 
                                       rowLength={graphState.graphData.length} columnLength={columnArray.length} 
                                       topWeight={topWeight} bottomWeight={bottomWeight} 
                                       leftWeight={leftWeight} rightWeight={rightWeight} 
                                       >
                            </GraphNode>
                      )
                    }) 
                  }      
                  </div>
              )
          }): null
        }
      </div>
    )
}

export default GraphScreen;