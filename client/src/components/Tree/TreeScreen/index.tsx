import React, { useEffect, useState, useRef } from "react";

import {TreeDispatch, TreeState} from "../../../contexts/algorithm-context";;
import {TreeNode} from "../../../models/TreeNode";
import TreeSvg from "../TreeSvg";
import "./TreeScreen.css";

interface TreeScreenProps {
  screenHeight: Number;
  screenWidth: Number;
  marginLeft: Number;
}

let _state;

const TreeScreen: React.FC<TreeScreenProps> = (props) => {

    const { screenHeight, screenWidth, marginLeft } = props;

    const treeState = TreeState();

    _state = treeState;
     
    let step = treeState.updateStep;

    // console.log('step: ', step);

    return (
        <div>
            { 
                treeState.rootNode !== undefined ?
                    <TreeSvgWrapper updateStep={step} screenWidth={screenWidth} screenHeight={screenHeight} marginLeft={marginLeft}>
                    </TreeSvgWrapper>
                : 
                null
            }
        </div>
    )
}

// Use React.memo for preventing unncessary re-rendering from updating TreeState context  
const TreeSvgWrapper = React.memo( ({ updateStep, screenWidth, screenHeight, marginLeft }) => {

    const constructArrayForTree = (node:TreeNode, level: Number, treeArray:Array) => {
        level++;

        if (treeArray.length < level + 1) {
            treeArray.push([]);
        }

        if (node.left && node.left.id) {
            node.left.parent = node;
            treeArray[level].push(node.left);
            constructArrayForTree(node.left, level, treeArray);
        } else if (node.left) {
            treeArray[level].push(null);
        }

        if (node.right && node.right.id) {
            node.right.parent = node;
            treeArray[level].push(node.right);
            constructArrayForTree(node.right, level, treeArray);
        } else if (node.right) {
            treeArray[level].push(null);
        }

        return;
    };

    const convertArrayToBinaryTree = (array:Array) => {
        
        let root:TreeNode = new TreeNode(array[0]);
        let node:TreeNode;
        let parent:TreeNode;
        let level = 1;
        let nodeMap:Object = {};
        let parentIndex;
        let i = 1;
        let nodeAnimations = _state.nodeAnimations || {};
        nodeMap[0] = root;

        root.indexInArray = 0;

        if (nodeAnimations.comparing && nodeAnimations.comparing.includes(0)) {
            root.matched = true;
        }
        if (nodeAnimations.swapping && nodeAnimations.swapping.includes(0)) {
            root.swap = true;
        }
        if (nodeAnimations.extract && nodeAnimations.extract.includes(0)) {
            root.extract = true;
        }
        if (nodeAnimations.transit && nodeAnimations.transit[String(0)] > -1) {
            root.transitFrom = true;
            root.transitLinkedNodeId = array[nodeAnimations.transit[String(0)]];
        }

        while(i < array.length) {
            let unitsPerLevel = Math.pow(2, level);
            for (let j = 0; j < unitsPerLevel; j++) {
                node = new TreeNode(array[i]);
                node.indexInArray = i;
                if (i === array.length - 1) {
                     node.isEndNode = true;
                }
                if (nodeAnimations.added && nodeAnimations.added.includes(i)) {
                    node.matched = true;
                }
                if (nodeAnimations.comparing && nodeAnimations.comparing.includes(i)) {
                    node.matched = true;
                }
                if (nodeAnimations.swapping && nodeAnimations.swapping.includes(i)) {
                    node.swap = true;
                }
                if (nodeAnimations.extract && nodeAnimations.extract.includes(i)) {
                    node.extract = true;
                }
                if (nodeAnimations.transit && nodeAnimations.transit[String(i)] > -1) {
                    node.transitFrom = true;
                    node.transitLinkedNodeId = array[nodeAnimations.transit[String(i)]];
                }

                nodeMap[i] = node;
                parentIndex = parseInt((i - 1)/2, 10);
                parent = nodeMap[parentIndex];
                if (parent) {
                    if (j%2 === 0) {
                        parent.left = node;
                    } else {
                        parent.right = node;
                    }
                }
                i++;
            }
            level++;
        }
        

        // assignArrayToTree('root', array[0], node, array, 1,     1, 0);
    
        return root;
    }

    const assignArrayToTree = (kind, from, node:TreeNode, array, start,        level, index) => {
        // let g = level === 0 ? 0 : Math.pow(2, level);
        // let g = Math.pow(2, level);
        let offset = Math.pow(2, level) - 1;
        level++;
        let str = kind + ' from array['+ index+ ']=' + from + ' offset='+ offset;
        // console.log(kind, 'from array['+ index+ ']=' + from, 'offset', g , 'start', start);
        
        start = offset;

        if (start < array.length) {
            str += ' left=' + array[offset];
            node.left = new TreeNode(array[start]);
            assignArrayToTree('left', array[start], node.left, array, offset++, level, start);
        }
        if (start + 1 < array.length) {
            str += ' rirght=' + array[start + 1];
            node.right = new TreeNode(array[start+1]);
            assignArrayToTree('right', array[start+1], node.right, array, offset++, level, start+1); 
        }
        // console.log(str);
    }

    const screenFontSize = 20;

    let matchNodeId = -1;

    let inputValue = _state.inputValue;

    let rootNode = _state.rootNode;

    if (_state.algorithm === 'heap') {
        rootNode = convertArrayToBinaryTree(_state.treeStoredArray);
    }

    let treeArray = new Array();
    treeArray.push([]);

    treeArray[0].push(rootNode);

    constructArrayForTree(rootNode, 0, treeArray);

    return (
        <div className="tree-screen" style={{width: `${screenWidth}px`, height: `${screenHeight}px`, marginLeft: `${marginLeft}px`, fontSize: `${screenFontSize}px`}} >
            <TreeSvg treeArray={treeArray} screenWidth={screenWidth} matchNodeId={matchNodeId} inputValue={inputValue}>
            </TreeSvg>
        </div> 
    ) 
});

export default TreeScreen;