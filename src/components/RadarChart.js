import Chart from 'chart.js';
import React, { useEffect, useRef, useState } from "react";

const data = {
    labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
    datasets: [{
        data: [20, 10, 4, 2]
    }]
};

const options = {
    scale: {
        angleLines: {
            display: false
        },
        ticks: {
            suggestedMin: 50,
            suggestedMax: 100
        }
    }
};

const RadarChart = () => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const radarChart = new Chart(chartContainer.current, {
                type: 'radar', 
                data: data,
                options: options
            });
            setChartInstance(radarChart);
        }
    }, [chartContainer]);

    return(
        <div>
            <canvas ref={chartContainer} />
        </div>
    );
};

export default RadarChart;


