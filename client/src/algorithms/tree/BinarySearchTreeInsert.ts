import {TreeNode} from "../../models/TreeNode";

import {Tree} from "./Tree"; 

export class BinarySearchTreeInsert extends Tree {
    
    constructor(dispatch:Function, rootNode:TeeNode, value:Number) {
        super(dispatch, rootNode, value);
    }

    doAction = (array:[]) => {
        return new Promise(async resolve => {
            await this.insert(this.value);

            this.dispatch({ type: "updateTreeScreen", rootNode: this.rootNode, updateStep: 1000 });
            
            resolve();
        });
    }

    insert = async (value:Number) => {
        let node = new TreeNode(value);
        
        if (!this.rootNode) {
            this.rootNode = node;
            return;
        }

        let prev;
        let temp = this.rootNode;
        let isValueExist = false;

        while (temp && temp.id){
            temp.compare = node;
            await this.runBinaryTreeAnimation(); ///////////// Animation /////////////

            if (temp.id > value) {
                prev = temp;
                temp = temp.left;
            } else if (temp.id < value) {
                prev = temp;
                temp = temp.right;
            } else if (temp.id === value) {
                isValueExist = true;
                temp.compare = null;
                break;
            }

            prev.compare = null;
        }

        if (!isValueExist) {
            prev.compare = null;
            
            if (prev.id > value) {
                prev.left = node;
            } else {
                prev.right = node;
            }
            node.previousNode = prev;
        }
    }
}