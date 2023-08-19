import { Box, Button, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';
import { useState, useEffect } from 'react';
import IPermission from '~/interfaces/IPermission';
import permissionsController from '~/services/permissions';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const Permissions = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();
	const columns = [
		{ field: 'lejeId', headerName: 'Id' },
		{
			field: 'dataFillim',
			headerName: 'Data e fillimit',
			flex: 1
		},
		{
			field: 'dataMbarim',
			headerName: 'Data e mbarimit',
			flex: 1,
			cellClassName: 'name-column--cell'
		},
		{
			field: 'tipiLeje',
			headerName: 'Tipi i lejes',
			flex: 1
		},
		{
			field: 'aprovuar',
			headerName: 'Statusi',
			flex: 1,
			renderCell: (params: any) => {
				if (params.value === 2) {
					return (
						<div
							style={{
								backgroundColor: '#28a745',
								color: '#fff',
								padding: '5px 10px',
								borderRadius: '5px'
							}}
						>
							Aprovuar
						</div>
					);
				} else if (params.value === 1) {
					return (
						<div
							style={{
								backgroundColor: '#ffcc00',
								color: '#fff',
								padding: '5px 10px',
								borderRadius: '5px'
							}}
						>
							Ne pritje
						</div>
					);
				} else {
					return (
						<div
							style={{
								backgroundColor: '#c82333',
								color: '#fff',
								padding: '5px 10px',
								borderRadius: '5px'
							}}
						>
							Disaprovuar
						</div>
					);
				}
			}
		},
		{
			field: '',
			headerName: 'Veprimet',
			sortable: false,
			disableClickEventBubbling: true,
			filterable: false,
			description: 'Mund te aprovosh ose te disaprovosh eventin',
			flex: 1,
			renderCell: (params: any) => (
				<>
					<Button
						onClick={() => {
							handleApprovePermission(params.row.id);
						}}
					>
						<CheckCircleIcon color="secondary" />
					</Button>
					<Button
						onClick={() => {
							handleDisapprovePermission(params.row.id);
						}}
					>
						<ThumbDownAltIcon
							sx={{
								color: 'red'
							}}
						/>
					</Button>
				</>
			)
		}
	];
	const [permissions, setPermissions] = useState<IPermission[]>([]);

	async function handleApprovePermission(permissionId: any): Promise<void> {
		const response: IPermission[] = await permissionsController.approvePermission(permissionId);
		getPermissions();
	}

	async function handleDisapprovePermission(permissionId: any): Promise<void> {
		const response: IPermission[] = await permissionsController.dissaprovePermission(permissionId);
		getPermissions();
	}

	async function getPermissions(): Promise<void> {
		const response: IPermission[] = await permissionsController.getAllPermissions();
		setPermissions(response);
	}

	useEffect(() => {
		getPermissions();
	}, []);

	return (
		<Box m="20px">
			<Header title="Lejet" subtitle="Lista e lejeve" />
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
				<DataGrid rows={permissions} columns={columns} getRowId={(row) => String(row.lejeId)} />
			</Box>
		</Box>
	);
};

export default Permissions;
