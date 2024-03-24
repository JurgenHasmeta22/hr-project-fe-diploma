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
    Menu,
    MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { useStore } from "~/store/zustand/store";

const Sidebar = ({ sidebarItems }: any) => {
    const [selected, setSelected] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openSidebar, setOpenSidebar] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { userDetailsLoggedIn } = useStore();
    const navigate = useNavigate();

    const handleOpenSubMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSubMenu = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (title: string, to: string) => {
        setSelected(title);
        navigate(to);
        onClose();
    };

    const onClose = () => {
        setOpenSidebar(false);
        handleCloseSubMenu();
    };

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Drawer variant={"persistent"} anchor={"left"} open={openSidebar} onClose={onClose}>
                <Box mt={3}>
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
                        {sidebarItems?.map((item: any, index: number) => (
                            <React.Fragment key={item.name}>
                                <ListItem
                                    value={item.label}
                                    onClick={() => handleItemClick(item.label, item.to)}
                                    onContextMenu={handleOpenSubMenu}
                                    // sx={{ "&.Mui-selected": { backgroundColor: "#fff" } }}
                                >
                                    <ListItemButton selected={true} onClick={(event) => handleListItemClick(event, index)}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </ListItem>
                                {/* {item.submenu && (
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl) && selected === item.label}
                                        onClose={handleCloseSubMenu}
                                        onClick={handleCloseSubMenu}
                                        autoFocus={false}
                                    >
                                        {item.submenu.map((subItem: any) => (
                                            <MenuItem
                                                key={subItem.label}
                                                onClick={() => handleItemClick(subItem.label, subItem.to)}
                                            >
                                                {subItem.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                )} */}
                            </React.Fragment>
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
