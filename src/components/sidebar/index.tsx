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

const NestedSidebarItem = ({ item, selectedIndex, handleItemClick }: any) => {
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
            <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
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
                                selected={selectedIndex === index}
                                onClick={() => {
                                    handleItemClick(subItem.label, subItem.to, index, { label: subItem.label, index });
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
    let pathname = location.pathname;
    const state = location.state;

    if (pathname.startsWith("/")) {
        pathname = pathname.substring(1);
    }

    const [selected, setSelected] = useState(pathname);
    const [selectedIndex, setSelectedIndex] = useState(location.state ? location.state.index : 0);

    const handleItemClick = (title: string, to: string, index: number, state: any) => {
        setSelected(title);
        setSelectedIndex(index);
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
                                    selectedIndex={selectedIndex}
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
                                            selected={selectedIndex === index}
                                            onClick={() => {
                                                handleItemClick(item.label, item.to, index, { label: item.label, index });
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
