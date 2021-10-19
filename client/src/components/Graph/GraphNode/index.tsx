import React, { useEffect, useState } from "react";

import {Node} from "../../../models/Node";
import "./GraphNode.css";

interface GraphNodeProps {
  node: Node;
  nodeStyle: String;
  rowIndex: Number;
  columnIndex: Number;
  columnLength: Number;
  rowLength: Number;
  clickHandler: Function;
  isWeightGraph: Boolean;
  topWeight: Number;
  rightWeight: Number;
  bottomWeight: Number;
  leftWeight: Number;
}

const GraphNode: React.FC<GraphNodeProps> = ({ node, nodeStyle, clickHandler, isWeightGraph, 
  rowIndex, columnIndex, rowLength, columnLength, topWeight, bottomWeight, leftWeight, rightWeight}) => {
    
    let onNodeClick = () => {
        clickHandler(node);        
    };

    let topWeightClasses = 'none';
    let topEdgeClasses = '';
    if (rowIndex !== 0) {
        topEdgeClasses = 'vertical-edge';
        if (node.isTopEdgePath) {
            topEdgeClasses += ' selected-path';
        }
    }

    let rightWeightClasses = rightWeight === 0 || !isWeightGraph ? 'none': 'right-weight';
    let rightEdgeClasses = '';
    if (columnIndex !== columnLength - 1) {
        rightEdgeClasses = 'horizonal-edge';
        if (node.isRightEdgePath) {
            rightEdgeClasses += ' selected-path';
            rightWeightClasses += ' path-weight';
        }
    }

    let bottomWeightClasses = bottomWeight === 0 || !isWeightGraph ? 'none': 'bottom-weight';
    let bottomEdgeClasses = '';
    if (rowIndex !== rowLength - 1) {
        bottomEdgeClasses = 'vertical-edge';
        if (node.isBottomEdgePath) {
            bottomEdgeClasses += ' selected-path';
            bottomWeightClasses += ' path-weight';
        }
    }

    let leftWeightClasses = 'none';
    let leftEdgeClasses = '';
    if (columnIndex !== 0) {
        leftEdgeClasses = 'horizonal-edge';
        if (node.isLeftEdgePath) {
            leftEdgeClasses += ' selected-path';
        }
    }

    return (
        <div className="graph not-selectable">
          <div className="top"><div className={topEdgeClasses}><span className={topWeightClasses}>{topWeight}</span></div></div>
          <div className="middle">
              <div className="left"><div className={leftEdgeClasses}><span className={leftWeightClasses}>{leftWeight}</span></div></div>
              <div id={`${node.id}-node-circle`} className={nodeStyle} onClick={()=> { onNodeClick() }} >{node.id}</div>
              <div className="right"><div className={rightEdgeClasses}><span className={rightWeightClasses}>{rightWeight}</span></div></div>
          </div>  
          <div className="bottom"><div className={bottomEdgeClasses}><span className={bottomWeightClasses}>{bottomWeight}</span></div></div>
        </div>
    )              
}

export default GraphNode;