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
    Collapse,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router";
import { useStore } from "~/store/zustand/store";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const NestedSidebarItem = ({ item, selectedLabel, handleItemClick }: any) => {
    const { openSubMenu, setOpenSubMenu } = useStore();

    const handleClick = () => {
        setOpenSubMenu(!openSubMenu);
    };

    return (
        <React.Fragment key={item.label}>
            <ListItem>
                <ListItemButton
                    onClick={() => {
                        handleClick();
                    }}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={openSubMenu}>
                <List component="div" disablePadding sx={{ paddingLeft: "20px" }}>
                    {item.submenu.map((subItem: any, index: number) => (
                        <ListItem key={index} value={subItem.label}>
                            <ListItemButton
                                sx={{
                                    "&.Mui-selected": {
                                        backgroundColor: "#c5bddb",
                                        color: "#ffffff",
                                        "&:hover": {
                                            backgroundColor: "#b5acd2",
                                        },
                                    },
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                        "& .MuiListItemIcon-root": {
                                            color: "#3f51b5",
                                        },
                                        "& .MuiListItemText-primary": {
                                            color: "#3f51b5",
                                        },
                                    },
                                }}
                                selected={selectedLabel === subItem.label}
                                onClick={() => {
                                    handleItemClick(subItem.label, subItem.to, { label: subItem.label, index });
                                }}
                            >
                                <ListItemIcon>{subItem.icon}</ListItemIcon>
                                <ListItemText primary={subItem.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
};

const Sidebar = ({ sidebarItems }: any) => {
    const { userDetailsLoggedIn, openSidebar, setOpenSidebar } = useStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedLabel, setSelectedLabel] = useState(location.state ? location.state.label : "");

    const handleItemClick = (title: string, to: string, state: any) => {
        setSelectedLabel(title);
        navigate(to, { state });
    };

    const onClose = () => {
        setOpenSidebar(false);
    };

    return (
        <>
            <Drawer variant={"persistent"} anchor={"left"} open={openSidebar} onClose={onClose}>
                <Box
                    mt={3}
                    sx={{
                        width: 250,
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <IconButton onClick={onClose}>
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
                        {sidebarItems?.map((item: any, index: number) =>
                            item.submenu && item.submenu.length > 0 ? (
                                <NestedSidebarItem
                                    key={item.label}
                                    item={item}
                                    selectedLabel={selectedLabel}
                                    handleItemClick={handleItemClick}
                                />
                            ) : (
                                <React.Fragment key={index}>
                                    <ListItem value={item.label}>
                                        <ListItemButton
                                            sx={{
                                                "&.Mui-selected": {
                                                    backgroundColor: "#c5bddb",
                                                    color: "#ffffff",
                                                    "&:hover": {
                                                        backgroundColor: "#b5acd2",
                                                    },
                                                },
                                                "&:hover": {
                                                    backgroundColor: "#f0f0f0",
                                                    "& .MuiListItemIcon-root": {
                                                        color: "#3f51b5",
                                                    },
                                                    "& .MuiListItemText-primary": {
                                                        color: "#3f51b5",
                                                    },
                                                },
                                            }}
                                            selected={selectedLabel === item.label}
                                            onClick={() => {
                                                handleItemClick(item.label, item.to, { label: item.label, index });
                                            }}
                                        >
                                            <ListItemIcon>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.label} />
                                        </ListItemButton>
                                    </ListItem>
                                </React.Fragment>
                            ),
                        )}
                    </List>
                </Box>
            </Drawer>
            {!openSidebar && (
                <Box display="flex" justifyContent="center" mt={2}>
                    <IconButton
                        sx={{
                            position: "fixed",
                            top: "10%",
                            left: 0,
                            transform: "translateY(-50%)",
                        }}
                        onClick={() => setOpenSidebar(true)}
                    >
                        <ArrowForwardIcon fontSize="large" />
                    </IconButton>
                </Box>
            )}
        </>
    );
};

export default Sidebar;
