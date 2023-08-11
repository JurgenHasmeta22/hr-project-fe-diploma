import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';
import '@fullcalendar/core/vdom';
import Modal from '~/components/modal';
import * as Yup from 'yup';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { FormikProps } from 'formik';

const permissionReservation = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [permissions, setPermissions] = useState([]);
	const [currentPermissions, setCurrentPermissions] = useState([]);
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
	const formikRef = useRef<FormikProps<any>>(null);

	const handleDataChange = (values: any) => {
		setFormData(values); // Update the parent's state with form data
	};

	const handleResetFromParent = () => {
		formikRef.current?.resetForm();
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = (permission: any) => {
		handleClose();
	};

	const handleDateClick = (selected: any) => {
		setOpen(true);
		const calendarApi = selected.view.calendar;
		calendarApi.unselect();
	};

	const handleEventClick = (selected: any) => {
		// if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
		// 	selected.event.remove();
		// }
	};

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
						height="65vh"
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
						initialEvents={[
							{
								id: '12315',
								title: 'All-day event',
								date: '2022-09-14'
							},
							{
								id: '5123',
								title: 'Timed event',
								date: '2022-09-28'
							}
						]}
						allDaySlot={true}
					/>
					<Modal
						open={open}
						formRef={formikRef}
						onClose={() => setOpen(false)}
						initialValues={{
							dataFillim: '',
							dataMbarim: '',
							tipiLeje: ''
						}}
						fields={[
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
						]}
						validationSchema={Yup.object({
							dataFillim: Yup.string().required('Required'),
							dataMbarim: Yup.string().required('Required'),
							tipiLeje: Yup.string().required('Required')
						})}
						onSave={(values) => {
							console.log(values);
						}}
						title={'Rezervo leje'}
						actions={[
							{
								label: 'Anullo',
								onClick: () => {
									handleResetFromParent();
								},
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
								onClick: () => {},
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
						]}
						onDataChange={(values: any) => {
							handleDataChange(values);
						}}
						subTitle="Plotesoni detajet e lejes"
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default permissionReservation;
