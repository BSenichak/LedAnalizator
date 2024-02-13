import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const { CanvasJSChart } = CanvasJSReact;

const MyChartComponent = ({ tensorValues }) => {
    const selectedChannel = useSelector(state=>state.tf.chanel);
    const theme = useSelector(state=>state.general.theme);
    console.log(theme)
    const {t} = useTranslation()
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
        theme: theme == "light" ? "light2": "dark1",
        title: {
            text: t("chart.title"),
        },
        axisX: {
            title: t("chart.width"),
        },
        axisY: {
            title: t("chart.intencity"),
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
