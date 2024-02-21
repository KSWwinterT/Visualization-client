import "./MainPage.css";
import GridLayout from "react-grid-layout";
import React, { useRef, useEffect, useState } from "react";
import Video_Lidar from "./video/Lidar.mp4";
import Video_Camera from "./video/Thermal_camera.mp4";
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
    const videoRef1 = useRef();
    const videoRef2 = useRef();
    const [gridLayout, setGridLayout] = useState([
        { i: "lidar", x: 0, y: 0, w: 1, h: 1 },
        { i: "camera", x: 1, y: 0, w: 1, h: 1 },
        { i: "max-capacity", x: 0, y: 1, w: 1, h: 1 },
        { i: "risk-level", x: 1, y: 1, w: 1, h: 1 },
    ]);

    // const [detectionResult, setDetectionResult] = useState(0);
    // const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        setVideoSize();
    }, [gridLayout]);
    const setPlayBackRate = () => {
        videoRef1.current.playbackRate = 0.5;
    };

    const setVideoSize = () => {
        const videoElement1 = videoRef1.current;
        const videoElement2 = videoRef2.current;

        if (videoElement1 && videoElement2) {
            const gridItem1 = gridLayout.find((item) => item.i === "lidar");
            const gridItem2 = gridLayout.find((item) => item.i === "camera");
            const gridWidth1 = gridItem1.w;
            const gridWidth2 = gridItem2.w;
            const gridHeight1 = gridItem1.h;
            const gridHeight2 = gridItem2.h;
            const videoWidth1 = gridWidth1 * 840;
            const videoWidth2 = gridWidth2 * 840;
            const videoHeight1 = gridHeight1 * 380;
            const videoHeight2 = gridHeight2 * 380;

            videoElement1.width = videoWidth1;
            videoElement2.width = videoWidth2;
            videoElement1.height = videoHeight1;
            videoElement2.height = videoHeight2;
        }
    };
    const [chartData, setChartData] = useState(data3);
    const getRandomChartData = () => {
        const randomIndex = Math.floor(Math.random() * 3) + 3; // 랜덤한 인덱스 생성
        switch (randomIndex) {
            case 2:
                return data3;
            case 3:
                return data4;
            case 4:
                return data5;
            default:
                return data3;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 엔터 동작 방지
            const randomChartData = getRandomChartData();
            setChartData(randomChartData); // 랜덤한 차트 데이터로 업데이트
        }
    };

    // const determineRiskChartData = () => {
    //     if(detectionResult <= 2) {
    //         return data2;
    //     } else if(detectionResult <= 4) {
    //         return data3;
    //     } else if(detectionResult == 5) {
    //         return data4;
    //     } else {
    //         return data5;
    //     }
    // }
    //
    // const handleInputChange = (e) => {
    //     setInputValue(e.target.value);
    // }
    //
    // const handleSubmit = () => {
    //     const parsedInputValue = parseInt(inputValue, 10);
    //     setDetectionResult(parsedInputValue);
    // };
    //
    // const handleKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //         handleSubmit();
    //     }
    // };

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
                <div key="lidar">
                    <video
                        style={{ objectFit: "cover" }}
                        muted
                        autoPlay
                        loop
                        ref={videoRef1}
                        onCanPlay={() => setPlayBackRate()}
                    >
                        <source src={Video_Lidar} type="video/mp4" />
                    </video>
                </div>
                <div key="camera">
                    <video
                        style={{ objectFit: "cover" }}
                        muted
                        autoPlay
                        loop
                        ref={videoRef2}
                        onCanPlay={() => setPlayBackRate()}
                    >
                        <source src={Video_Camera} type="video/mp4" />
                    </video>
                </div>
                <div key="max-capacity">
                    <br/>
                    <h2 className="chart_title">People Capacity per 1 square meter of space</h2>
                    <PolarArea className="chart" data={data1}/>
                </div>
                <div key="risk-level">
                    {/*<div className="detection-result">*/}
                    {/*    Detection: {detectionResult}*/}
                    {/*</div>*/}
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    value={inputValue}*/}
                    {/*    onChange={handleInputChange}*/}
                    {/*    onKeyPress={handleKeyPress} // 엔터 키 이벤트 핸들러 추가*/}
                    {/*/>*/}
                    <br/><br/>
                    <h2
                        className="chart_title"
                        onKeyPress={handleKeyPress} // 엔터 키 이벤트 핸들러 추가
                        role="button"
                        tabIndex={0}
                    >
                        Risk Analysis
                    </h2>
                    <div className="doughnut-chart">
                        <Doughnut className="doughnut" data={chartData} />
                    </div>
                </div>
            </GridLayout>
        </div>
    )
}

export default MainPage;