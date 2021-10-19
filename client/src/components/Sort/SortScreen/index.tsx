import React, { useEffect, useState } from "react";

import {SortDispatch, SortState} from "../../../contexts/algorithm-context";
import SortBar from "../SortBar";
import "./SortScreen.css";

interface SortScreenProps {
  screenHeight: Number;
  screenWidth: Number;
  marginLeft: Number;
}

const SortScreen: React.FC<SortScreenProps> = ({ screenHeight, screenWidth, marginLeft }) => {

    const dispatch = SortDispatch();

    const sortState = SortState();

    const sortDataSize = (sortState.sortData && sortState.sortData.length) || 1;

    const maxNumber = sortDataSize > 1 ? Math.max(...sortState.sortData) : 1;

    const heightPerUnit = screenHeight / maxNumber;

    const barWidth = screenWidth / sortDataSize;

    const fontSize = sortDataSize < 50 ? Math.min(barWidth, 24) : Math.floor(barWidth);  // a sort bar text's font size

    const sortAnimation = sortState.sortAnimation;
    
    return (
      <div className="sort-screen" style={{width: `${screenWidth}px`, height: `${screenHeight}px`, marginLeft: `${marginLeft}px`, fontSize: `${fontSize}px`}} >
        {   sortState.sortData && sortState.sortData.length ? sortState.sortData.map((number, index) => {

                const barHeight = heightPerUnit * number;
                const isSorting = sortAnimation.currentIndex === index;
                const isComparing = sortAnimation.compareIndex === index;
                const isPivot = sortAnimation.pivotIndex === index;

                return (
                      <SortBar key={index} number={number} isSorting={isSorting} isComparing={isComparing}
                               barWidth={barWidth} barHeight={barHeight} isPivot={isPivot} >
                      </SortBar>
                )
            }) : null
        }
      </div>
    )
}

export default SortScreen;