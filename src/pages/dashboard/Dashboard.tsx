import { Box, Typography, useTheme } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { tokens } from "~/utils/theme";
import Header from "~/components/header/Header";
import { useEffect, useState } from "react";
import IUser from "~/interfaces/IUser";
import usersController from "~/services/api/users";
import IProject from "~/interfaces/IProject";
import projectsController from "~/services/api/projects";
import IPermission from "~/interfaces/IPermission";
import permissionsController from "~/services/api/permissions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

const ProgressCircle = ({ progress = "0.75", size = "40" }: any) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const angle = progress * 360;

    return (
        <Box
            sx={{
                background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
};

const StatBox = ({ title, subtitle, icon, progress, increase }: any) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }}>
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <ProgressCircle progress={progress} />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                    {subtitle}
                </Typography>
                <Typography variant="h5" fontStyle="italic" sx={{ color: colors.greenAccent[600] }}>
                    {increase}
                </Typography>
            </Box>
        </Box>
    );
};

const Dashboard = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [permissions, setPermissions] = useState<IPermission[]>([]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    async function getUsers(): Promise<void> {
        const response: IUser[] = await usersController.getAllUsers();

        if (response) {
            setUsers(response);
        }
    }

    async function getProjects(): Promise<void> {
        const response: IProject[] = await projectsController.getAllProjects();

        if (response) {
            setProjects(response);
        }
    }

    async function getPermissions(): Promise<void> {
        const response: IPermission[] = await permissionsController.getAllPermissions();

        if (response) {
            const filteredPermissions = response.filter((permission) => permission.aprovuar === 1);
            setPermissions(filteredPermissions);
        }
    }

    useEffect(() => {
        getUsers();
        getProjects();
        getPermissions();
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Dashboard" subtitle="Miresevini ne dashboardin tuaj" />
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(9, 1fr)" gridAutoRows="250px" gap="30px">
                <Box
                    sx={{ backgroundColor: colors.primary[400] }}
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={projects?.length}
                        subtitle="Nr i projekteve"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <AccountTreeIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px",
                                }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    sx={{ backgroundColor: colors.primary[400] }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={users?.length}
                        subtitle="Nr i punonjeseve"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <PersonAddIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px",
                                }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    sx={{ backgroundColor: colors.primary[400] }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={permissions?.length}
                        subtitle="Nr i lejeve"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <EventNoteIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px",
                                }}
                            />
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
