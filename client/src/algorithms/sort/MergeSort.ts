import {Sort} from "./Sort";

export class MergeSort extends Sort {

    originalArray: [];
    
    constructor(dispatch:Function, algorithm:String, speedLevel:String) {
        super(dispatch, algorithm, speedLevel);
    }
    
    doSort = (array:[]) => {
        this.originalArray = [...array];
        return new Promise(async resolve => {

            array = await this.mergeSort(array, 0, array.length - 1);

            await this.runAnimation(array); /----------- Animation -----------/

            resolve();
        });   
    }

    mergeSort = async (array:[], start, end) => {
        let tempArray = [];

        if (end - start === 0) {
            tempArray.push(array[start]);
        } else if (end - start === 1) {
            if (array[start] > array[end]) {
                tempArray.push(array[end]);
                tempArray.push(array[start]);
            } else  {
                tempArray.push(array[start]);
                tempArray.push(array[end]);
            }
        } else {
            let middle = start + Math.floor( (end - start) / 2);

            let arr1 = await this.mergeSort(array, start, middle);
            let arr2 = await this.mergeSort(array, middle + 1, end);

            tempArray = await this.doMerge(arr1, arr2, start, end, array.length);
        }

        return tempArray;
    }

    doMerge = async (arr1:[], arr2:[], start, end, length) => {
        let tempArray = [];

        let animationArray = [...arr1, ...arr2]; ///////////// Animation /////////////

        let offsetI2 = arr1.length;

        let i1 = 0;
        let i2 = 0;

        while(true) {
            if (arr1[i1] < arr2[i2]) {
                tempArray.push(arr1[i1]);
                i1++;

                animationArray[i1+i2-1] = arr1[i1-1]; ///////////// Animation /////////////
                await this.runAnimation(this.originalArray, start + i1 + i2, start + offsetI2 + i2, undefined, animationArray, start, end); ///////////// Animation /////////////
            } else {
                tempArray.push(arr2[i2]);
                i2++;
                
                animationArray.splice(i1+i2-1, 0, arr2[i2-1]); ///////////// Animation /////////////
                animationArray.splice(offsetI2 + i2, 1); ///////////// Animation /////////////
                await this.runAnimation(this.originalArray, start + offsetI2 + i2, start + i1 + i2, undefined, animationArray, start, end); ///////////// Animation /////////////
            }
            

            if (i1 === arr1.length && i2 === arr2.length) {
                break;
            } if (i1 === arr1.length) {
                while (i2 < arr2.length) {
                    tempArray.push(arr2[i2]);
                    i2++;

                    animationArray.splice(i1+i2-1, 0, arr2[i2-1]); ///////////// Animation /////////////
                    animationArray.splice(offsetI2 + i2 - 1, 1); ///////////// Animation /////////////
                    await this.runAnimation(this.originalArray, start + i1 + i2, start + offsetI2 + i2, undefined, animationArray, start, end); ///////////// Animation /////////////
                }
                break;
            } if (i2 === arr2.length) {
                while (i1 < arr1.length) {
                    tempArray.push(arr1[i1]);
                    i1++;
                    await this.runAnimation(this.originalArray, start + i1 + i2, start + offsetI2 + i1, undefined, animationArray, start, end); ///////////// Animation /////////////
                }
                break;
            }

        }
        return tempArray;
    }

    
}