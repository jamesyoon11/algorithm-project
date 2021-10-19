import {Sort} from "./Sort";

export class BubbleSort extends Sort {
    
    constructor(dispatch:Function, algorithm:String, speedLevel:String) {
        super(dispatch, algorithm, speedLevel);
    }

    doSort = (array:[]) => {
        return new Promise(async resolve => {

            await this.bubbleSort(array);

            await this.runAnimation(array); ///////////// Animation /////////////

            resolve();
        });
    }

    bubbleSort = async (array:[]) => {
        let isSwap = false;
        let count = 0;
            
        while (true) {
            isSwap = false;
            for (let i = 0; i < array.length - 1 - count; i++) {
                if (array[i] > array[i+1]) {
                    let temp = array[i];
                    array[i] = array[i+1];
                    array[i+1] = temp;

                    isSwap = true;

                    await this.runAnimation(array, i, i + 1); ///////////// Animation /////////////
                }
            }
            count++;
             
            if (!isSwap) {
                break;
            }
        }
    }
}