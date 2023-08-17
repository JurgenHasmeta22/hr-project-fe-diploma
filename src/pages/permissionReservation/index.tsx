import { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';
import '@fullcalendar/core/vdom';
import * as Yup from 'yup';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { FormikProps } from 'formik';
import permissionsController from '~/services/permissions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useModal } from '~/components/modal/modalContext';
import IPermission from '~/interfaces/IPermission';

const permissionReservation = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [permissions, setPermissions] = useState<IPermission[]>([]);
	const [currentPermissions, setCurrentPermissions] = useState([]);
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
	const formikRef = useRef<FormikProps<any>>(null);
	const [calendarEvents, setCalendarEvents] = useState<any>([]);
	const navigate = useNavigate();
	const { openModal } = useModal();
	const [loading, setLoading] = useState(true);

	const handleDataChange = (values: any) => {
		setFormData(values); // Update the parent's state with form data
	};

	const handleResetFromParent = () => {
		formikRef.current?.resetForm();
	};

	const handleClose = () => {
		setOpen(false);
	};

	function formatDate(date: any) {
		const d = new Date(date);
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, '0'); // Add 1 since months are 0-indexed.
		const day = String(d.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	const handleSave = async () => {
		const response = await permissionsController.askPermission(
			formData,
			'cc9ef9d7-6197-4490-92f7-4f28cf6c1a96'
		);

		if (response === '') {
			toast.success('Rezervimi i lejes u krijua me sukses !');
			navigate('/users');
		} else {
			toast.error('Rezervimi i lejes nuk u realizua !');
		}

		handleClose();
	};

	const handleDateClick = (selected: any) => {
		openModal({
			formRef: formikRef,
			onClose: () => setOpen(false),
			initialValues: {
				dataFillim: selected.startStr,
				dataMbarim: selected.endStr,
				tipiLeje: ''
			},
			fields: [
				{ name: 'dataFillim', label: 'Data e fillimit', type: 'date' },
				{ name: 'dataMbarim', label: 'Data e mbarimit', type: 'date' },
				{
					name: 'tipiLeje',
					label: 'Tipi i lejes',
					type: 'select',
					options: [
						{ label: 'Type 1', value: 'type1' },
						{ label: 'Type 2', value: 'type2' }
					]
				}
			],
			validationSchema: Yup.object({
				dataFillim: Yup.string().required('Required'),
				dataMbarim: Yup.string().required('Required'),
				tipiLeje: Yup.string().required('Required')
			}),
			onSave: (values: any) => {
				console.log(values);
			},
			title: 'Rezervo leje',
			actions: [
				{
					label: 'Anullo',
					onClick: () => handleResetFromParent(),
					type: 'reset',
					color: 'secondary',
					variant: 'contained',
					sx: {
						border: '1px solid #000',
						bgcolor: '#ff5252',
						fontSize: '15px',
						fontWeight: '700'
					},
					icon: <ClearAllIcon />
				},
				{
					label: 'Ruaj ndryshimet',
					onClick: () => handleSave(),
					type: 'submit',
					color: 'secondary',
					variant: 'contained',
					sx: {
						border: '1px solid #000',
						bgcolor: '#30969f',
						fontSize: '15px',
						fontWeight: '700'
					},
					icon: <SaveAsIcon />
				}
			],
			onDataChange: (values: any) => handleDataChange(values),
			subTitle: 'Plotesoni detajet e lejes'
		});

		const calendarApi = selected.view.calendar;
		calendarApi.unselect();
	};

	const handleEventClick = (selected: any) => {
		openModal({
			formRef: formikRef,
			onClose: () => setOpen(false),
			initialValues: {
				dataFillim: formatDate(selected.event.startStr),
				dataMbarim: formatDate(selected.event.endStr),
				tipiLeje: selected.event.title
			},
			fields: [
				{ name: 'dataFillim', label: 'Data e fillimit', type: 'date' },
				{ name: 'dataMbarim', label: 'Data e mbarimit', type: 'date' },
				{
					name: 'tipiLeje',
					label: 'Tipi i lejes',
					type: 'select',
					options: [
						{ label: 'Type 1', value: 'type1' },
						{ label: 'Type 2', value: 'type2' }
					]
				}
			],
			validationSchema: Yup.object({
				dataFillim: Yup.string().required('Required'),
				dataMbarim: Yup.string().required('Required'),
				tipiLeje: Yup.string().required('Required')
			}),
			onSave: (values: any) => {
				console.log(values);
			},
			title: 'Detajet e lejes',
			actions: [
				{
					label: 'Anullo',
					onClick: () => handleResetFromParent(),
					type: 'reset',
					color: 'secondary',
					variant: 'contained',
					sx: {
						border: '1px solid #000',
						bgcolor: '#ff5252',
						fontSize: '15px',
						fontWeight: '700'
					},
					icon: <ClearAllIcon />
				},
				{
					label: 'Ruaj ndryshimet',
					onClick: () => handleSave(),
					type: 'submit',
					color: 'secondary',
					variant: 'contained',
					sx: {
						border: '1px solid #000',
						bgcolor: '#30969f',
						fontSize: '15px',
						fontWeight: '700'
					},
					icon: <SaveAsIcon />
				}
			],
			onDataChange: (values: any) => handleDataChange(values),
			subTitle: 'Ndryshoni detajet e lejes'
		});

		const calendarApi = selected.view.calendar;
		calendarApi.unselect();
	};

	async function getPermissions(): Promise<void> {
		const response: IPermission[] = await permissionsController.getAllPermissions();

		const convertedEvents = response.map((permission) => ({
			id: permission.lejeId?.toString(),
			title: permission.tipiLeje,
			start: permission.dataFillim,
			end: permission.dataMbarim
		}));

		setCalendarEvents(convertedEvents);
		setPermissions(response);
	}

	useEffect(() => {
		async function fetchData() {
			await getPermissions();
			setLoading(false);
		}
		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<Box m="20px">
			<Header title="Rezervimi i lejeve" subtitle="Marrja e lejeve per punonjesit" />
			<Box display="flex" justifyContent="space-between">
				<Box
					flex="1 1 15%"
					sx={{ backgroundColor: colors.primary[400] }}
					p="15px"
					borderRadius="4px"
				>
					<Typography variant="h5">Legjenda</Typography>
				</Box>
				<Box flex="1 1 100%" ml="15px">
					<FullCalendar
						height="75vh"
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
						headerToolbar={{
							left: 'prev,next today',
							center: 'title',
							right: 'dayGridMonth'
						}}
						initialView="dayGridMonth"
						editable={true}
						selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						weekends={true}
						select={handleDateClick}
						eventClick={handleEventClick}
						eventsSet={(events: any) => setCurrentPermissions(events)}
						events={calendarEvents}
						allDaySlot={true}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default permissionReservation;
