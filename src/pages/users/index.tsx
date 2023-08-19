import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';
import { useState, useEffect } from 'react';
import IUser from '~/interfaces/IUser';
import usersController from '~/services/users';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Users = () => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();
	const columns: any = [
		{ field: 'userId', headerName: 'Id' },
		{
			field: 'Username',
			headerName: 'userName',
			flex: 1
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
			flex: 1,
			renderCell: (params: any) => {
				if (params.value === true) {
					return (
						<div
							style={{
								backgroundColor: '#28a745',
								color: '#fff',
								padding: '5px 10px',
								borderRadius: '5px'
							}}
						>
							Aktiv
						</div>
					);
				} else if (params.value === false) {
					return (
						<div
							style={{
								backgroundColor: '#ffcc00',
								color: '#fff',
								padding: '5px 10px',
								borderRadius: '5px'
							}}
						>
							Jo aktiv
						</div>
					);
				}
			}
		},
		{
			field: 'balancaLeje',
			headerName: 'Balanca e lejeve',
			flex: 1
		},
		{
			field: '',
			headerName: 'Veprimet',
			sortable: false,
			disableClickEventBubbling: true,
			filterable: false,
			description: 'Mund te editosh dhe te fshish rekordin specifik',
			flex: 2,
			renderCell: (params: any) => (
				<>
					<Button
						onClick={() => {
							navigate(`/editUser`, {
								state: {
									userId: params.row.userId,
									from: 'Perdoruesit'
								}
							});
						}}
					>
						<EditOutlinedIcon
							sx={{
								color: 'green'
							}}
						/>
					</Button>
					<Button
						onClick={async () => {
							const response = await usersController.deleteUser(params.row.userId);
							if (response === '') {
								toast.success('Elemini u krye me sukses !');
								getUsers();
							} else {
								toast.error('Eleminimi nuk u realizua !');
							}
						}}
					>
						<ClearOutlinedIcon
							sx={{
								color: 'red'
							}}
						/>
					</Button>
				</>
			)
		}
	];

	async function getUsers(): Promise<void> {
		const response: IUser[] = await usersController.getAllUsers();
		setUsers(response);
	}

	const handleDeleteRow = async () => {
		if (selectedRows.length !== 0) {
			for (const element of selectedRows) {
				const response = await usersController.deleteUser(element.userId);
				if (response === '') {
					toast.success('Eleminimi me sukses !');
				}
			}
			getUsers();
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<Box m="20px">
			<Header title="Perdoruesit" subtitle="Lista e perdoruesve" />
			<Box display="flex" gap={'30px'}>
				<Button
					color="secondary"
					variant="contained"
					sx={{
						border: '1px solid #000',
						bgcolor: '#30969f',
						fontSize: '15px',
						fontWeight: '700'
					}}
					onClick={() => {
						navigate('/addUser');
					}}
				>
					Shto
					<AddOutlinedIcon />
				</Button>
				<Button
					color="secondary"
					variant="contained"
					sx={{
						border: '1px solid #000',
						bgcolor: '#ff5252',
						fontSize: '15px',
						fontWeight: '700'
					}}
					onClick={() => {
						handleDeleteRow();
					}}
				>
					Elemino
					<ClearOutlinedIcon color="action" sx={{ ml: '10px' }} />
				</Button>
			</Box>
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
				<DataGrid
					checkboxSelection
					rows={users}
					getRowId={(row) => String(row.userId)}
					columns={columns}
					onSelectionModelChange={(ids) => {
						const clonedUsers = [...users];
						const selectedRowsData = ids.map((id) => clonedUsers.find((row) => row.userId === id));
						setSelectedRows(selectedRowsData);
					}}
				/>
			</Box>
		</Box>
	);
};

export default Users;
