import {Node} from "../models/Node"

import {Search} from "./Search";

export class DepthFirstSearch extends Search{

    found:Boolean;
    
    constructor(array:[], startNode:Node, endNode:Node, weighted: Boolean, dispatch:Function) {
        super(array, startNode, endNode, weighted, dispatch);

        this.found = false;
    }

    doSearch = () => {
        return new Promise(async resolve => {

            await this.dfs(this.startNode);

            resolve();
        });
    }

    dfs = async (currentNode:Node) => {
        if (this.found) {
            return;
        }

        currentNode.visited = true;

        if (currentNode.id === this.endNode.id) {
            this.found = true;
            await this.printShortestPath();
        } else {
            for (let i = 0; i < currentNode.edges.length; i++) {
                let childNode = currentNode.edges[i];
                
                if (childNode) { 
                    if (!childNode.visited && !childNode.isWall) { 
                        await this.printGraphScreen();

                        childNode.setPreviousNode(currentNode);

                        await this.dfs(childNode); // recursive
                    }  
                }     
            }
        }
    }
}