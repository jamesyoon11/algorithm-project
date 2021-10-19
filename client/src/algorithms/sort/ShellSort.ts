import {Sort} from "./Sort";

export class ShellSort extends Sort {
    
    constructor(dispatch:Function, algorithm:String, speedLevel:String) {
        super(dispatch, algorithm, speedLevel);
    }

    doSort = (array:[]) => {
        return new Promise(async resolve => {

            await this.shellSort(array);

            await this.runAnimation(array); ///////////// Animation /////////////

            resolve();
        });
    }

    shellSort = async (array:[]) => {

        let interval = 1;
        let valueToInsert;
        let j;

        while (interval < (array.length /3)) {
            interval = interval * 3 + 1 ;
        }

        while (interval > 0) {

            for (let i = interval; i < array.length; i++) {
                valueToInsert = array[i];

                j = i;
                while (j > interval - 1 && array[j - interval] >= valueToInsert) {
                    
                    await this.runAnimation(array, j, j - interval); ///////////// Animation /////////////

                    array[j] = array[j - interval]
                    j = j - interval


                }
                array[j] = valueToInsert;
            }

            interval = (interval - 1) /3;
        }
            
    }
}