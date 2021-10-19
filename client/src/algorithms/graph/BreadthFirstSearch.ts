import {Node} from "../models/Node";

import {Search} from "./Search";

export class BreadthFirstSearch extends Search {

    constructor(array:[], startNode:Node, endNode:Node,  weighted: Boolean, dispatch:Function) {
        super(array, startNode, endNode, weighted, dispatch);
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

            await this.bfs();

            resolve();
        });
    }

    bfs = async () => {
        const queue = [];
        let found = false;

        this.startNode.visited = true;

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
                        if (childNode.id === this.endNode.id) {
                            childNode.setPreviousNode(currentNode);
                            found = true;
                            break;
                        }

                        if (!childNode.visited && !childNode.isWall) {
                            childNode.visited = true;
                            childNode.setPreviousNode(currentNode);
                            queue.push(childNode);
                        }  
                    }     
                }
            }

            if (found) {
                break;
            }
            await this.printGraphScreen();
        }

        if (found) {
            await this.printShortestPath();
        }
    }
}