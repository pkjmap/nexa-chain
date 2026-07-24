import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";

const DashboardCard = ({
    title,
    value,
    icon,
    color = "#1976d2",
    loading = false,
}) => {
    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                height: "100%",
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 8,
                },
            }}
        >
            <CardContent>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            {title}
                        </Typography>

                        {loading ? (
                            <CircularProgress size={28} />
                        ) : (
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                            >
                                {value}
                            </Typography>
                        )}
                    </Box>

                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            backgroundColor: color,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;