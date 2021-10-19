import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import {TreeDispatch, TreeState} from "../../../contexts/algorithm-context";
import {TreeNode} from "../../../models/TreeNode";
import "./TreeToolbar.css";

interface TreeToolbarProps {
    toolbarHeight: Number;
}

const TreeToolbar: React.FC <TreeToolbarProps>  = ({toolbarHeight}) => {

    let fontSize = toolbarHeight / 3;

    const dispatch = TreeDispatch();

    const treeState = TreeState();

    const { treeAlgorithm } = useParams();    

    const [isDisabled, setIsDisabled] = useState(false);
    const [treeTitle, setTreeTitle] = useState('');
    const [heapKind, setHeapKind] = useState(1);   // 1: max, 2: min

    const [deleteNodeList, setDeleteNodeList] = useState([]);

    let tempTreeData;
    let rootNode;
    let treeLevel;
    
    useEffect(() => {
        if (treeAlgorithm === 'bst') {
            setTreeTitle('Binary Search Tree');
            $('#extractTreeNodeButton').hide();
            $('#deleteTreeNodeSelect').show();
        } else if (treeAlgorithm === 'heap') {
            setTreeTitle('Heap Tree');
            $('#extractTreeNodeButton').show();
            $('#deleteTreeNodeSelect').hide();
        }
        generateSampleTree();
        // dispatch({ type: "updateTreeScreen", rootNode: rootNode, algorithm: treeAlgorithm, updateStep: treeState.updateStep++ });
    }, [treeAlgorithm]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (treeState.updateStep === 1000) {    
            setIsDisabled(false);
            let temp;
            if (treeState.algorithm === 'bst') {
                temp = [treeState.rootNode.id];
                updateDeleteNodeList(treeState.rootNode, temp);
                temp.sort((a, b) =>{
                    return a - b;
                });
            } else if (treeState.algorithm === 'heap') {
                temp = [...treeState.treeStoredArray];
                temp.sort((a, b) =>{
                    return a - b;
                });
            }
            setDeleteNodeList(temp);
            document.querySelector('#inputNum').value = '';
            if (temp.length > 1) {
                document.querySelector('#selectedDeleteNode').value = -1;
            }
        }
    }, [treeState.updateStep]);

    useEffect(() => {
        generateSampleTree();
    }, [heapKind]); // eslint-disable-line react-hooks/exhaustive-deps


    const generateSampleTree = (size) => {
        let temp = [];
        
        treeLevel = size || treeState.treeLevel;

        document.querySelector('#selectedTreeLevel').value = treeLevel;

        let treeDataSize = Math.pow(2, treeLevel) - 1 - Math.floor(Math.random() * treeLevel);

        let rand = 1;

        while (temp.length < treeDataSize ) {

            while(temp.indexOf(rand) !== -1) {
                rand = Math.floor(Math.random() * 200) + 1;
            }
            temp.push(rand);
        }

        temp.sort((a, b) =>{
            return a - b;
        });

        let treeStoredArray = [...temp];

        if (heapKind === 1) {
            treeStoredArray.reverse();
        }

        setDeleteNodeList([...temp]);

        let middle = Math.floor((temp.length - 1) / 2);

        rootNode = new TreeNode(temp[middle]);
                
        constructTree(true, rootNode, temp, 0, middle - 1);
        constructTree(false, rootNode, temp, middle + 1, temp.length);

        dispatch({ type: "updateTreeScreen", algorithm: treeAlgorithm, rootNode: rootNode, treeStoredArray: treeStoredArray, updateStep: ++treeState.updateStep  });

        document.querySelector('#inputNum').value = '';
        if (temp.length > 1) {
            document.querySelector('#selectedDeleteNode').value = -1;
        }
    };

    const constructTree = (isLeft:Boolean, node:TreeNode, array:[], start:Number, end:Number) => {
        let childValue;

        if (end - start === 0) {
            childValue = array[start];
            if (childValue) {
                if (isLeft) {
                    node.left = new TreeNode(childValue);
                } else {
                    node.right = new TreeNode(childValue);
                }
            }
        } else if (end - start > 0) {
            let middle = Math.floor((end - start) / 2) + start;

            childValue = array[middle];

            let currentNode;
            if (isLeft) {
                node.left = new TreeNode(childValue);
                currentNode = node.left;
            } else {
                node.right = new TreeNode(childValue);
                currentNode = node.right;
            }

            constructTree(true, currentNode, array, start, middle - 1);
            constructTree(false, currentNode, array, middle + 1, end);
        }
    };

    const updateDeleteNodeList = (node:TreeNode, oneArray:Array) => {
        if (node.left && node.left.id) {
            oneArray.push(node.left.id);
            updateDeleteNodeList(node.left, oneArray);
        }

        if (node.right && node.right.id) {
            oneArray.push(node.right.id);
            updateDeleteNodeList(node.right, oneArray);
        }
    };

    const insertNode = async  (e) => {
        e.preventDefault();
        let inputNum = parseInt(document.querySelector('#inputNum').value, 10);
        if (isNaN(inputNum) || inputNum < 1) {
            alert('Enter a number greater than 0');
            return;
        }
        if (deleteNodeList.indexOf(inputNum) > -1) {
            alert(inputNum + ' already exists. Enter a different number');
            return;
        }
        if (treeState.algorithm === 'bst') {
            dispatch({ type: "startTreeAlgorithm", algorithm: 'bst', operation: 'insert', inputValue: inputNum, dispatch: dispatch });
        } else if (treeState.algorithm === 'heap') {
            let kind = heapKind === 1 ? 'max' : 'min';
            dispatch({ type: "startTreeAlgorithm", algorithm: 'heap', operation: 'insert', kind: kind, inputValue: inputNum, dispatch: dispatch });
        }
        setIsDisabled(true);
    };

    const extract = async (e) => {
        let kind = heapKind === 1 ? 'max' : 'min';
        dispatch({ type: "startTreeAlgorithm", algorithm: 'heap', operation: 'extract', kind: kind, dispatch: dispatch });
        setIsDisabled(true);
    }

    const deleteNode = async (e) => {
        e.preventDefault();
        let value = parseInt(document.querySelector('#selectedDeleteNode').value, 10);
        if (treeState.algorithm === 'bst') {
            dispatch({ type: "startTreeAlgorithm", algorithm: 'bst', operation: 'delete', inputValue: value, dispatch: dispatch });
        } else if (treeState.algorithm === 'heap') {
            let kind = heapKind === 1 ? 'max' : 'min';
            dispatch({ type: "startTreeAlgorithm", algorithm: 'heap', operation: 'delete', kind: kind, inputValue: value, dispatch: dispatch });
        }
        setIsDisabled(true);        
    };

    const resetTreeLevels = (e) => {
        let level = parseInt(document.querySelector('#selectedTreeLevel').value, 10);
        generateSampleTree(level);
    }

    const onHeapSelectionChange = (e) => {
        let level = parseInt(document.querySelector('#selectedTreeLevel').value, 10);    
        if (e.target.value === 'max') {
            setHeapKind(1);
        } else {
            setHeapKind(2);
        }
    }

    return (
        <div className={(isDisabled) ? 'tree-toolbar disabled' : ' tree-toolbar'} style={{height: `${toolbarHeight}px`, fontSize: `${fontSize}px`}} disabled={isDisabled}>
            <span className="tree-title">{treeTitle}</span>
            <div className={(treeAlgorithm === 'bst') ? 'hide heap-radio' : 'heap-radio' } disabled={isDisabled}>
                <label htmlFor="max">
                    <input type="radio" id="max" name="heap_select" value="max" checked={heapKind===1} onChange={onHeapSelectionChange}  disabled={isDisabled}></input>
                    <i>Max</i>
                </label>
                <label htmlFor="min">
                    <input type="radio" id="min" name="heap_select" value="min" checked={heapKind===2} onChange={onHeapSelectionChange}  disabled={isDisabled}></input>
                    <i>Min</i>
                </label>
            </div>
            <input id="inputNum" className="tree-insert-input" type="tel" maxLength="3" disabled={isDisabled} />
            <button className="tree-toolbar-button" disabled={isDisabled} onClick={(e)=> { insertNode(e) }}>Insert</button>
            <button id="extractTreeNodeButton" className="tree-toolbar-button" disabled={isDisabled} onClick={(e)=> { extract(e) }}>Extract</button>
            <div id="deleteTreeNodeSelect" className="tree-toolbar-select">
                <form className="tree-toolbar-form">
                    <select className="tree-config-selector" id="selectedDeleteNode" disabled={isDisabled} onChange={deleteNode} defaultValue="-1" >
                        <option value="-1" disabled >Delete Node</option>
                    {   deleteNodeList.map(function (value, index) {
                            return (
                                <option key={index} value={value}>{value}</option>
                            )
                        })
                    }
                    </select>
                </form>
            </div>
            <button className="tree-toolbar-button" disabled={isDisabled} onClick={()=> { resetTreeLevels() }}>Reset</button>
            <div className="tree-toolbar-select">
                <label>Tree Levels: </label>
                <form className="tree-toolbar-form">
                    <select className="tree-config-selector" id="selectedTreeLevel" disabled={isDisabled} onChange={resetTreeLevels} value={treeLevel} >
                    {   Array(5).fill(null).map(function (x, index) {
                            const size = index + 2;
                            return (
                                <option key={index} value={size}>{size}</option>
                            )
                        })
                    }
                    </select>
                </form>
            </div>
        </div> 
    )
}

export default TreeToolbar;