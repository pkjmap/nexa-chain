const cron = require("node-cron");
const { distributeDailyROI } = require("../services/roiService");

// Runs every day at 12:00 AM
cron.schedule("0 0 * * *", async () => {
    console.log("Running Daily ROI Job...");
    await distributeDailyROI();
});