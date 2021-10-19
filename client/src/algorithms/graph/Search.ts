import {Node} from "../models/Node"

import {ISearch} from "./ISearch";

export class Search implements ISearch{

    array:Array;
    startNode:Node;
    endNode:Node;
    weighted:Boolean;
    dispatch: Function;
    
    constructor(array:[], startNode:Node, endNode:Node, weighted:Boolean, dispatch:Function) {
        this.array = array;
        this.startNode = startNode;
        this.endNode = endNode;
        this.weighted = weighted === "true";
        this.dispatch = dispatch;
    }

    timeout = (ms:Number) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
    }

    printGraphScreen = async () => {
        await this.timeout(20);
        this.dispatch({ type: "updateGraphScreen", updatedGraphArray: this.array, startIndex: 0, endIndex: 0, startNode: this.startNode, endNode: this.endNode });
    }

    printShortestPath = async () => {
        this.endNode.isPath = true;
        this.setNodePath(this.endNode, this.endNode.previousNode);
        let node = this.endNode.previousNode;

        while(node) {
            node.isPath = true;
            this.setNodePath(node, node.previousNode);
            node = node.previousNode;

            await this.printGraphScreen();
        }
    }

    setNodePath(node:Node, previousNode:node) {
        if (!previousNode) {
            return;
        }
        if (node.id - previousNode.id === 1) { // the west node of the current node is a path
            node.isLeftEdgePath = true;
            previousNode.isRightEdgePath = true;
        } else if (node.id - previousNode.id === -1) { // the east node of the current node is a path
            node.isRightEdgePath = true;
            previousNode.isLeftEdgePath = true;
        } else if (node.id - previousNode.id > 1) { // the north node of the current node is a path
            node.isTopEdgePath = true;
            previousNode.isBottomEdgePath = true;
        } else if (node.id - previousNode.id < -1) { // the south node of the current node is a path
            node.isBottomEdgePath  = true;
            previousNode.isTopEdgePath = true;
        }
    }
}