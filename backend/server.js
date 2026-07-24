require("dotenv").config();
require("./jobs/dailyROIJob");
const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});