import {Sort} from "./Sort";

export class HeapSort extends Sort {
    
    constructor(dispatch:Function, algorithm:String, speedLevel:String) {
        super(dispatch, algorithm, speedLevel);
    }

    doSort = (array:[]) => {
        return new Promise(async resolve => {

            await this.heapSort(array);

            await this.runAnimation(array); ///////////// Animation /////////////

            resolve();
        });
    }

    heapSort = async (array:[]) => {
        await this.heapify(array);

        let max;

        for (let i = array.length - 1; i >= 0; i--) {
            max = array[0];
            array[0] = array[i];
            array[i] = max;

            await this.shiftDown(array, 0, i - 1);            
        }
    }

    heapify = async (array:[]) => {
        let index = array.length - 1;
        let lastIndex = index;

        while(index >= 0) {
            await this.runAnimation(array, -1, -1, lastIndex - index); ///////////// Animation /////////////

            await this.shiftDown(array, index, lastIndex, lastIndex - index);
            
            index = index - 1;
        }
    }

    shiftDown = async (array:[], index:Number, lastIndex: Number, endIndexForAnimation:Number) => {

        let childIndex;
        let swapIndex = -1;
        let value = array[index];

        while (index <= lastIndex) {
            swapIndex = -1;
            childIndex = index * 2 + 1;

            if (childIndex + 1 <= lastIndex) {
                if (array[childIndex] < array[childIndex + 1]) {
                    if (value < array[childIndex + 1]) {
                        swapIndex = childIndex + 1;
                    }
                } else {
                    if (value < array[childIndex]) {
                        swapIndex = childIndex;
                    }
                }
            } else if (childIndex <= lastIndex) {
                if (value < array[childIndex]) {
                    swapIndex = childIndex;
                }
            }

            if (swapIndex !== -1) {
                if (endIndexForAnimation) {
                    await this.runAnimation(array, index, swapIndex, endIndexForAnimation); ///////////// Animation /////////////
                } else {
                    await this.runAnimation(array, index, swapIndex); ///////////// Animation /////////////
                }
                array[index] = array[swapIndex];
                array[swapIndex] = value;
                index = swapIndex;
            } else {
                break;
            }
        }
    }
}