import React from "react";
import {
    Box,
    CircularProgress,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const getStatusColor = (status) => {
    switch (status) {
        case "Paid":
            return "success";
        case "Pending":
            return "warning";
        case "Cancelled":
            return "error";
        default:
            return "default";
    }
};

const ROIHistoryTable = ({
    roiHistory = [],
    loading = false,
}) => {
    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                py={5}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{ borderRadius: 3 }}>
            <Box p={2}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    ROI History
                </Typography>
            </Box>

            <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Date</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Plan</strong>
                            </TableCell>

                            <TableCell align="right">
                                <strong>Investment</strong>
                            </TableCell>

                            <TableCell align="right">
                                <strong>ROI Amount</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Status</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {roiHistory.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    align="center"
                                >
                                    No ROI history found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            roiHistory.map((item) => (
                                <TableRow
                                    hover
                                    key={item._id}
                                >
                                    <TableCell>
                                        {new Date(
                                            item.date
                                        ).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell>
                                        {
                                            item.investment
                                                ?.planDetails
                                                ?.planName
                                        }
                                    </TableCell>

                                    <TableCell align="right">
                                        ₹
                                        {item.investment?.investmentAmount?.toLocaleString() ||
                                            0}
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "success.main",
                                        }}
                                    >
                                        ₹
                                        {item.roiAmount.toLocaleString()}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={item.status}
                                            color={getStatusColor(
                                                item.status
                                            )}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ROIHistoryTable;