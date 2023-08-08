import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';

const Permissions = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
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
		},
	];

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
				{/* <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} /> */}
			</Box>
		</Box>
	);
};

export default Permissions;
