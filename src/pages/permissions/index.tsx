import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';
import { useState, useEffect } from 'react';
import IPermission from '~/interfaces/IPermission';
import permissionsController from '~/services/permissions';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate } from 'react-router-dom';

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
			headerName: 'Aprovuar',
			flex: 1
		},
		{
			field: 'userId',
			headerName: 'Id e userit',
			flex: 1
		}
		// {
		// 	field: '',
		// 	headerName: 'Veprimet',
		// 	sortable: false,
		// 	disableClickEventBubbling: true,
		// 	filterable: false,
		// 	description: 'Mund te editosh dhe te fshish rekordin specifik',
		// 	flex: 1,
		// 	renderCell: (params: any) => (
		// 		<>
		// 			<Button onClick={() => {}}>
		// 				<EditOutlinedIcon color="action" />
		// 			</Button>
		// 			<Button onClick={() => {}}>
		// 				<OpenInNewOutlinedIcon color="action" />
		// 			</Button>
		// 		</>
		// 	)
		// }
	];

	const [permissions, setPermissions] = useState<IPermission[]>([]);

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
						navigate('/admin/permissionReservation');
					}}
				>
					Shto
					<AddOutlinedIcon />
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
				<DataGrid checkboxSelection rows={permissions} columns={columns} />
			</Box>
		</Box>
	);
};

export default Permissions;
