import {TreeNode} from "../../models/TreeNode";

import {Tree} from "./Tree"; 

export class BinarySearchTreeDelete extends Tree {
    
    constructor(dispatch:Function, rootNode:TreeNode, value:Number) {
        super(dispatch, rootNode, value);

        this.compareNode = new TreeNode(this.value);
    }

    doAction = (array:[]) => {
        return new Promise(async resolve => {
            await this.delete(resolve);
        });
    }

    delete = async (resolve:Function) => {
        let that = this;

        let promise = new Promise(async function(resolve, reject) {
            await that.deleteNode(that.rootNode, that.value, resolve);
        });

        promise.finally(async () => {            
            that.dispatch({ type: "updateTreeScreen", rootNode: that.rootNode, updateStep: 1000  }); ///////////// Animation /////////////
            resolve();      
        });
    }

    deleteNode = async (current:TreeNode, value:Number, resolve:Function) => {
        if (current.id > value) {
            await this.runBinaryTreeAnimationForSearch(current); ///////////// Animation /////////////
            this.deleteNode(current.left, value, resolve);
        } else if (current.id < value) {
            await this.runBinaryTreeAnimationForSearch(current); ///////////// Animation /////////////
            this.deleteNode(current.right, value, resolve);
        } else if (current.id === value) {
            if (this.value === value) {
                await this.runBinaryTreeAnimationForMatch(current); ///////////// Animation /////////////
            }
            if (current.left && current.left.id && current.right && current.right.id) {    // has two children
                let successor = this.findMinimum(current.right);
                await this.runBinaryTreeAnimationForTransit(successor, current); ///////////// Animation /////////////
                current.id = successor.id;
                this.deleteNode(successor, successor.id, resolve);
            } else if (current.left && current.left.id) {                                  // has one child (left)
                await this.replaceNodeWithParent(current.left, current.parent, current, value);
                resolve();
            } else if (current.right && current.right.id) {                                // has one child (right)
                await this.replaceNodeWithParent(current.right, current.parent, current, value);
                resolve();
            } else {                                                                       // has no children
                await this.replaceNodeWithParent(null, current.parent, current, value);
                resolve();
            }
        }
    }

    /**
     *  Get minimum node in a subtree
     */
    findMinimum = (node:TreeNode) => {
        let current = node;

        while (current) {
            if (current.left && current.left.id) {
                current = current.left;
            } else {
                break;
            }
        }
        return current;
    }

    replaceNodeWithParent = async (child:TreeNode, parent:TreeNode, current:TreeNode, value:Number) => {
        if (value === this.value) {
            if (child !== null) {
                await this.runBinaryTreeAnimationForTransit(child, current); ///////////// Animation /////////////
            } else {
                await this.runBinaryTreeAnimationForExtract(current);  ///////////// Animation /////////////
            }
        }

        if (parent) {
            if (parent.left && parent.left.id === current.id) {
                parent.left = child;
            } else if (parent.right && parent.right.id === current.id) {
                parent.right = child;
            }
        } else {
            this.rootNode = child;
            this.rootNode.parent = null;
        }
    }
}