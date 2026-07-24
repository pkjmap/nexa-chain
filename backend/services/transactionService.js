const Transaction = require("../models/Transaction");

/**
 * Create Wallet Transaction
 *
 * @param {Object} data
 * @returns Transaction
 */

const createTransaction = async ({
    user,
    type,
    amount,
    description = "",
    referenceId = null,
    status = "Completed",
    session = null,
}) => {

    const transaction = await Transaction.create(
        [
            {
                user,
                type,
                amount,
                description,
                referenceId,
                status,
            },
        ],
        session ? { session } : {}
    );

    return transaction[0];
};

/**
 * Get User Transactions
 */

const getUserTransactions = async (userId) => {

    return await Transaction.find({
        user: userId,
    })
        .sort({
            createdAt: -1,
        })
        .lean();
};

/**
 * Get Transactions by Type
 */

const getTransactionsByType = async (
    userId,
    type
) => {

    return await Transaction.find({
        user: userId,
        type,
    })
        .sort({
            createdAt: -1,
        })
        .lean();
};

module.exports = {

    createTransaction,

    getUserTransactions,

    getTransactionsByType,

};