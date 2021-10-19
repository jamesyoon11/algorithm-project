export class Node {

    id: Number;
    weight:Number;
    edges: Array; // like css top: 0, right: 1, bottom: 2, left: 3
    x:Number;
    y: Number;
    frontier:Number;
    cost: Number;
    heuristic: Number;
    visited: Boolean;
    isPath:Boolean;
    isWall:Boolean;
    previousNode:Node;
    isTopEdgePath:Boolean;
    isRightEdgePath:Boolean;
    isBottomEdgePath:Boolean;
    isLeftEdgePath:Boolean;

    constructor(id:Number, weight:Number, x:Number, y:Number) {
        this.id = id;
        this.weight = weight;
        this.edges = [];
        this.x = x;
        this.y = y;
        this.frontier = Number.MAX_SAFE_INTEGER;
        this.cost = Number.MAX_SAFE_INTEGER;
        this.visited = false;
        this.isPath = false;
        this.isWall = false;
        this.isTopEdgePath = false;
        this.isRightEdgePath = false;
        this.isBottomEdgePath = false;
        this.isLeftEdgePath = false;

        for(let i = 0; i < 4; i++) {
            this.edges.push(null);
        }
    }

    addEdge = (edgeIndx:Number, edge:Node) => {
        this.edges[edgeIndx] = edge;
    }

    setPreviousNode = (node:Node) => {
        this.previousNode = node;
    }
}