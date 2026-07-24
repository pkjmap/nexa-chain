import api from "../api/axios";

/**
 * Get all investments of logged-in user
 */
export const getInvestments = async () => {
    const { data } = await api.get("/investments");
    return data;
};

/**
 * Get investment by ID
 */
export const getInvestmentById = async (id) => {
    const { data } = await api.get(`/investments/${id}`);
    return data;
};

/**
 * Create a new investment
 */
export const createInvestment = async (investmentData) => {
    const { data } = await api.post(
        "/investments",
        investmentData
    );

    return data;
};

/**
 * Update an investment
 */
export const updateInvestment = async (
    id,
    investmentData
) => {
    const { data } = await api.put(
        `/investments/${id}`,
        investmentData
    );

    return data;
};

/**
 * Cancel an investment
 */
export const cancelInvestment = async (id) => {
    const { data } = await api.patch(
        `/investments/${id}/cancel`
    );

    return data;
};

/**
 * Delete an investment
 */
export const deleteInvestment = async (id) => {
    const { data } = await api.delete(
        `/investments/${id}`
    );

    return data;
};