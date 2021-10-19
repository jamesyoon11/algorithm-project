import {Node} from "../models/Node";
import {MinHeap} from "../models/MinHeap";

/**
 * 
 *  gScore := map with default value of Infinity
 *  gScore[start] := 0
 * 
 * 
 *  fScore := map with default value of Infinity
 *  fScore[start] := h(start)
 * 
 */
export class AStarSearch {

    array:Array;
    startNode:Node;
    endNode:Node;
    dispatch: Function;
    
    constructor(array:[], startNode:Node, endNode:Node, dispatch:Function) {
        this.array = array;
        this.startNode = startNode;
        this.endNode = endNode;
        this.dispatch = dispatch;
    }

    timeout = (ms:Number) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
    }

    doSearch = () => {
        return new Promise(async resolve => {

            await this.astar();

            resolve();
        });
    }

    astar = async () => {
        const openSet = [];
        const gScore = {};
        const frontiers = {};
        let found = false;
        let count = 0;

        for (let r = 0; r < this.array.length; r++) {
            let columnArray = this.array[r];
            for (let c = 0; c < columnArray.length; c++) { 
                let node = this.array[r][c];
                gScore[node.id + ''] = Number.MAX_SAFE_INTEGER;
            }
        }

        for (let r = 0; r < this.array.length; r++) {
            let columnArray = this.array[r];
            for (let c = 0; c < columnArray.length; c++) { 
                let node = this.array[r][c];
                frontiers[node.id + ''] = Number.MAX_SAFE_INTEGER;
            }
        }

        gScore[this.startNode.id + ''] = 0;    
        frontiers[this.startNode.id + ''] = this.heuristic(this.startNode, this.endNode);    

        openSet.push(this.startNode);

        while(openSet.length) {
            let currentNode = this.getLowestFrontierNode(openSet, frontiers);

            if (currentNode) {

                if (currentNode.id === this.endNode.id) {
                    found = true;
                    break;
                }
                
                for (let i = 0; i < currentNode.edges.length; i++) {
                    let childNode = currentNode.edges[i];
                    if (childNode) { 
                        if (!childNode.visited && !childNode.isWall) {

                            // let distance = currentNode.weight + childNode.weight;   

                            let distance = 1;   

                            let tentativeGscore = gScore[currentNode.id + ''] + distance;

                            if (tentativeGscore < gScore[childNode.id + '']) {
                                gScore[childNode.id + ''] = tentativeGscore;
                                frontiers[childNode.id + ''] = distance + this.heuristic(childNode, this.endNode);
                                openSet.push(childNode);
                                childNode.setPreviousNode(currentNode);
                            }
                        }
                    }
                }

                currentNode.visited = true;
            }
            await this.paintUpdatedScreen();
        }
        if (found) {
            await this.paintShortestPath();
        }
    }

    getLowestFrontierNode = (openSet:Array, fScore:Object) => {
        let min:Number = Number.MAX_SAFE_INTEGER;
        let minValueIndex = 0;
        let minNodeSet = [];
        for (let i = 0; i < openSet.length; i++) {
            let node = openSet[i];
            let score = fScore[node.id + ''];
            if (score <= min) {
                min = score;
                minValueIndex = i;
                minNodeSet.push(node);
            }
         }

         if (minNodeSet.length > 1) {
            let minNode = minNodeSet[0];
            for (let j = 1; j < minNodeSet.length; j++) {
                let currentNode = minNodeSet[j];

                if (currentNode.y < minNode.y && currentNode.x >= minNode.x) {
                    minNode = currentNode;
                }
            }
            minValueIndex = openSet.findIndex((node) => {
                return node.id === minNode.id;
            });
         }

        return openSet.splice(minValueIndex, 1)[0];
    }

    /**
     * 
     *  Manhattan distance
     * 
     */ 
    heuristic = (node:Node, goal:Node) => {
        let dx = Math.abs(node.x - goal.x);
        let dy = Math.abs(node.y - goal.y);
        return (dx + dy) * 1;
    }

    paintUpdatedScreen = async () => {
        await this.timeout(1);
        this.dispatch({ type: "updateGraphScreen", updatedGraphArray: this.array, startIndex: 0, endIndex: 0, startNode: this.startNode, endNode: this.endNode });
    }

    paintShortestPath = async () => {
        let node = this.endNode.previousNode;
        this.endNode.isPath = true;
        this.setNodePath(this.endNode, this.endNode.previousNode);
        
        while(node) {
            // if (node.id !== this.startNode.id && node.id !== this.endNode.id) {
                node.isPath = true;
            // }
            this.setNodePath(node, node.previousNode);
            await this.paintUpdatedScreen();
            node = node.previousNode;
        }
    }

    setNodePath(node:Node, previousNode:node) {
        if (!previousNode) {
            return;
        }
        if (node.id - previousNode.id === 1) {
            node.isLeftEdgePath = true;
            previousNode.isRightEdgePath = true;
        } else if (node.id - previousNode.id === -1) {
            node.isRightEdgePath = true;
            previousNode.isLeftEdgePath = true;
        } else if (node.id - previousNode.id > 1) {
            node.isTopEdgePath = true;
            previousNode.isBottomEdgePath = true;
        } else if (node.id - previousNode.id < -1) {
            node.isBottomEdgePath  = true;
            previousNode.isTopEdgePath = true;
        }
    }
}