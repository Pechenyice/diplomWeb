import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import PropTypes from 'prop-types';

const Graph = React.memo(({ style, type, data, options, testMode=false }) => {
    const graphRef = useRef(null);

    useEffect(() => {
        let chart = null;
        if (graphRef.current && !testMode) {
            chart = new Chart(graphRef.current.getContext("2d"), {
                type,
                data,
                options,
            });
        }

        return () => !testMode && chart.destroy();
    }, [graphRef.current, type, data, options]);

    return (
        <div>
            <canvas ref={graphRef} style={style} />
        </div>
    );
}, (prevProps, nextProps) => true);

Graph.propTypes = {
    style: PropTypes.object, 
    type: PropTypes.string, 
    data: PropTypes.object, 
    options: PropTypes.object,
    testMode: PropTypes.bool
}

export default Graph;