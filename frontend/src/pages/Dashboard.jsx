import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Container,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardCard from "../components/DashboardCard";
import InvestmentTable from "../components/InvestmentTable";
import ROIHistoryTable from "../components/ROIHistoryTable";
import ReferralIncomeTable from "../components/ReferralIncomeTable";
import ReferralTree from "../components/ReferralTree";
import EarningsChart from "../components/EarningsChart";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import api from "../api/axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({});
    const [investments, setInvestments] = useState([]);
    const [roiHistory, setROIHistory] = useState([]);
    const [referralHistory, setReferralHistory] = useState([]);
    const [referralTree, setReferralTree] = useState([]);
    const [chartData, setChartData] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const loadDashboard = async () => {
        try {
            setLoading(true);

            const [
                dashboardRes,
                investmentRes,
                roiRes,
                referralRes,
                treeRes,
                chartRes,
            ] = await Promise.all([
                api.get("/dashboard"),
                api.get("/investments"),
                api.get("/roi"),
                api.get("/referral-income"),
                api.get("/referrals/tree"),
                api.get("/dashboard/chart"),
            ]);

            setDashboard(dashboardRes.data.dashboard);

            setInvestments(
                investmentRes.data.investments || []
            );

            setROIHistory(
                roiRes.data.history || []
            );

            setReferralHistory(
                referralRes.data.history || []
            );

            setReferralTree(
                treeRes.data.tree || []
            );

            setChartData(
                chartRes.data.chart || []
            );

        } catch (error) {
            console.error(error);

            if (error.response?.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <Navbar
                user={user}
                onMenuClick={() =>
                    setMobileOpen(true)
                }
                onLogout={logout}
            />

            <Sidebar
                mobileOpen={mobileOpen}
                onClose={() =>
                    setMobileOpen(false)
                }
                currentPath={location.pathname}
                onNavigate={navigate}
                onLogout={logout}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: {
                        md: "250px",
                    },
                    mt: "64px",
                    width: "100%",
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{ py: 4 }}
                >
                    <Grid container spacing={3}>

                        {/* Dashboard Cards */}

                        <Grid item xs={12} sm={6} md={3}>
                            <DashboardCard
                                title="Total Investments"
                                value={`₹${(
                                    dashboard.totalInvestments || 0
                                ).toLocaleString()}`}
                                loading={loading}
                                icon={<SavingsIcon />}
                                color="#1976d2"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <DashboardCard
                                title="Daily ROI"
                                value={`₹${(
                                    dashboard.totalROIEarned || 0
                                ).toLocaleString()}`}
                                loading={loading}
                                icon={<TrendingUpIcon />}
                                color="#2e7d32"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <DashboardCard
                                title="Level Income"
                                value={`₹${(
                                    dashboard.totalLevelIncomeEarned || 0
                                ).toLocaleString()}`}
                                loading={loading}
                                icon={<GroupIcon />}
                                color="#ed6c02"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <DashboardCard
                                title="Wallet Balance"
                                value={`₹${(
                                    dashboard.walletBalance || 0
                                ).toLocaleString()}`}
                                loading={loading}
                                icon={
                                    <AccountBalanceWalletIcon />
                                }
                                color="#9c27b0"
                            />
                        </Grid>

                        {/* Chart */}

                        <Grid item xs={12}>
                            <EarningsChart
                                data={chartData}
                                loading={loading}
                            />
                        </Grid>

                        {/* Investment Table */}

                        <Grid item xs={12}>
                            <InvestmentTable
                                investments={
                                    investments
                                }
                                loading={loading}
                            />
                        </Grid>

                        {/* ROI Table */}

                        <Grid item xs={12}>
                            <ROIHistoryTable
                                roiHistory={
                                    roiHistory
                                }
                                loading={loading}
                            />
                        </Grid>

                        {/* Referral Income */}

                        <Grid item xs={12}>
                            <ReferralIncomeTable
                                referralHistory={
                                    referralHistory
                                }
                                loading={loading}
                            />
                        </Grid>

                        {/* Referral Tree */}

                        <Grid item xs={12}>
                            <ReferralTree
                                tree={referralTree}
                                loading={loading}
                            />
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Dashboard;