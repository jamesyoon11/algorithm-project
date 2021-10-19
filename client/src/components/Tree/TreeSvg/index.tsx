import React, { useEffect, useState, useRef } from "react";

import {TreeNode} from "../../../models/TreeNode";
import "./TreeSvg.css";

interface TreeSvgProps {
    treeArray: Array;
    screenWidth: Number;
    matchNodeId:Number;
    inputValue: Number;
}

const TreeSvg: React.FC<TreeSvgProps> = (props) => {
    const { treeArray, screenWidth, matchNodeId, inputValue } = props;
    
    let circleList = [];
    let compareList = [];
    let swapList = [];
    let extractList = [];
    let transitList = [];
    let nodeXYPositions = {};
    let levelWidth = 0;
    let round = 0;
    let treeCount = 1;
    let treeNode:TreeNode;
    
    let circleColor = "white";
    let circleReplace = false;
    let compareNodeX;
    let circleRadius = 16;
    let cx = 0;
    let cy = 0;
    let fontSize = "0.6em"; // circle font size
    let pathD;
    let pathId;
    let px = 0;
    let py = 0;
    let stroke = "black";
    let strokeWidth = 1;

    return (
        <svg key="treeSvg" height="100%" width="100%" id="mainSvg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" >
            { 
                treeArray.length > 0 ? treeArray.map((rowElement, rowIndex) => {

                    cy += 60;
                    cx = 0;
                    treeCount = Math.pow(2, round);
                    levelWidth = screenWidth / treeCount;

                    round++;
                    return (
                        <React.Fragment key={rowIndex}>
                            { 
                                treeArray[rowIndex].map((colElement, colIndex) => {    
                                    treeNode = treeArray[round - 1][colIndex];

                                    if (!treeNode) {
                                        return (
                                            <React.Fragment key={colIndex}>
                                            </React.Fragment>
                                        )
                                    } else {
                                        if (rowIndex > 5) {
                                            circleRadius = 10;
                                            fontSize = "0.4em"
                                        }

                                        cx = (levelWidth * colIndex) + levelWidth / 2;

                                        treeNode.x = cx;
                                        treeNode.y = cy;

                                        px = cx;
                                        py = cy;
                                        if (treeNode.parent) {
                                            px = treeNode.parent.x;
                                            py = treeNode.parent.y;
                                            if (treeNode.parent.left && treeNode.parent.left.id === treeNode.id) {
                                                treeNode.x = treeNode.parent.x - (levelWidth / 2);
                                            } else if (treeNode.parent.right && treeNode.parent.right.id === treeNode.id) {
                                                treeNode.x = treeNode.parent.x + (levelWidth / 2);
                                            }
                                        }
                                        pathD = `M ${treeNode.x} ${treeNode.y} L ${px} ${py}`;
                                        pathId = 'path' + treeNode.id;

                                        if (treeNode.id !== -1) {
                                            circleReplace = false;

                                            nodeXYPositions[treeNode.id] = {x: treeNode.x, y:treeNode.y};

                                            if (treeNode.matched) {
                                                circleColor = "white";
                                                stroke = "red";
                                                strokeWidth = 3;
                                            }

                                            if (treeNode.extract) {
                                                extractList.push({
                                                    key: treeNode.id, value: treeNode.id, fontSize: fontSize,
                                                    x: treeNode.x, y: treeNode.y, r: circleRadius,  
                                                    stroke: 'red', strokeWidth: 3, fillColor: 'white'
                                                });
                                                setTimeout(function(id) {
                                                    document.getElementById('node'+id).dispatchEvent(new Event('update'));
                                                }, 10, treeNode.id);
                                            }

                                            if (treeNode.swap) {
                                                swapList.push({
                                                    key: treeNode.id, value: treeNode.id, fontSize: fontSize,
                                                    x: treeNode.x, y: treeNode.y, r: circleRadius,  
                                                    stroke: 'orange', strokeWidth: 3, fillColor: 'white'
                                                });
                                                setTimeout(function(id) {
                                                    document.getElementById('node'+id).dispatchEvent(new Event('update'));
                                                }, 10, treeNode.id);
                                            }

                                            if (treeNode.transitFrom) {
                                                transitList.push({
                                                    key: treeNode.id, value: treeNode.id, fontSize: fontSize,
                                                    x: treeNode.x, y: treeNode.y, r: circleRadius,  
                                                    stroke: 'black', strokeWidth: 1, fillColor: 'white',
                                                    transitLinkedNodeId: treeNode.transitLinkedNodeId
                                                });
                                                setTimeout(function(id) {
                                                    document.getElementById('node'+id).dispatchEvent(new Event('update'));
                                                }, 300, treeNode.id);
                                            }

                                            if (!treeNode.replace && !treeNode.matched && !treeNode.replaceWithPreviousNode) {
                                                circleColor = "white";
                                                stroke = "black";
                                                strokeWidth = 1;
                                            }

                                            if (!treeNode.swap && !treeNode.extract && !treeNode.transitFrom) {
                                                circleList.push({
                                                    key: treeNode.id, fontSize: fontSize,
                                                    x: treeNode.x, y: treeNode.y, r: circleRadius,  
                                                    stroke: stroke, strokeWidth: strokeWidth, fillColor: circleColor
                                                });
                                            }

                                            if (treeNode.compare) {
                                                if (treeNode.compare.id < treeNode.id) {
                                                    compareNodeX = treeNode.x - (circleRadius * 2);
                                                    circleColor = 'lime';
                                                } else if (treeNode.compare.id > treeNode.id) {
                                                    compareNodeX = treeNode.x + (circleRadius * 2);
                                                    circleColor = 'lime';
                                                } else {
                                                    compareNodeX = treeNode.x;
                                                    circleColor = 'white';
                                                }
                                                compareList.push({
                                                    key: treeNode.compare.id, fontSize: fontSize,
                                                    x: compareNodeX, y: treeNode.y, r: circleRadius, 
                                                    fillColor: circleColor 
                                                });                                                
                                            }

                                            return (
                                                <React.Fragment key={colIndex}>
                                                    <path id={pathId} d={pathD} fill="none" stroke="#000000" strokeMiterlimit="10" pointerEvents="stroke" ></path>
                                                </React.Fragment>
                                            )
                                        } 
                                    }
                            })}
                        </React.Fragment>
                    )
                })  : null
            }

            {   
                circleList.map( (circle, index) => {
                    let key = circle.key;
                    let cx = circle.x;
                    let cy = circle.y;
                    let r = circle.r;
                    let fillColor = circle.fillColor;
                    let fontSize = circle.fontSize;
                    let stroke = circle.stroke;
                    let strokeWidth = circle.strokeWidth;
                    
                    let cid = "node" + key;
                    let tid = "text" + key;

                    return (
                        <React.Fragment key={index}>
                                <circle id={cid} cx={cx} cy={cy} r={r} stroke={stroke} strokeWidth={strokeWidth} fill={fillColor} ></circle>
                                <text id={tid} x={cx} y={cy} fontSize={fontSize} dy="0.1em" fontWeight="0.1" fontFamily="Verdana" textAnchor="middle" alignmentBaseline="middle" stroke="black" strokeWidth="1" >{key}</text>
                        </React.Fragment>
                    )
                })
            }

            {   
                swapList.map( (circle, index) => {
                    let key = circle.key;
                    let fromX = circle.x;
                    let fromY = circle.y;
                    let r = circle.r;
                    let fillColor = circle.fillColor;
                    let fontSize = circle.fontSize;
                    let stroke = circle.stroke;
                    let strokeWidth = circle.strokeWidth;
                    
                    let cid = "node" + key;
                    let tid = "text" + key;
                    let cid_href = "#" + cid;
                    let tid_href = "#" + tid;
                    let begin = cid + '.update';

                    let toX = 0;
                    let toY = 0;
                    let swap = false;
                    if (index === 0 && swapList[index + 1]) {
                        toX = swapList[index + 1].x;
                        toY = swapList[index + 1].y;
                    } else if (swapList[index - 1]){
                        toX = swapList[index - 1].x;
                        toY = swapList[index - 1].y;
                    }

                    return (
                        <React.Fragment key={index}>
                            <circle id={cid} cx={fromX} cy={fromY} r={r} stroke={stroke} strokeWidth={strokeWidth} fill={fillColor} ></circle>
                            <text id={tid} x={fromX} y={fromY} fontSize={fontSize} dy="0.1em" fontWeight="0.1" fontFamily="Verdana" textAnchor="middle" alignmentBaseline="middle" stroke="black" strokeWidth="1" >{key}</text>
                            <animate xlinkHref={cid_href} attributeName="cx" from={fromX} to={toX} dur="0.5s" begin={begin} fill="freeze"  />
                            <animate xlinkHref={cid_href} attributeName="cy" from={fromY} to={toY} dur="0.5s" begin={begin} fill="freeze"  />
                            <animate xlinkHref={tid_href} attributeName="x" from={fromX} to={toX} dur="0.5s" begin={begin} fill="freeze"  />
                            <animate xlinkHref={tid_href} attributeName="y" from={fromY} to={toY} dur="0.5s" begin={begin} fill="freeze"  />
                        </React.Fragment>
                    )
                })
            }

            {   
                extractList.map( (circle, index) => {
                    let key = circle.key;
                    let fromX = circle.x;
                    let fromY = circle.y;
                    let r = circle.r;
                    let fillColor = circle.fillColor;
                    let fontSize = circle.fontSize;
                    let stroke = circle.stroke;
                    let strokeWidth = circle.strokeWidth;
                    
                    let cid = "node" + key;
                    let tid = "text" + key;
                    let cid_href = "#" + cid;
                    let tid_href = "#" + tid;
                    let begin = cid + '.update';

                    let toX = fromX;
                    let toY = -100;

                    return (
                        <React.Fragment key={index}>
                            <circle id={cid} cx={fromX} cy={fromY} r={r} stroke={stroke} strokeWidth={strokeWidth} fill={fillColor} ></circle>
                            <text id={tid} x={fromX} y={fromY} fontSize={fontSize} dy="0.1em" fontWeight="0.1" fontFamily="Verdana" textAnchor="middle" alignmentBaseline="middle" stroke="black" strokeWidth="1" >{key}</text>
                            <animate xlinkHref={cid_href} attributeName="cx" from={fromX} to={toX} dur="0.5s" begin={begin} fill="freeze"  />
                            <animate xlinkHref={cid_href} attributeName="cy" from={fromY} to={toY} dur="0.5s" begin={begin} fill="freeze"  />
                            <animate xlinkHref={tid_href} attributeName="x" from={fromX} to={toX} dur="0.5s" begin={begin} fill="freeze"  />
                            <animate xlinkHref={tid_href} attributeName="y" from={fromY} to={toY} dur="0.5s" begin={begin} fill="freeze"  />
                        </React.Fragment>
                    )
                })
            }

            {   
                transitList.map( (circle, index) => {
                    let key = circle.key;
                    let fromX = circle.x;
                    let fromY = circle.y;
                    let r = circle.r;
                    let fillColor = circle.fillColor;
                    let fontSize = circle.fontSize;
                    let stroke = circle.stroke;
                    let strokeWidth = circle.strokeWidth;
                    let linkedNodeId = circle.transitLinkedNodeId;
                    
                    let cid = "node" + key;
                    let tid = "text" + key;
                    let cid_href = "#" + cid;
                    let tid_href = "#" + tid;
                    let pid_href = '#path' + key;
                    let begin = cid + '.update';

                    let toX = 0;
                    let toY = 0;
                    if (nodeXYPositions[linkedNodeId]) {
                        toX = nodeXYPositions[linkedNodeId].x;
                        toY = nodeXYPositions[linkedNodeId].y;
                    }

                    let pid = 'path' + key;
                    let pathElement = document.getElementById(pid);
                    let pathDNow = pathElement.getAttribute('d');
                    let pathD = `M ${toX} ${toY} ` + pathDNow.substring(pathDNow.indexOf('L'));

                    return (
                        <React.Fragment key={index}>
                            <circle id={cid} cx={fromX} cy={fromY} r={r} stroke={stroke} strokeWidth={strokeWidth} fill={fillColor} ></circle>
                            <text id={tid} x={fromX} y={fromY} fontSize={fontSize} dy="0.1em" fontWeight="0.1" fontFamily="Verdana" textAnchor="middle" alignmentBaseline="middle" stroke="black" strokeWidth="1" >{key}</text>
                            <animate xlinkHref={cid_href} attributeName="cx" from={fromX} to={toX} dur="0.7s" begin={begin} fill="freeze"  />
                            <animate xlinkHref={cid_href} attributeName="cy" from={fromY} to={toY} dur="0.7s" begin={begin} fill="freeze"  />
                            <animate xlinkHref={tid_href} attributeName="x" from={fromX} to={toX} dur="0.7s" begin={begin} fill="freeze"  />
                            <animate xlinkHref={tid_href} attributeName="y" from={fromY} to={toY} dur="0.7s" begin={begin} fill="freeze"  />
                            <animate xlinkHref={pid_href} attributeName="d" from={pathDNow} to={pathD} dur="0.7s" begin={begin} fill="none" id="pa" />
                            <animate xlinkHref={pid_href} attributeName="opacity" from="0" to="0" dur="2s" begin="pa.begin+0.7s"  fill="none" />
                        </React.Fragment>
                    )
                })
            }

            {   
                compareList.map( (circle, index) => {
                    let key = circle.key;
                    let cx = circle.x;
                    let cy = circle.y;
                    let r = circle.r;
                    let fontSize = circle.fontSize;
                    let fillColor = circle.fillColor;

                    return (
                        <React.Fragment key={index}>
                                <circle cx={cx} cy={cy} r={r} stroke="black" strokeWidth="1" fill={fillColor} ></circle>
                                <text x={cx} y={cy} fontSize={fontSize} dy="0.1em" fontWeight="1" fontFamily="Verdana" textAnchor="middle" alignmentBaseline="middle" stroke="black" strokeWidth="1" >{key}</text>
                        </React.Fragment>
                    )
                })
            }

        </svg>
    )
}

export default TreeSvg;