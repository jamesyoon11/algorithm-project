import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import {SortDispatch, SortState} from "../../../contexts/algorithm-context";
import "./SortToolbar.css";

interface SortToolbarProps {
  toolbarHeight: Number;
}

const SortToolbar: React.FC<SortToolbarProps> = ({toolbarHeight}) => {

    let fontSize = toolbarHeight / 3;

    const dispatch = SortDispatch();

    const sortState = SortState();

    const { sortAlgorithm } = useParams();    

    const [isDisabled, setIsDisabled] = useState(false);
    const [sortTitle, setSortTitle] = useState('');
  
    useEffect(() => {
        if (sortAlgorithm === 'bubble') {
            setSortTitle('Bubble Sort');
        } if (sortAlgorithm === 'shell') {
            setSortTitle('Shell Sort');
        } else if (sortAlgorithm === 'merge') {
            setSortTitle('Merge Sort');
        } else if (sortAlgorithm === 'quick') {
            setSortTitle('Quick Sort');
        } else if (sortAlgorithm === 'heap') {
            setSortTitle('Heap Sort');
        }
        generateSortData();
    }, [sortAlgorithm]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (sortState.algorithmRunningState === 'end') {
            setIsDisabled(false);
        }
    }, [sortState.algorithmRunningState]); // eslint-disable-line react-hooks/exhaustive-deps

    const generateSortData = (size) => {
        let tempArr = [];

        let sortDataSize = size || sortState.sortDataSize;

        while (tempArr.length < sortDataSize) {
            tempArr.push(Math.floor(Math.random() * 220) + 30);
        }

        dispatch({ type: "updateSortScreen", sortData: tempArr, sortDataSize: sortDataSize });
    };

    const handleClick = async  (algorithm) => {
        sortState.algorithmRunningState = 'running';
        dispatch({ type: "startSortAlgorithm", algorithm: sortAlgorithm, dispatch: dispatch });
        setIsDisabled(true);
    };

    const updateSortDataSize = (e) => {
        let size = Number(e.target.value);
        generateSortData(size);
    }

    const updateSpeedLevel = (e) => {
        let speedLevel = e.target.value;
        dispatch({ type: "updateSortScreen", speedLevel: speedLevel });
    }

    return (
        <div className={(isDisabled) ? 'sort-toolbar disabled' : ' sort-toolbar'} style={{height: `${toolbarHeight}px`, fontSize: `${fontSize}px`}} disabled={isDisabled}>
            <span className="sort-title">{sortTitle}</span>
            <button className="sort-toolbar-button" disabled={isDisabled} 
                    onClick={()=> { handleClick() }}>Start</button>
            <button className="sort-toolbar-button" disabled={isDisabled}
                    onClick={()=> { generateSortData() }}>Shuffle</button>
            <div className="sort-toolbar-select">
                <label>Data Size: </label>
                <form className="sort-toolbar-form">
                    <select className="sort-config-selector data-select" disabled={isDisabled}
                            onChange={updateSortDataSize} value={sortState.sortDataSize} >
                    {   Array(77).fill(null).map(function (x, index) {
                            const size = index + 4;
                            return (
                                <option key={index} value={size}>{size}</option>
                            )
                        })
                    }
                    </select>
                </form>
            </div>
            <div className="sort-toolbar-select">
                <label>Speed: </label>
                <form className="sort-toolbar-form">
                    <select className="sort-config-selector speed-select" disabled={isDisabled} 
                            onChange={updateSpeedLevel} value={sortState.speedLevel}>
                    {   ['Very Fast', 'Fast', 'Medium Fast', 'Medium', 'Medium Slow', 'Slow', 'Very Slow'].map(function (speed, index) {
                            return (
                                <option key={index} value={speed}>{speed}</option>
                            )
                        })
                    }
                    </select>
                </form>
            </div>
        </div> 
    )
}

export default SortToolbar;