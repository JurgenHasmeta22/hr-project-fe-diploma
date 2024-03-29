import { useEffect, useState } from "react";
import { Box, List, Typography, Avatar, Drawer, IconButton, useTheme } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router";
import { useStore } from "~/services/store/store";
import { tokens } from "~/utils/theme";
import MenuIcon from "@mui/icons-material/Menu";
import { NestedSidebarItem } from "./NestedSidebarItem";
import { SidebarItem } from "./SidebarItem";

const Sidebar = ({ sidebarItems }: any) => {
    const { userDetailsLoggedIn, openSidebar, setOpenSidebar } = useStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedLabel, setSelectedLabel] = useState(location.state ? location.state.label : "");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isEmployee = userDetailsLoggedIn?.userRolis?.some((el) => el.roli.roliEmri === "Employee");

    const handleItemClick = (title: string, to: string, state: any) => {
        setSelectedLabel(title);
        navigate(to, { state });
    };

    const onClose = () => {
        setOpenSidebar(false);
    };

    return (
        <>
            <Drawer
                variant={"persistent"}
                anchor={"left"}
                open={openSidebar}
                onClose={onClose}
                PaperProps={{ sx: { backgroundColor: colors.grey[1000] } }}
            >
                <Box mt={3}>
                    <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
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
                    <List disablePadding>
                        {sidebarItems?.map((item: any, index: number) =>
                            item.submenu && item.submenu.length > 0 ? (
                                <NestedSidebarItem
                                    key={item.label}
                                    item={item}
                                    selectedLabel={selectedLabel}
                                    handleItemClick={handleItemClick}
                                    isEmployee={isEmployee}
                                />
                            ) : (
                                <SidebarItem
                                    ket={item.label}
                                    item={item}
                                    index={index}
                                    selectedLabel={selectedLabel}
                                    handleItemClick={handleItemClick}
                                    isEmployee={isEmployee}
                                />
                            ),
                        )}
                    </List>
                </Box>
            </Drawer>
            {!openSidebar && (
                <Box>
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "5%",
                            left: 10,
                            transform: "translateY(-50%)",
                        }}
                        onClick={() => setOpenSidebar(true)}
                    >
                        <MenuIcon fontSize="medium" />
                    </IconButton>
                </Box>
            )}
        </>
    );
};

export default Sidebar;
