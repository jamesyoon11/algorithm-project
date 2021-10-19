/**
 * 
 *     Choose a pivot index (mostly the last of array) and compare all values in the range.
 * 
 *     Move lower values to left and higher values to right by swapping with the pivot index.
 * 
 *     Return the pivot index and it determines a partition.
 * 
 *     Recursive until there is no swap.
 * 
 *      _______________________________________________________________________
 *     |     7     |     5     |     1     |     3     |     2     |     4     |    
 *      -----------------------------------------------------------------------
 * 
 * 
 *                                                                     pivot
 *                                                                       |
 *  i        j                                                           V
 *      _______________________________________________________________________
 *     |     7     |     5     |     1     |     3     |     2     |     4     |      7 <= 4 : false
 *      -----------------------------------------------------------------------
 *        No swap
 * 
 *  i                    j
 *      _______________________________________________________________________
 *     |     7     |     5     |     1     |     3     |     2     |     4     |      5 <= 4 : false   
 *      -----------------------------------------------------------------------
 *                    No swap
 * 
 *  i                                j
 *      _______________________________________________________________________
 *     |     7     |     5     |     1     |     3     |     2     |     4     |      1 <= 4 : true   -->  i + 1 
 *      -----------------------------------------------------------------------
 *         (i + 1)
 *            +-------- swap --------+
 * 
 *           i                                   j
 *      _______________________________________________________________________
 *     |     1     |     5     |     7     |     3     |     2     |     4     |      3 <= 4 : true  --> i + 1
 *      -----------------------------------------------------------------------
 *                    (i + 1)
 *                       +--------- swap --------+
 * 
 *                       i                                   j
 *      _______________________________________________________________________
 *     |     1     |     3     |     7     |     5     |     2     |     4     |      2 <= 4 : true  --> i + 1
 *      -----------------------------------------------------------------------
 *                                (i + 1) 
 *                                   +--------- swap --------+
 * 
 *                                   i                                   j
 *      _______________________________________________________________________ 
 *     |     1     |     3     |     2     |     5     |     7     |     4     |      4 <= 4 : true  --> i + 1
 *      -----------------------------------------------------------------------
 *                                            (i + 1)
 *                                               +--------- swap --------+     
 *    
 *                                               i                       j
 *      _______________________________________________________________________
 *     |     1     |     3     |     2     |     4     |     7     |     5     |      Done 
 *      ----------------------------------------------------------------------- 
 *                                               ^
 *                                               |            
 *                                            pIndex
 *      |                                  |           |                       |
 *      +---------- partition 1 -----------+           +----- partition 2 -----+
 * 
 * 
 * 
 *                                 pivot
 *                                   |
 *  i        j                       V
 *      ___________________________________
 *     |     1     |     3     |     2     |       1 <= 2 : true -->  i + 1
 *      -----------------------------------
 *        (i + 1)
 *       +- swap -+
 * 
 *           i           j
 *      ___________________________________
 *     |     1     |     3     |     2     |       3 <= 2 : false
 *      -----------------------------------
 *                     No swap
 * 
 *           i                       j
 *      ___________________________________
 *     |     1     |     3     |     2     |       2 <= 2 : true --> i + 1
 *      -----------------------------------
 *                    (i + 1)
 *                       +-- swap ---+
 * 
 *                       i           j
 *      ___________________________________
 *     |     1     |     2     |     3     |        Done
 *      -----------------------------------
 *                       ^
 *                       |
 *                     pIndex
 * 
 *                                                                          pivot
 *                                                                            |
 *                                                                            V
 *                                                       i        j
 *                                                           _______________________
 *                                                          |     7     |     5     |     7 <= 5 : false
 *                                                           -----------------------
 *                                                             No swap
 * 
 *                                                       i                    j
 *                                                           _______________________
 *                                                          |     7     |     5     |     5 <= 5 : true  --> i + 1
 *                                                           -----------------------
 *                                                             (i + 1)
 *                                                                +--- swap --+
 * 
 *                                                                i           j
 *                                                           _______________________
 *                                                          |     5     |     7     |      Done
 *                                                           -----------------------
 *                                                                ^
 *                                                                |
 *                                                              pIndex
 *
 */
import {Sort} from "./Sort";

export class QuickSort extends Sort {

    constructor(dispatch:Function, algorithm:String, speedLevel:String) {
        super(dispatch, algorithm, speedLevel);
    }

    doSort = (array:[]) => {
        return new Promise(async resolve => {
            await this.quickSort(array, 0, array.length - 1);

            await this.runAnimation(array); ///////////// Animation /////////////

            resolve();
        });
    }

    quickSort = async (array:Array, left:Number, right: Number) => {
        if (left >= 0 && right >= 0) {
            if (left < right) {
                    let pIndex = await this.partition(array, left, right);
                    await this.quickSort(array, left, pIndex - 1);
                    await this.quickSort(array, pIndex + 1, right);
            }
        }
    }

    partition = async (array:Array, left:Number, right: Number) => {
        let pivot = array[right];

        let temp;

        let i = left - 1;

        for (var j = left; j <= right; j++) {
            if (array[j] <= pivot) {
                await this.runAnimation(array, i, j, right); ///////////// Animation /////////////

                i++;
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                
                await this.runAnimation(array, j, i, right); ///////////// Animation /////////////
            }
        }

        return i;
    }
}