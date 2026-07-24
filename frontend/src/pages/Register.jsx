import React, { useState } from "react";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        mobile: "",
        referredBy: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.email || !formData.password) {
            setError("Please enter email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/auth/register", formData);

            navigate("/login");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                    "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    p: 4,
                    width: "100%",
                    borderRadius: 3,
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="bold"
                    gutterBottom
                >
                    Investment Platform
                </Typography>

                <Typography
                    align="center"
                    color="text.secondary"
                    mb={3}
                >
                    Register to your account
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mobile"
                        name="mobile"
                        type="text"
                        value={formData.mobile}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Referred By"
                        name="referredBy"
                        type="text"
                        value={formData.referredBy}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                            mt: 3,
                            py: 1.5,
                        }}
                    >
                        {loading ? (
                            <CircularProgress
                                size={24}
                                color="inherit"
                            />
                        ) : (
                            "Register"
                        )}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;