import "./MainPage.css";
import GridLayout from "react-grid-layout";
import React, { useRef, useEffect, useState } from "react";
import Video_Lidar from "./video/2D_Lidar_Video.mp4";
import Video_Camera from "./video/Thermal_Camera_Video.mp4";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
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

function MainPage() {
    const videoRef1 = useRef();
    const videoRef2 = useRef();
    const [gridLayout, setGridLayout] = useState([
        { i: "lidar", x: 0, y: 0, w: 1, h: 1 },
        { i: "camera", x: 1, y: 0, w: 1, h: 1 },
        { i: "max-capacity", x: 0, y: 1, w: 1, h: 1 },
        { i: "risk-level", x: 1, y: 1, w: 1, h: 1 },
    ]);

    useEffect(() => {
        setVideoSize();
    }, [gridLayout]);

    const setPlayBackRate = () => {
        videoRef1.current.playbackRate = 0.5;
        videoRef2.current.playbackRate = 0.5;
    };

    const setVideoSize = () => {
        const videoElement1 = videoRef1.current;
        const videoElement2 = videoRef2.current;
        if (videoElement1) {
            const gridItem1 = gridLayout.find((item) => item.i === "lidar");
            const gridItem2 = gridLayout.find((item) => item.i === "camera");
            const gridWidth1 = gridItem1.w;
            const gridWidth2 = gridItem2.w;
            const gridHeight1 = gridItem1.h;
            const gridHeight2 = gridItem2.h;
            const videoWidth1 = gridWidth1 * 840;
            const videoWidth2 = gridWidth2 * 840;
            const videoHeight1 = gridHeight1 * 360;
            const videoHeight2 = gridHeight2 * 360;

            videoElement1.width = videoWidth1;
            videoElement1.height = videoHeight1;
            videoElement2.width = videoWidth2;
            videoElement2.height = videoHeight2;
        }
    };

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
                    {/*<video*/}
                    {/*    style={{ objectFit: "cover" }}*/}
                    {/*    muted*/}
                    {/*    autoPlay*/}
                    {/*    loop*/}
                    {/*    ref={videoRef2}*/}
                    {/*    onCanPlay={() => setPlayBackRate()}*/}
                    {/*>*/}
                    {/*    <source src={Video_Camera} type="video/mp4" />*/}
                    {/*</video>*/}
                    <img
                        style={{ objectFit: "cover" }}
                        src="http://localhost:5000/video_feed"
                        alt = "Video"
                        ref={videoRef2}
                    />
                </div>
                <div key="max-capacity">
                    <h2 className="chart_title">People Capacity per 1 square meter of space</h2>
                    <PolarArea className="chart" data={data}/>
                </div>
                <div key="risk-level">
                    <h2 className="chart_title">Risk Analysis</h2>

                </div>
            </GridLayout>
        </div>
    )
}

export default MainPage;