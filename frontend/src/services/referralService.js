import api from "../api/axios";

/**
 * Get Direct Referrals
 */
export const getDirectReferrals = async () => {
    const { data } = await api.get("/referrals/direct");
    return data;
};

/**
 * Get Complete Referral Tree
 */
export const getReferralTree = async () => {
    const { data } = await api.get("/referrals/tree");
    return data;
};

/**
 * Get Referral Income History
 */
export const getReferralIncomeHistory = async () => {
    const { data } = await api.get("/referral-income");
    return data;
};