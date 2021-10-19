import {Node} from "../models/Node";
import {MinHeap} from "../models/MinHeap";

import {Search} from "./Search";

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
export class AStarSearch extends Search {

    constructor(array:[], startNode:Node, endNode:Node, weighted: Boolean, dispatch:Function) {
        super(array, startNode, endNode, weighted, dispatch);
    }

    doSearch = () => {
        return new Promise(async resolve => {

            await this.astar();

            resolve();
        });
    }

    astar = async () => {
        const openSet = [];
        let found = false;
        let count = 0;

        this.startNode.cost = 0;
        this.startNode.heuristic = this.heuristic(this.startNode, this.endNode);
        this.startNode.frontier = this.startNode.heuristic;

        openSet.push(this.startNode);

        while(openSet.length) {
            let currentNode = this.getLowestFrontierNode(openSet);

            if (currentNode) {

                if (currentNode.id === this.endNode.id) {
                    found = true;
                    break;
                }
                
                for (let i = 0; i < currentNode.edges.length; i++) {
                    let neighborNode = currentNode.edges[i];
                    if (neighborNode) { 
                        if (!neighborNode.visited && !neighborNode.isWall) {

                            let distance = this.weighted ? currentNode.weight + neighborNode.weight : 1;

                            let tentativeCost = currentNode.cost + distance;

                            if (tentativeCost < neighborNode.cost) {
                                neighborNode.cost = tentativeCost;
                                neighborNode.heuristic = this.heuristic(neighborNode, this.endNode);
                                neighborNode.frontier = tentativeCost + neighborNode.heuristic;
                                openSet.push(neighborNode);
                                neighborNode.setPreviousNode(currentNode);
                            }
                        }
                    }
                }

                currentNode.visited = true;
            }
            await this.printGraphScreen();
        }
        if (found) {
            await this.printShortestPath();
        }
    }

    getLowestFrontierNode = (openSet:Array) => {

        let min:Number = Number.MAX_SAFE_INTEGER;
        let minValueIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
            let node = openSet[i];
            if (node.frontier < min) {
                min = node.frontier;
                minValueIndex = i;
            }
        }

        return openSet.splice(minValueIndex, 1)[0];
    }

    /**
     * 
     *  Manhattan distance
     * 
     */ 
    heuristic = (current:Node, end:Node) => {
        let dx = Math.abs(current.x - end.x);
        let dy = Math.abs(current.y - end.y);
        return (dx + dy);
    }
}