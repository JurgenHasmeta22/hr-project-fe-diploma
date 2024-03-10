import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "~/utils/theme";
import { useStore } from "~/store/zustand/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Item = ({ title, to, icon, selected, setSelected }: any) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            rootStyles={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
            component={<Link to={to} />}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const SubMenuItem = ({ label, selected, setSelected }: any) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { userDetailsLoggedIn } = useStore();
    const isEmployee = userDetailsLoggedIn?.userRolis?.some((el) => el.roli.roliEmri === "Employee");

    return (
        <SubMenu
            label={label}
            icon={<ReceiptOutlinedIcon />}
            rootStyles={{
                color: colors.grey[100],
            }}
        >
            {!isEmployee && (
                <Item
                    title="Lista e lejeve"
                    to="/permissions"
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}
            <Item
                title="Rezervimi i lejeve"
                to="/permissionReservation"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
        </SubMenu>
    );
};

const SidebarWrapper = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [visible, setVisible] = useState(true);
    const { userDetailsLoggedIn } = useStore();

    return (
        <Sidebar
            collapsed={isCollapsed}
            rootStyles={{
                "& .ps-sidebar-container": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .ps-menuitem-root:hover": {
                    color: "#2b15ed !important",
                },
                "& .ps-active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <Menu>
                <Box
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "15px",
                        marginBottom: "15px",
                    }}
                >
                    {!isCollapsed ? (
                        <Box position="absolute" top={4} right={5}>
                            <IconButton onClick={() => setVisible(false)}>X</IconButton>
                        </Box>
                    ) : (
                        <MenuOutlinedIcon />
                    )}
                </Box>
                {!isCollapsed && (
                    <Box mb="35px">
                        <Box textAlign="center">
                            <AccountCircleIcon style={{ fontSize: 100 }} />
                            <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "20px 0 0 0" }}>
                                {userDetailsLoggedIn?.userName}
                            </Typography>
                            <Typography variant="h5" color={colors.greenAccent[500]}>
                                {userDetailsLoggedIn?.userRolis![0].roli.roliEmri}
                            </Typography>
                        </Box>
                    </Box>
                )}
                <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                    <Item
                        title="Dashboard"
                        to="/dashboard"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Perdoruesit"
                        to="/users"
                        icon={<PeopleOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <SubMenuItem label="Lejet" selected={selected} setSelected={setSelected} />
                    <Item
                        title="Projektet"
                        to="/projects"
                        icon={<PersonOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Box>
            </Menu>
        </Sidebar>
    );
};

export default SidebarWrapper;
