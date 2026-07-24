import React from "react";
import {
    Paper,
    Typography,
    Box,
    CircularProgress,
    Avatar,
    Stack,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

/**
 * Recursive Tree Node
 */
const TreeNode = ({ node, level = 0 }) => {
    return (
        <Box
            sx={{
                ml: level * 4,
                mt: 2,
                borderLeft: level ? "2px solid #e0e0e0" : "none",
                pl: level ? 2 : 0,
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                    <AccountCircleIcon />
                </Avatar>

                <Box>
                    <Typography fontWeight="bold">
                        {node.fullName}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {node.email}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="primary"
                    >
                        Referral Code : {node.referralCode}
                    </Typography>
                </Box>
            </Stack>

            {node.children &&
                node.children.length > 0 &&
                node.children.map((child) => (
                    <TreeNode
                        key={child.id || child._id}
                        node={child}
                        level={level + 1}
                    />
                ))}
        </Box>
    );
};

const ReferralTree = ({
    tree = [],
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
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
            >
                Referral Tree
            </Typography>

            {tree.length === 0 ? (
                <Typography
                    color="text.secondary"
                    align="center"
                >
                    No referrals found.
                </Typography>
            ) : (
                tree.map((node) => (
                    <TreeNode
                        key={node.id || node._id}
                        node={node}
                    />
                ))
            )}
        </Paper>
    );
};

export default ReferralTree;