import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';
import IProject from '~/interfaces/IProject';
import { useEffect, useState } from 'react';
import projectsController from '~/services/projects';

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
				<DataGrid checkboxSelection rows={projects} columns={columns} />
			</Box>
		</Box>
	);
};

export default Projects;
