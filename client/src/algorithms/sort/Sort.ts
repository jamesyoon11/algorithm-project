import {ISort} from "./ISort";

import {getSpeed} from "../../utils/helper";

export class Sort implements ISort {

    dispatch: Function;
    speed:Number = 10;

    constructor(dispatch:Function, algorithm:String, speedLevel:String) {
        this.dispatch = dispatch;
        this.speed = getSpeed(algorithm, speedLevel);
    }

    timeout = (ms:Number) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
    }

    runAnimation = async (array:[], current:Number, compare:Number, pIndex:Number, arrayToMerge: [], mergeStart:Number, mergeEnd:Number) => {
        let sortAnimation = {
            currentIndex: current,
            compareIndex: compare,
            pivotIndex: pIndex
        }

        if (arrayToMerge) {
            let offset = 0;
            for (let i = mergeStart; i <= mergeEnd; i++) {
                array[i] = arrayToMerge[offset++];
            }
        }

        this.dispatch({ type: "updateSortScreen", sortData: array, sortAnimation: sortAnimation });

        await this.timeout(this.speed);
    }
}