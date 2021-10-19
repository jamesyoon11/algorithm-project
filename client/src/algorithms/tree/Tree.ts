import {TreeNode} from "../../models/TreeNode";

import {ITree} from "./ITree";

export class Tree implements ITree {

    dispatch: Function;
    rootNode: TreeNode;
    compareNode:TreeNode;
    matchedNode:TreeNode;
    value: Number;
    speed:Number = 10;
    updateStep: Number = 10;

    constructor(dispatch:Function, rootNode:TreeNode, value:Number) {
        this.dispatch = dispatch;
        this.rootNode = rootNode;
        this.value = value;
    }

    timeout = (ms:Number) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
    }

    runHeapTreeAnimation = async (nodeAnimations) => {
        this.dispatch({
            type: "updateTreeScreen", 
            nodeAnimations: nodeAnimations,
            updateStep: ++this.updateStep 
        });
        await this.timeout(1000);
    }

    runHeapTreeAnimationForTransit = async (extract, transitKey, transitValue) => {
        let nodeAnimations = {};
        nodeAnimations.extract = extract;
        nodeAnimations.transit = {};
        nodeAnimations.transit[transitKey] = transitValue;

        this.dispatch({
            type: "updateTreeScreen", 
            nodeAnimations: nodeAnimations,
            updateStep: ++this.updateStep 
        });
        await this.timeout(1500);
    }

    runBinaryTreeAnimation = async () => {
        this.dispatch({ 
            type: "updateTreeScreen", 
            rootNode: this.rootNode, 
            updateStep: ++this.updateStep 
        });
        await this.timeout(1000);
    }

    runBinaryTreeAnimationForMatch = async (node:TreeNode) => {
        node.matched = true;
        this.dispatch({ 
            type: "updateTreeScreen", 
            rootNode: this.rootNode, 
            updateStep: ++this.updateStep 
        });
        await this.timeout(1000);
        node.matched = false;
    }

    runBinaryTreeAnimationForTransit = async (transitOriginNode:TreeNode, transitDestinationNode:TreeNode) => {
        transitDestinationNode.extract = true;
        transitOriginNode.transitFrom = true;
        transitOriginNode.transitLinkedNodeId = transitDestinationNode.id;
        this.dispatch({
            type: "updateTreeScreen", 
            updateStep: ++this.updateStep 
        });
        await this.timeout(1000);
        transitDestinationNode.extract = false;
        transitOriginNode.transitFrom = false;
        transitOriginNode.transitLinkedNodeId = -1;
    }

    runBinaryTreeAnimationForSearch = async (node:TreeNode) => {
        node.compare = this.compareNode;
            this.dispatch({
            type: "updateTreeScreen",
            updateStep: ++this.updateStep 
        });
        await this.timeout(1000);
        node.compare = null;
    }

    runBinaryTreeAnimationForExtract = async (node:TreeNode) => {
        node.extract = true;
            this.dispatch({
            type: "updateTreeScreen",
            updateStep: ++this.updateStep 
        });
        await this.timeout(1000);
        node.extract = false;
    }
}