import { Box, useTheme } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { tokens } from '~/utils/theme';
import StatBox from '~/components/dashboard/StatBox';
import Header from '~/components/dashboard/Header';
import { useEffect, useState } from 'react';
import IUser from '~/interfaces/IUser';
import usersController from '~/services/users';
import IProject from '~/interfaces/IProject';
import projectsController from '~/services/projects';
import IPermission from '~/interfaces/IPermission';
import permissionsController from '~/services/permissions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [users, setUsers] = useState<IUser[]>([]);
	const [projects, setProjects] = useState<IProject[]>([]);
	const [permissions, setPermissions] = useState<IPermission[]>([]);

	async function getUsers(): Promise<void> {
		const response: IUser[] = await usersController.getAllUsers();
		setUsers(response);
	}

	async function getProjects(): Promise<void> {
		const response: IProject[] = await projectsController.getAllProjects();
		setProjects(response);
	}

	async function getPermissions(): Promise<void> {
		const response: IPermission[] = await permissionsController.getAllPermissions();
		const filteredPermissions = response.filter((permission) => permission.aprovuar === 1);
		setPermissions(filteredPermissions);
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
						icon={<AccountTreeIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
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
						icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
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
						icon={<EventNoteIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
