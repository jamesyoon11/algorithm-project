export class TreeNode {

    id: Number;
    indexInArray: Number;

    left:TreeNode;
    right:TreeNode;
    parent:TreeNode;
    
    // all fields blow are for animation.
    x:Number;
    y: Number;
    matched: Boolean;
    deleted: Boolean;
    swap: Boolean;
    extract: Boolean;
    visited: Boolean;
    transitFrom: Boolean;
    transitLinkedNodeId: Number;
    compare:TreeNode;
    isEndNode:Boolean;
    isLeft:Boolean;
    isRight:Boolean;

    constructor(id:Number) {
        this.id = id;
    }
}