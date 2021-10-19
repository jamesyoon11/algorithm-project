import {TreeNode} from "../../models/TreeNode";

import {Tree} from "./Tree"; 

export class HeapTree extends Tree {
    
    isMaxHeap:Boolean = true;

    constructor(dispatch:Function, rootNode:TeeNode, value:Number) {
        super(dispatch, rootNode, value);
    }

    doAction = (action:String, kind:String, array:[]) => {
        this.isMaxHeap = kind === 'max';

        return new Promise(async resolve => {
            if (action === 'insert') {
                await this.insert(this.value, array);    
            } else if (action === 'extract') {
                await this.extract(array);    
            }

            this.dispatch({ type: "updateTreeScreen", treeStoredArray: array, nodeAnimations: { done: true }, updateStep: 1000 }); ///////////// Animation /////////////
            
            resolve();
        });
    }

    insert = async(value:Number, array:[]) => {
        let index = array.length;
        let parent;
        let parentIndex;
        let temp;
        let swap = true;

        array.push(value);

        await this.runHeapTreeAnimation({added: [array.length - 1]}); ///////////// Animation /////////////

        while(swap) {
            parentIndex = Math.floor((index - 1) / 2);

            parent = array[parentIndex];

            await this.runHeapTreeAnimation({comparing: [index, parentIndex]}); ///////////// Animation /////////////

            if (this.isMaxHeap && value > parent || !this.isMaxHeap && value < parent) {
                await this.runHeapTreeAnimation({swapping: [index, parentIndex]}); ///////////// Animation /////////////

                array[parentIndex] = value;
                array[index] = parent;
                swap = true;
            } else {
                swap = false;
            }

            index = parentIndex;
        }

        return array;
    }

    extract = async (array:[]) => {
        await this.runHeapTreeAnimationForTransit([0], String(array.length - 1), 0); ///////////// Animation /////////////

        array[0] = array.pop();

        let index = 0;
        let parent;
        let childIndex;
        let swapIndex = -1;
        let temp;
        let swap = true;

        let value = array[index];

        while(swap) {
            childIndex = index * 2 + 1;

            if (childIndex + 1 < array.length) {      // if has both left child and right child
                if ((this.isMaxHeap && array[childIndex] < array[childIndex + 1]) ||
                    (!this.isMaxHeap && array[childIndex] > array[childIndex + 1]) ) {  // determine which one is larger or smaller
                    if ((this.isMaxHeap && value < array[childIndex + 1]) || (!this.isMaxHeap && value > array[childIndex + 1])) {
                        swapIndex = childIndex + 1;
                    }
                } else {
                    if ((this.isMaxHeap && value < array[childIndex]) || (!this.isMaxHeap && value > array[childIndex])) {
                        swapIndex = childIndex;
                    }
                }
            } else if (childIndex < array.length) {
                if ((this.isMaxHeap && value < array[childIndex]) || (!this.isMaxHeap && value > array[childIndex])) {
                    swapIndex = childIndex;
                }
            } 

            if (swapIndex !== -1) {
                await this.runHeapTreeAnimation({comparing: [index, swapIndex]}); ///////////// Animation /////////////
                await this.runHeapTreeAnimation({swapping: [index, swapIndex]}); ///////////// Animation /////////////

                array[index] = array[swapIndex];
                array[swapIndex] = value;
                index = swapIndex;
                swap = true;
            } else {
                swap = false;
            }

            swapIndex = -1;
        }
    }
}