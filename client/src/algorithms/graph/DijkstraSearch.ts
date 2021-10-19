import {Node} from "../models/Node";

import {Search} from "./Search";

export class DijkstraSearch extends Search {
    
    constructor(array:[], startNode:Node, endNode:Node, weighted: Boolean, dispatch:Function) {
        super(array, startNode, endNode, weighted, dispatch);
    }

    doSearch = () => {
        return new Promise(async resolve => {

            await this.dijkstra();

            resolve();
        });
    }

    dijkstra = async () => {
        const queue = [];
        const minDistanceMap = {};
        let found = false;
        let count = 0;

        for (let r = 0; r < this.array.length; r++) {
            let columnArray = this.array[r];
            for (let c = 0; c < columnArray.length; c++) { 
                let node = this.array[r][c];
                minDistanceMap[node.id + ''] = Number.MAX_SAFE_INTEGER;
            }
        }

        minDistanceMap[this.startNode.id + ''] = 0;    
        queue.push(this.startNode);

        while(queue.length) {
            let currentNode = queue.shift();

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
                            let distance = this.weighted ? currentNode.weight + childNode.weight : 1;   

                            // let distance = 1;

                            let alternateDistance = minDistanceMap[currentNode.id + ''] + distance;

                            if (alternateDistance < minDistanceMap[childNode.id + '']) {
                                minDistanceMap[childNode.id + ''] = alternateDistance;
                                childNode.setPreviousNode(currentNode);
                                queue.push(childNode);
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
}