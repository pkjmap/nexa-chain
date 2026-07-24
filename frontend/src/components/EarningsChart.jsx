import React from "react";
import Chart from "react-apexcharts";
import {
    Paper,
    Typography,
    CircularProgress,
    Box,
} from "@mui/material";

const EarningsChart = ({
    data = [],
    loading = false,
}) => {

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                py={5}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!data.length) {
        return (
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 3,
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Earnings Overview
                </Typography>

                <Typography
                    mt={3}
                    color="text.secondary"
                    align="center"
                >
                    No earnings data available.
                </Typography>
            </Paper>
        );
    }

    const categories = data.map((item) => item.date);

    const roiSeries = data.map((item) => item.roi);

    const referralSeries = data.map(
        (item) => item.referralIncome
    );

    const totalSeries = data.map(
        (item) => item.total
    );

    const chartOptions = {
        chart: {
            id: "earnings-chart",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },

        xaxis: {
            categories,
        },

        stroke: {
            curve: "smooth",
            width: 3,
        },

        dataLabels: {
            enabled: false,
        },

        legend: {
            position: "top",
        },

        tooltip: {
            y: {
                formatter: (value) => `₹${value}`,
            },
        },

        yaxis: {
            labels: {
                formatter: (value) => `₹${value}`,
            },
        },
    };

    const series = [
        {
            name: "Daily ROI",
            data: roiSeries,
        },
        {
            name: "Referral Income",
            data: referralSeries,
        },
        {
            name: "Total Earnings",
            data: totalSeries,
        },
    ];

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
            >
                Earnings Overview
            </Typography>

            <Chart
                options={chartOptions}
                series={series}
                type="line"
                height={350}
            />
        </Paper>
    );
};

export default EarningsChart;