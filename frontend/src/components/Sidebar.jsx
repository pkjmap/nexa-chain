import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider,
    Typography,
    Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 250;

const menuItems = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/dashboard",
    },
    // {
    //     text: "Investments",
    //     icon: <SavingsIcon />,
    //     path: "/investments",
    // },
    // {
    //     text: "ROI History",
    //     icon: <TrendingUpIcon />,
    //     path: "/roi-history",
    // },
    // {
    //     text: "Referral Income",
    //     icon: <GroupIcon />,
    //     path: "/referral-income",
    // },
    // {
    //     text: "Wallet",
    //     icon: <AccountBalanceWalletIcon />,
    //     path: "/wallet",
    // },
];

const Sidebar = ({
    mobileOpen,
    onClose,
    currentPath = "/dashboard",
    onNavigate,
    onLogout,
}) => {

    const drawerContent = (
        <>
            <Toolbar>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    Investment App
                </Typography>
            </Toolbar>

            <Divider />

            <List>

                {menuItems.map((item) => (

                    <ListItem
                        key={item.path}
                        disablePadding
                    >

                        <ListItemButton
                            selected={
                                currentPath === item.path
                            }
                            onClick={() => {

                                if (onNavigate) {
                                    onNavigate(item.path);
                                }

                                if (onClose) {
                                    onClose();
                                }
                            }}
                        >

                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.text}
                            />

                        </ListItemButton>

                    </ListItem>

                ))}

            </List>

            <Divider />

            <Box sx={{ mt: "auto" }}>
                <List>

                    <ListItem disablePadding>

                        <ListItemButton
                            onClick={onLogout}
                        >

                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Logout"
                            />

                        </ListItemButton>

                    </ListItem>

                </List>
            </Box>
        </>
    );

    return (
        <>
            {/* Mobile Drawer */}

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {
                        xs: "block",
                        md: "none",
                    },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}

            <Drawer
                variant="permanent"
                open
                sx={{
                    display: {
                        xs: "none",
                        md: "block",
                    },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Sidebar;