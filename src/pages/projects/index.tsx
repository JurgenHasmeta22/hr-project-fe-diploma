import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';
import IProject from '~/interfaces/IProject';
import { useEffect, useState } from 'react';
import projectsController from '~/services/projects';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const Projects = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const columns = [
		{
			field: 'projektId',
			headerName: 'Id',
			flex: 1,
		},
		{
			field: 'emriProjekt',
			headerName: 'Emri i projektit',
			flex: 1
		},
		{
			field: 'pershkrimProjekt',
			headerName: 'Pershkrimi i projektit',
			flex: 1
		},
		{
			field: '',
			headerName: 'Veprimet',
			sortable: false,
			disableClickEventBubbling: true,
			filterable: false,
			description: 'Mund te editosh dhe te fshish rekordin specifik',
			flex: 1,
			renderCell: (params: any) => (
				<>
					<Button onClick={() => {}}>
						<EditOutlinedIcon color='action'/>
					</Button>
					<Button onClick={() => {}}>
						<OpenInNewOutlinedIcon  color='action' />
					</Button>
				</>
			)
		}
	];
	const [projects, setProjects] = useState<IProject[]>([]);

	async function getProjects(): Promise<void> {
		const response: IProject[] = await projectsController.getAllProjects();
		setProjects(response);
	}

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<Box m="20px">
			<Header title="Projektet" subtitle="Lista e projekteve" />
			<Box display="flex" gap={'10px'}>
				<Button
					sx={{ border: '2px solid #000', bgcolor: '#ff5252', fontSize: '16px' }}
					onClick={() => {}}
				>
					Add
					<AddOutlinedIcon />
				</Button>
				<Button
					sx={{ border: '2px solid #000', bgcolor: '#ff5252', fontSize: '16px' }}
					onClick={() => {}}
				>
					Delete
					<ClearOutlinedIcon />
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
				<DataGrid checkboxSelection rows={projects} columns={columns} getRowId={(row) => String(row.projektId)} />
			</Box>
		</Box>
	);
};

export default Projects;
