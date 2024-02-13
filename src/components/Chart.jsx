import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { useSelector } from "react-redux";
const { CanvasJSChart } = CanvasJSReact;

const MyChartComponent = ({ tensorValues }) => {
    const selectedChannel = useSelector(state=>state.tf.chanel);
    
    let [dataPoints, setDataPoints] = useState([]);
    useEffect(() => {
        setDataPoints(
            tensorValues.map((row, index) => {
                let point = {
                    x: index,
                    y: row[selectedChannel],
                };
                return point;
            })
        );
    }, [tensorValues]);

    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Channel Values",
        },
        axisX: {
            title: "Width",
        },
        axisY: {
            title: "Channel Value",
        },
        data: [
            {
                type: "line",
                dataPoints: dataPoints,
            },
        ],
    };

    return <CanvasJSChart options={options} />;
};

export default MyChartComponent;
