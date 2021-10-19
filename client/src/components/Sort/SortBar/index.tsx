import React, { useEffect, useState } from "react";

import "./SortBar.css";

interface SortBarProps {
    number: Number,
    barWidth: Number;
    barHeight: Number;
    isSorting: Boolean; 
    isComparing: Boolean;
    isPivot:Boolean;
}

const SortBar: React.FC<SortBarProps> = ({ number, barWidth, barHeight, isSorting, isComparing, isPivot }) => {

    let sortBarStyle = 'sort-bar';

    if (isSorting) {
        sortBarStyle = 'sorting-bar';
    }

    if (isComparing) {
        sortBarStyle = 'comparing-bar';    
    }

    if (isPivot) {
        sortBarStyle = 'pivot-bar';   
    }

    return (
        <div className={`${sortBarStyle}`} style={{width: `${barWidth}px`, height: `${barHeight}px`}} >
            <div className="sort-bar-text">{number}</div>
        </div>
    )              
}

export default SortBar;