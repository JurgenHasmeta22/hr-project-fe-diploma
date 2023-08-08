import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';
import { useState, useEffect } from 'react';
import IProject from '~/interfaces/IProject';
import IUser from '~/interfaces/IUser';
import usersController from '~/services/users';

const Users = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const columns: any = [
		{ field: 'userId', headerName: 'Id' },
		{
			field: 'Username',
			headerName: 'userName',
			flex: 1,
		},
		{
			field: 'userFirstname',
			headerName: 'Emri',
			flex: 1
		},
		{
			field: 'userLastname',
			headerName: 'Mbiemri',
			flex: 1
		},
		{
			field: 'userEmail',
			headerName: 'Email',
			flex: 1
		},
		{
			field: 'userIsActive',
			headerName: 'Statusi',
			flex: 1
		},
		{
			field: 'balancaLeje',
			headerName: 'Balanca e lejeve',
			flex: 1
		},
		{
			field: 'password',
			headerName: 'Passwordi',
			flex: 1
		},
	];
	const [users, setUsers] = useState<IUser[]>([]);

	async function getUsers(): Promise<void> {
		const response: IUser[] = await usersController.getAllUsers();
		setUsers(response);
	}

	useEffect(() => {
		getUsers();
	}, []);
	
	return (
		<Box m="20px">
			<Header title="Perdoruesit" subtitle="Lista e perdoruesve" />
			<Box
				m="40px 0 0 0"
				height="75vh"
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none'
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none'
					},
					'& .name-column--cell': {
						color: colors.greenAccent[300]
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: colors.blueAccent[700],
						borderBottom: 'none'
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400]
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: colors.blueAccent[700]
					},
					'& .MuiCheckbox-root': {
						color: `${colors.greenAccent[200]} !important`
					}
				}}
			>
				<DataGrid checkboxSelection rows={users} columns={columns} />
			</Box>
		</Box>
	);
};

export default Users;
