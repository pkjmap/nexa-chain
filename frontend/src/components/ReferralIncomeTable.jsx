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

const ReferralIncomeTable = ({
    referralHistory = [],
    loading = false,
}) => {

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={5}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 3,
            }}
        >
            <Box p={2}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    Referral Income History
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
                                <strong>From User</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Email</strong>
                            </TableCell>

                            <TableCell align="center">
                                <strong>Level</strong>
                            </TableCell>

                            <TableCell align="right">
                                <strong>Income</strong>
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {referralHistory.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={5}
                                    align="center"
                                >
                                    No referral income found.
                                </TableCell>

                            </TableRow>

                        ) : (

                            referralHistory.map((item) => (

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
                                        {item.generatedBy?.fullName}
                                    </TableCell>

                                    <TableCell>
                                        {item.generatedBy?.email}
                                    </TableCell>

                                    <TableCell align="center">

                                        <Chip
                                            label={`Level ${item.referralLevel}`}
                                            color="primary"
                                            size="small"
                                        />

                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "success.main",
                                        }}
                                    >
                                        ₹
                                        {item.incomeAmount.toLocaleString()}
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

export default ReferralIncomeTable;