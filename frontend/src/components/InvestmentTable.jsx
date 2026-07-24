import React from "react";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    CircularProgress,
    Box,
} from "@mui/material";

const getStatusColor = (status) => {
    switch (status) {
        case "Active":
            return "success";

        case "Completed":
            return "primary";

        case "Cancelled":
            return "error";

        default:
            return "default";
    }
};

const InvestmentTable = ({
    investments = [],
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
                    Investment History
                </Typography>
            </Box>

            <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader>

                    <TableHead>
                        <TableRow>

                            <TableCell>
                                <strong>Plan</strong>
                            </TableCell>

                            <TableCell align="right">
                                <strong>Amount</strong>
                            </TableCell>

                            <TableCell align="right">
                                <strong>ROI %</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Status</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Start Date</strong>
                            </TableCell>

                            <TableCell>
                                <strong>End Date</strong>
                            </TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {investments.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={6}
                                    align="center"
                                >
                                    No Investments Found
                                </TableCell>

                            </TableRow>

                        ) : (

                            investments.map((investment) => (

                                <TableRow
                                    hover
                                    key={investment._id}
                                >

                                    <TableCell>
                                        {
                                            investment.planDetails
                                                ?.planName
                                        }
                                    </TableCell>

                                    <TableCell align="right">
                                        ₹
                                        {investment.investmentAmount.toLocaleString()}
                                    </TableCell>

                                    <TableCell align="right">
                                        {
                                            investment.planDetails
                                                ?.dailyROIPercentage
                                        }
                                        %
                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={
                                                investment.investmentStatus
                                            }
                                            color={getStatusColor(
                                                investment.investmentStatus
                                            )}
                                            size="small"
                                        />

                                    </TableCell>

                                    <TableCell>
                                        {new Date(
                                            investment.startDate
                                        ).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(
                                            investment.endDate
                                        ).toLocaleDateString()}
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

export default InvestmentTable;