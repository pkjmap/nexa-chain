const ROIHistory = require("../models/ROIHistory");

/**
 * @desc    Get ROI History
 * @route   GET /api/roi
 * @access  Private
 */
const getROIHistory = async (req, res) => {
    try {
        const history = await ROIHistory.find({
            user: req.user._id,
        })
            .populate({
                path: "investment",
                select: "investmentAmount planDetails startDate endDate",
            })
            .sort({ date: -1 })
            .lean();

        res.status(200).json({
            success: true,
            count: history.length,
            history,
        });
    } catch (error) {
        console.error("ROI History Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch ROI history.",
        });
    }
};

/**
 * @desc    Get Today's ROI
 * @route   GET /api/roi/today
 * @access  Private
 */
const getTodayROI = async (req, res) => {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const todayROI = await ROIHistory.aggregate([
            {
                $match: {
                    user: req.user._id,
                    date: {
                        $gte: start,
                        $lte: end,
                    },
                    status: "Credited",
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$roiAmount",
                    },
                },
            },
        ]);

        res.json({
            success: true,
            todayROI: todayROI[0]?.total || 0,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch today's ROI.",
        });
    }
};

/**
 * @desc    ROI Chart (Last 30 Days)
 * @route   GET /api/roi/chart
 * @access  Private
 */
const getROIChart = async (req, res) => {
    try {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 30);

        const chart = await ROIHistory.aggregate([
            {
                $match: {
                    user: req.user._id,
                    date: {
                        $gte: fromDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$date",
                        },
                    },
                    roi: {
                        $sum: "$roiAmount",
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);

        res.json({
            success: true,
            chart,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to load ROI chart.",
        });
    }
};

module.exports = {
    getROIHistory,
    getTodayROI,
    getROIChart,
};