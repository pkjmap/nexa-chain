import api from "../api/axios";

/**
 * Dashboard Summary
 */
export const getDashboard = async () => {
    const { data } = await api.get("/dashboard");
    return data;
};

/**
 * Dashboard Chart Data
 */
export const getDashboardChart = async () => {
    const { data } = await api.get("/dashboard/chart");
    return data;
};

/**
 * Load Complete Dashboard Data
 */
export const getDashboardData = async () => {
    const [
        dashboard,
        chart,
        investments,
        roiHistory,
        referralIncome,
        referralTree,
    ] = await Promise.all([
        api.get("/dashboard"),
        api.get("/dashboard/chart"),
        api.get("/investments"),
        api.get("/roi"),
        api.get("/referral-income"),
        api.get("/referrals/tree"),
    ]);

    return {
        dashboard: dashboard.data.dashboard,
        chart: chart.data.chart || [],
        investments: investments.data.investments || [],
        roiHistory: roiHistory.data.history || [],
        referralIncome: referralIncome.data.history || [],
        referralTree: referralTree.data.tree || [],
    };
};