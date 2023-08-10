import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';
import IProject from '~/interfaces/IProject';
import { useEffect, useState } from 'react';
import projectsController from '~/services/projects';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Projects = () => {
	const [projects, setProjects] = useState<IProject[]>([]);
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();
	const columns = [
		{
			field: 'projektId',
			headerName: 'Id',
			flex: 1
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
			// align: 'center',
			renderCell: (params: any) => (
				<>
					<Button
						onClick={() => {
							navigate(`/admin/editProject`, {
								state: {
									projectId: params.row.projektId
								}
							});
						}}
					>
						<EditOutlinedIcon color="action" />
					</Button>
					<Button
						onClick={async () => {
							const response = await projectsController.deleteProject(params.row.projektId);
							if (response === '') {
								toast.success('Elemini u krye me sukses !');
								getProjects();
							} else {
								toast.error('Eleminimi nuk u realizua !');
							}
						}}
					>
						<ClearOutlinedIcon color="action" />
					</Button>
				</>
			)
		}
	];

	async function getProjects(): Promise<void> {
		const response: IProject[] = await projectsController.getAllProjects();
		setProjects(response);
	}

	const handleDeleteRow = async () => {
		if (selectedRows.length !== 0) {
			for (const element of selectedRows) {
				const response = await projectsController.deleteProject(element.projektId);
				if (response === '') {
					toast.success('Eleminimi me sukses !');
				}
			}
			getProjects();
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<Box m="20px">
			<Header title="Projektet" subtitle="Lista e projekteve" />
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
					rows={projects}
					columns={columns}
					getRowId={(row) => String(row.projektId)}
					onSelectionModelChange={(ids) => {
						const clonedProjectd = [...projects];
						const selectedRowsData = ids.map((id) =>
							clonedProjectd.find((row) => row.projektId === id)
						);
						setSelectedRows(selectedRowsData);
					}}
				/>
			</Box>
		</Box>
	);
};

export default Projects;
