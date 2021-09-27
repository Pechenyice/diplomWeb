import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import PropTypes from 'prop-types';

const Graph = ({ style, type, data, options }) => {
    const graphRef = useRef(null);

    useEffect(() => {
        let chart = null;
        if (graphRef.current) {
            chart = new Chart(graphRef.current.getContext("2d"), {
                type,
                data,
                options,
            });
        }

        return () => chart.destroy();
    }, [graphRef.current, type, data, options]);

    return (
        <div>
            <canvas ref={graphRef} style={style} />
        </div>
    );
}

Graph.propTypes = {
    style: PropTypes.object, 
    type: PropTypes.string, 
    data: PropTypes.object, 
    options: PropTypes.object
}

export default Graph;