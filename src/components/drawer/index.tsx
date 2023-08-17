import React, { useEffect } from 'react';
import {
	Button,
	IconButton,
	Grid,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Drawer,
	Box,
	Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, FormikProps } from 'formik';

type FieldConfig = {
	name: string;
	label: string;
	type?: string;
	options?: Array<{ label: string; value: any }>;
	variant?: any;
	disabled?: boolean;
	sx: {
		gridColumn: string;
	}
};

type DrawerProps = {
	onClose: () => void;
	initialValues: any;
	fields: FieldConfig[];
	validationSchema: any;
	onSave: (values: any) => void;
	title: string;
	actions?: ActionConfig[];
	formRef?: React.Ref<FormikProps<any>>;
	onDataChange: (values: any) => void;
	subTitle?: string;
};

type ActionConfig = {
	label: string;
	onClick: () => void;
	type?: string;
	color?:
		| 'inherit'
		| 'primary'
		| 'secondary'
		| 'success'
		| 'error'
		| 'info'
		| 'warning'
		| 'default';
	variant?: 'text' | 'outlined' | 'contained';
	icon?: React.ReactNode;
	sx?: any;
};

const RightPanel: React.FC<DrawerProps> = ({
	onClose,
	initialValues,
	fields,
	validationSchema,
	onSave,
	title,
	actions,
	formRef,
	onDataChange,
	subTitle
}) => {
	return (
		<Drawer anchor="right" open={true} onClose={onClose}>
			<Box sx={{ width: 600, p: 3 }}>
				<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h6">{title}</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon color="action" />
					</IconButton>
				</Box>
				{subTitle && (
					<Typography variant="subtitle1" color="textSecondary" mb={3}>
						{subTitle}
					</Typography>
				)}
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						onSave(values);
						onClose();
					}}
					innerRef={formRef}
				>
					{({ errors, touched, values }) => {
						useEffect(() => {
							onDataChange(values);
						}, [values]);

						return (
							<Form>
								<Grid container spacing={2}>
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
								<Box mt={3} display={'flex'} gap={'10px'} justifyContent={'end'}>
									{actions!.map((action, index) => (
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
								</Box>
							</Form>
						);
					}}
				</Formik>
			</Box>
		</Drawer>
	);
};

export default RightPanel;
