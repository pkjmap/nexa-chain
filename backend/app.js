require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const referralRoutes = require("./routes/referralRoutes");

// Error Middleware
const {
    notFound,
    errorHandler,
} = require("./middleware/errorMiddleware");

const app = express();

/* ----------------------------------
   Connect MongoDB
-----------------------------------*/
connectDB();

/* ----------------------------------
   Middlewares
-----------------------------------*/
app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

/* ----------------------------------
   Home Route
-----------------------------------*/
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Investment Platform API is running..."
    });
});

/* ----------------------------------
   API Routes
-----------------------------------*/
app.use("/api/auth", authRoutes);

app.use("/api/investments", investmentRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/referrals", referralRoutes);

/* ----------------------------------
   404 Middleware
-----------------------------------*/
app.use(notFound);

/* ----------------------------------
   Global Error Handler
-----------------------------------*/
app.use(errorHandler);

module.exports = app;
