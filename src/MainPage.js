import GridLayout from "react-grid-layout";
import React, {useRef, useEffect, useState} from "react";
import Video_Lidar from "./video/2D_Lidar_Video.mp4";
import Video_Camera from "./video/Thermal_Camera_Video.mp4";

function MainPage() {
    const videoRef = useRef();
    const [gridLayout, setGridLayout] = useState( [
        { i: "a", x: 0, y: 0, w: 1, h: 1,},
        { i: "b", x: 1, y: 0, w: 1, h: 1 },
        { i: "c", x: 0, y: 1, w: 1, h: 1 },
        { i: "d", x: 1, y: 1, w: 1, h: 1 },
    ]);

    useEffect(()=>{
        setVideoSize();
    }, [gridLayout]);
    const setPlayBackRate = () => {
        videoRef.current.playbackRate = 0.5;
    };

    const setVideoSize = () => {
        const videoElement = videoRef.current;
        if(videoElement) {
            const gridItem = gridLayout.find((item) => item.i === "a");
            const gridWidth = gridItem.w;
            const gridHeight = gridItem.h;
            const videoWidth = gridWidth * 800;
            const videoHeight = gridHeight * 350;

            videoElement.width = videoWidth;
            videoElement.height = videoHeight;
        }
    }

    return (
        <div id="container">
            <GridLayout
                className="layout"
                layout={gridLayout}
                cols={2}  // 2 columns for 2x2 grid
                rowHeight={350}
                width={1700} // Adjusted width for the 2x2 grid
                onLayoutChange={(layout) => setGridLayout(layout)}
            >
                <div key="a">
                    <video
                        width="100%"
                        height="100%"
                        muted
                        autoPlay
                        loop
                        ref={videoRef}
                        onCanPlay={()=>setPlayBackRate()}
                    >
                        <source src={Video_Lidar} type="video/mp4"/>
                    </video>
                </div>
                <div key="b">
                    <video
                        width="100%"
                        height="100%"
                        muted
                        autoPlay
                        loop
                        ref={videoRef}
                        onCanPlay={()=>setPlayBackRate()}
                    >
                        <source src={Video_Camera} type="video/mp4"/>
                    </video>
                </div>
                <div key="c">c</div>
                <div key="d">d</div>
            </GridLayout>
        </div>
    );
}
export default MainPage;