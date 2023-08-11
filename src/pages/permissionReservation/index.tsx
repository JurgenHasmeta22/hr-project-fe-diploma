import { useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import { tokens } from '~/utils/theme';
import Header from '~/components/dashboard/Header';
import '@fullcalendar/core/vdom';
import Modal from '~/components/modal';
import * as Yup from 'yup';

const permissionReservation = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [permissions, setPermissions] = useState([]);
	const [currentPermissions, setCurrentPermissions] = useState([]);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
		// setCurrentPermissions(null);
	};

	const handleSave = (permission: any) => {
		handleClose();
	};

	const handleDateClick = (selected: any) => {
		setOpen(true);
		const calendarApi = selected.view.calendar;
		calendarApi.unselect();

		// if (title) {
		// calendarApi.addEvent({
		// 	id: `${selected.dateStr}-${title}`,
		// 	title,
		// 	start: selected.startStr,
		// 	end: selected.endStr,
		// 	allDay: selected.allDay
		// });
	};

	const handleEventClick = (selected: any) => {
		if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
			selected.event.remove();
		}
	};

	return (
		<Box m="20px">
			<Header title="Rezervimi i lejeve" subtitle="Marrja e lejeve per punonjesit" />
			<Box display="flex" justifyContent="space-between">
				<Box
					flex="1 1 20%"
					sx={{ backgroundColor: colors.primary[400] }}
					p="15px"
					borderRadius="4px"
				>
					<Typography variant="h5">Lista e lejeve</Typography>
					<List>
						{currentPermissions.map((event: any) => (
							<ListItem
								key={event.id}
								sx={{
									backgroundColor: colors.greenAccent[500],
									margin: '10px 0',
									borderRadius: '2px'
								}}
							>
								<ListItemText
									primary={event.title}
									secondary={
										<Typography>
											{formatDate(event.start, {
												year: 'numeric',
												month: 'short',
												day: 'numeric'
											})}
										</Typography>
									}
								/>
							</ListItem>
						))}
					</List>
				</Box>
				<Box flex="1 1 100%" ml="15px">
					<FullCalendar
						height="100vh"
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
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default permissionReservation;
