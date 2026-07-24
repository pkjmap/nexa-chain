const errorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    let message = err.message || "Internal Server Error";

    // Mongoose Invalid ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource ID.";
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        statusCode = 400;

        const field = Object.keys(err.keyValue)[0];

        message = `${field} already exists.`;
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        statusCode = 400;

        message = Object.values(err.errors)
            .map((e) => e.message)
            .join(", ");
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV !== "production" && {
            stack: err.stack,
        }),
    });
};

const notFound = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports = {
    errorHandler,
    notFound,
};