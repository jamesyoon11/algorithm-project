import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./GraphLegend.css";

interface GraphLegendProps {
  graphLegendHeight: Number;
}

const GraphLegend: React.FC<GraphLegendProps> = ({graphLegendHeight}) => {

    let fontSize = graphLegendHeight;

    return (
        <div className="graph-legend" style={{height: `${graphLegendHeight}px`, fontSize: `${fontSize}px`}} >
            <span className="node start-node" />
            <span className="legend-label">
                Start
            </span>

            <span className="node end-node" />
            <span className="legend-label">
                End
            </span>

            <span className="node visited-node" />
            <span className="legend-label">
                Visited
            </span>

            <span className="node path-node" />
            <span className="legend-label">
                Path
            </span>

            <span className="node wall-node" />
            <span className="legend-label">
                Wall
            </span>
        </div>
    )
}

export default GraphLegend;