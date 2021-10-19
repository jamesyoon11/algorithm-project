import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Menu.css";

interface MenuProps {
  menuHeight: Number;
}

const Menu: React.FC <MenuProps> = ({menuHeight}) => {

    let fontSize = menuHeight / 3;

    return (
        <div className="navbar" style={{height: `${menuHeight}px`, fontSize: `${fontSize}px`}}>
            <img className="algo-icon" src="algorithm/favicon.svg"></img>
            <img className="algo-text" src="algorithm/algo_visualizer.svg"></img>
            <div className="dropdown first-menu">
                <button className="dropbtn">SORT</button>
                <div className="dropdown-content">
                    <Link to="/sort/shell" >Shell Sort</Link>
                    <Link to="/sort/bubble" >Bubble Sort</Link>
                    <Link to="/sort/merge" >Merge Sort</Link>
                    <Link to="/sort/quick" >Quick Sort</Link>
                    <Link to="/sort/heap" >Heap Sort</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">GRAPH</button>
                <div className="dropdown-content">
                    <Link to="/graph/dfs" >Depth First Search</Link>
                    <Link to="/graph/bfs" >Breadth First Search</Link>
                    <Link to="/graph/dijkstra" >Dijkstra Search</Link>
                    <Link to="/graph/astar" >A* Search</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">TREE</button>
                <div className="dropdown-content">
                    <Link to="/tree/bst" >Binary Search Tree</Link>
                    <Link to="/tree/heap" >Heap Tree</Link>
                </div>
            </div>
        </div>
    )
}

export default Menu;