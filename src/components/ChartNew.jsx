import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

const ChartNew = ({ tensorValues }) => {
    const { t } = useTranslation();
    const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        setDataPoints(
            tensorValues.map((row, index) => ({
                label: index,
                red: row[0],
                green: row[1],
                blue: row[2],
            }))
        );
    }, [tensorValues]);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    return (
        <Line
            data={{
                labels: dataPoints.map((data) => data.label),
                datasets: [
                    {
                        label: "red",
                        data: dataPoints.map((data) => data.red),
                        borderColor: "rgb(255, 0, 0)",
                        backgroundColor: "rgb(255, 0, 0)",
                    },
                    {
                        label: "green",
                        data: dataPoints.map((data) => data.green),
                        borderColor: "rgb(0, 255, 0)",
                        backgroundColor: "rgb(0, 255, 0)",
                    },
                    {
                        label: "blue",
                        data: dataPoints.map((data) => data.blue),
                        borderColor: "rgb(0, 0, 255)",
                        backgroundColor: "rgb(0, 0, 255)",
                    },
                ],
            }}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                    title: {
                        display: true,
                        text: t("chart.title"),
                    },
                },
            }}
        />
    );
};

export default ChartNew;
