import React, { useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Typography,
    Avatar,
    Drawer,
    IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router";
import { useStore } from "~/store/zustand/store";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ sidebarItems }: any) => {
    const [selected, setSelected] = useState("Dashboard");
    const [openSidebar, setOpenSidebar] = useState(true);
    const { userDetailsLoggedIn } = useStore();
    const navigate = useNavigate();

    function onClose() {
        setOpenSidebar(false);
    }

    const handleItemClick = (title: string, to: string) => {
        setSelected(title);
        navigate(to);
        onClose && onClose();
    };

    return (
        <>
            <Drawer variant={"persistent"} anchor={"left"} open={openSidebar} onClose={onClose}>
                <Box mt={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <IconButton onClick={() => onClose && onClose()}>
                            <CloseIcon color="action" />
                        </IconButton>
                    </Box>
                    <Box display="flex" alignItems="center" mb={3} ml={3}>
                        <Avatar>
                            <AccountCircleIcon />
                        </Avatar>
                        <Box ml={2}>
                            <Typography variant="subtitle1">
                                {userDetailsLoggedIn &&
                                    `${userDetailsLoggedIn?.userFirstname} ${userDetailsLoggedIn?.userLastname}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {userDetailsLoggedIn && `@${userDetailsLoggedIn?.userName}`}
                            </Typography>
                        </Box>
                    </Box>
                    <List>
                        {sidebarItems?.map((item: any) => (
                            <ListItem key={item.name} value={selected} onClick={() => handleItemClick(item.label, item.to)}>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            {!openSidebar && (
                <Box display="flex" justifyContent="center" mt={2}>
                    <IconButton
                        sx={{
                            position: "fixed",
                            top: "50%",
                            left: 0,
                            transform: "translateY(-50%)",
                        }}
                        onClick={() => setOpenSidebar(true)}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </Box>
            )}
        </>
    );
};

export default Sidebar;
