import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Box,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = ({
    user,
    onMenuClick,
    onLogout,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();

        if (onLogout) {
            onLogout();
        }
    };

    return (
        <AppBar
            position="sticky"
            elevation={2}
            sx={{
                backgroundColor: "#1976d2",
            }}
        >
            <Toolbar>

                {/* Mobile Drawer Button */}

                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{
                        mr: 2,
                        display: {
                            xs: "block",
                            md: "none",
                        },
                    }}
                    onClick={onMenuClick}
                >
                    <MenuIcon />
                </IconButton>

                {/* Logo */}

                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold",
                    }}
                >
                    Investment Dashboard
                </Typography>

                {/* User */}

                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <Typography
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block",
                            },
                        }}
                    >
                        {user?.fullName || "User"}
                    </Typography>

                    <Tooltip title="Account">
                        <IconButton
                            color="inherit"
                            onClick={handleMenuOpen}
                        >
                            {user?.profileImage ? (
                                <Avatar
                                    src={user.profileImage}
                                />
                            ) : (
                                <Avatar>
                                    <AccountCircleIcon />
                                </Avatar>
                            )}
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem disabled>
                            {user?.email}
                        </MenuItem>

                        <MenuItem onClick={handleLogout}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;