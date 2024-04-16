import { useTheme } from "@mui/material";
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
import { DashboardStatBox } from "./DashboardStatBox";

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
        <div className="m-5">
            <div className="flex justify-between items-center">
                <Header title="Dashboard" subtitle="Miresevini ne dashboardin tuaj" />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-3 grid-rows-1 gap-10">
                <div className="bg-primary-400 rounded-lg flex items-center justify-center p-5">
                    <DashboardStatBox
                        title={projects?.length}
                        subtitle="Nr i projekteve"
                        progress="0.75"
                        increase="+14%"
                        icon={<AccountTreeIcon className="text-greenAccent-600" style={{ fontSize: "26px" }} />}
                    />
                </div>
                <div className="bg-primary-400 rounded-lg flex items-center justify-center p-5">
                    <DashboardStatBox
                        title={users?.length}
                        subtitle="Nr i punonjeseve"
                        progress="0.50"
                        increase="+21%"
                        icon={<PersonAddIcon className="text-greenAccent-600" style={{ fontSize: "26px" }} />}
                    />
                </div>
                <div className="bg-primary-400 rounded-lg flex items-center justify-center p-5">
                    <DashboardStatBox
                        title={permissions?.length}
                        subtitle="Nr i lejeve"
                        progress="0.30"
                        increase="+5%"
                        icon={<EventNoteIcon className="text-greenAccent-600" style={{ fontSize: "26px" }} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
