import Chart from 'chart.js';
import React, { useEffect, useRef, useState } from "react";

// const data = {
//     labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
//     datasets: [{
//         data: [20, 10, 4, 2]
//     }]
// };

// const data2 = {
//     "labels": [
//         "GDP per capita",
//         "Social support",
//         "Healthy life expectancy",
//         "Freedom to make life choices",
//         "Generosity",
//         "Perceptions of corruption"
//     ],
//     "datasets": [
//         {
//             "label": "Finland",
//             "backgroundColor": "rgba(255, 99, 132, 0.2)",
//             "data": [
//                 "1.340",
//                 "1.587",
//                 "0.986",
//                 "0.596",
//                 "0.153",
//                 "0.393"
//             ]
//         },
//         {
//             "label": "Denmark",
//             "backgroundColor": "rgba(1.0, 0.4980392156862745, 0.054901960784313725)",
//             "data": [
//                 "1.383",
//                 "1.573",
//                 "0.996",
//                 "0.592",
//                 "0.252",
//                 "0.410"
//             ]
//         },
//         {
//             "label": "Norway",
//             "backgroundColor": "rgba(0.17254901960784313, 0.6274509803921569, 0.17254901960784313)",
//             "data": [
//                 "1.488",
//                 "1.582",
//                 "1.028",
//                 "0.603",
//                 "0.271",
//                 "0.341"
//             ]
//         }]
// }

const options = {
    scale: {
        angleLines: {
            display: false
        },
        ticks: {
            suggestedMin: 1,
            suggestedMax: 2
        }
    }
};

const RadarChart = () => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const getData = () => {
            fetch('happiness_2019.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                const limitedData = {
                    'labels': data.labels,
                    'datasets': data.datasets.slice(0,6).concat(data.datasets.slice(150,255))
                }
                console.log(limitedData)
                setChartData(limitedData);
                if (chartContainer && chartContainer.current) {
                    const radarChart = new Chart(chartContainer.current, {
                        type: 'radar', 
                        data: limitedData,
                        options: options
                    });
                    setChartInstance(radarChart);
                }
            });
        };
        getData();
        
    }, [chartContainer]);

    

    

    return(
        <div>
            <canvas ref={chartContainer} />
        </div>
    );
};

export default RadarChart;


