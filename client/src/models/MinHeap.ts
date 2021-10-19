import {Node} from './Node';

export class MinHeap {

    nodes:Array;
    values:Array;
    

    constructor() {
        this.nodes = [];
        this.values = [];
    }

    add = (node:Node, value:Number) => {
        this.nodes.push(node);
        this.values.push(value);
    }

    get = () => {
        let min:Number = Number.MAX_SAFE_INTEGER;
        let minValueIndex = 0;
        this.values.forEach((value, index) => {
            if (value < min) {
                min = value;
                minValueIndex = index;
            }
         });

        return this.nodes.splice(minValueIndex, 1)[0];
    }

    size = () => {
        return this.nodes.length;
    }
}