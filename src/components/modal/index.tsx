import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Grid,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from 'formik';

type FieldConfig = {
	name: string;
	label: string;
	type?: string;
	options?: Array<{ label: string; value: any }>;
};

type ModalProps = {
	open: boolean;
	onClose: () => void;
	initialValues: any;
	fields: FieldConfig[];
	validationSchema: any;
	onSave: (values: any) => void;
	title: string;
	actions: ActionConfig[];
};

type ActionConfig = {
	label: string;
	onClick: () => void;
	type?: string;
	color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
	variant?: 'text' | 'outlined' | 'contained';
	icon?: React.ReactNode;
	sx?: any;
};

const Modal: React.FC<ModalProps> = ({
	open,
	onClose,
	initialValues,
	fields,
	validationSchema,
	onSave,
	title,
	actions
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="md"
			// PaperProps={{ style: { backgroundColor: '#FAFAFA' } }}
		>
			<DialogTitle fontSize={'26px'}>
				{title}
				<IconButton style={{ position: 'absolute', right: 0, top: 0 }} onClick={onClose}>
					<CloseIcon color="action" />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<DialogContentText fontSize={'18px'}>Plotesoni detajet e lejes</DialogContentText>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						onSave(values);
						onClose();
					}}
				>
					{({ errors, touched, resetForm }) => (
						<Form>
							<Grid container spacing={4} mt={'10px'}>
								{fields.map((field) => (
									<Grid item xs={6} key={field.name}>
										{field.type === 'select' ? (
											<FormControl fullWidth size="medium">
												<InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
												<Field name={field.name} labelId={`${field.name}-label`} as={Select}>
													{field.options?.map((option) => (
														<MenuItem key={option.value} value={option.value}>
															{option.label}
														</MenuItem>
													))}
												</Field>
											</FormControl>
										) : (
											<Field
												as={TextField}
												name={field.name}
												label={field.label}
												fullWidth
												size="medium"
												type={field.type || 'text'}
												helperText={touched[field.name] && errors[field.name]}
												error={touched[field.name] && !!errors[field.name]}
												InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
											/>
										)}
									</Grid>
								))}
							</Grid>
							<DialogActions>
								{actions.map((action, index) => (
									<Button
										key={index}
										onClick={action.onClick}
										// @ts-ignore
										color={action.color || 'default'}
										variant={action.variant || 'text'}
										sx={action.sx}
										type={action.type}
										endIcon={action.icon}
									>
										{action.label}
									</Button>
								))}
							</DialogActions>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
