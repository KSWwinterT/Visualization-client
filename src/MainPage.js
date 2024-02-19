import "./MainPage.css";
import GridLayout from "react-grid-layout";
import React, { useRef, useEffect, useState } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea, Doughnut } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data1 = {
    labels: ['Safe', 'Confusion', 'Median for risk', 'Fatal'],
    datasets: [
        {
            label: 'MAX capacity',
            data: [2, 4, 5, 7,],
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 99, 132, 0.5)',
            ],
            borderWidth: 1,
        },
    ],
};

export const data2 = {
    datasets: [
        {
            data: [2, 4, 5, 7,],
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(240, 240, 240, 1.0)',
                'rgba(240, 240, 240, 1.0)',
                'rgba(240, 240, 240, 1.0)',
            ],
            borderWidth: 1,
            borderColor: ['rgba(0,0,0,0)'],
        },
    ],
};

export const data3 = {
    datasets: [
        {
            data: [2, 4, 5, 7,],
            backgroundColor: [
                'rgba(240, 240, 240, 1.0)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(240, 240, 240, 1.0)',
                'rgba(240, 240, 240, 1.0)',
            ],
            borderWidth: 1,
            borderColor: ['rgba(0,0,0,0)'],
        },
    ],
};

export const data4 = {
    datasets: [
        {
            text: 'Fatal',
            data: [2, 4, 5, 7],
            backgroundColor: [
                'rgba(240, 240, 240, 1.0)',
                'rgba(240, 240, 240, 1.0)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(240, 240, 240, 1.0)',
            ],
            borderWidth: 1,
            borderColor: ['rgba(0,0,0,0)'],
        },
    ],
};

export const data5 = {
    datasets: [
        {
            text: 'Fatal',
            data: [2, 4, 5, 7],
            backgroundColor: [
                'rgba(240, 240, 240, 1.0)',
                'rgba(240, 240, 240, 1.0)',
                'rgba(240, 240, 240, 1.0)',
                'rgba(255, 99, 132, 0.5)',
            ],
            borderWidth: 1,
            borderColor: ['rgba(0,0,0,0)'],
        },
    ],
};

function MainPage() {
    const videoRef = useRef();
    const [gridLayout, setGridLayout] = useState([
        { i: "camera", x: 0, y: 0, w: 1, h: 1 },
        { i: "detection-result", x: 1, y: 0, w: 1, h: 1 },
        { i: "max-capacity", x: 0, y: 1, w: 1, h: 1 },
        { i: "risk-level", x: 1, y: 1, w: 1, h: 1 },
    ]);

    const [detectionResult, setDetectionResult] = useState(0);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        setVideoSize();
    }, [gridLayout]);

    const setVideoSize = () => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const gridItem = gridLayout.find((item) => item.i === "camera");
            const gridWidth = gridItem.w;
            const gridHeight = gridItem.h;
            const videoWidth = gridWidth * 830;
            const videoHeight = gridHeight * 350;

            videoElement.width = videoWidth;
            videoElement.height = videoHeight;
        }
    };

    const determineRiskChartData = () => {
        const parsedResult = parseInt(inputValue, 10);

        // if(isNaN(parsedResult)) {
        //     return data2;
        // }
        if(detectionResult <= 2) {
            return data2;
        } else if(detectionResult <= 4) {
            return data3;
        } else if(detectionResult == 5) {
            return data4;
        } else {
            return data5;
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = () => {
        setDetectionResult(parseInt(inputValue, 10));
    }

    return (
        <div id="container">
            <GridLayout
                className="layout"
                layout={gridLayout}
                cols={2}
                rowHeight={350}
                width={1700}
                onLayoutChange={(layout) => setGridLayout(layout)}
            >
                <div key="camera">
                    <img
                        style={{ objectFit: "cover" }}
                        src="http://localhost:5000/video_feed"
                        alt = "Video"
                        ref={videoRef}
                    />
                </div>
                <div key="detection-result">
                    Detection: {detectionResult}
                    <input type="text" value={inputValue} onChange={handleInputChange} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                <div key="max-capacity">
                    <h2 className="chart_title">People Capacity per 1 square meter of space</h2>
                    <PolarArea className="chart" data={data1}/>
                </div>
                <div key="risk-level">
                    <h2 className="chart_title">Risk Analysis</h2>
                    <div className="doughnut-chart">
                        <Doughnut className="doughnut" data={determineRiskChartData()}/>
                    </div>
                </div>
            </GridLayout>
        </div>
    )
}

export default MainPage;