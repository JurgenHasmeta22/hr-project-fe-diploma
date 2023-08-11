import React, { useEffect } from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { Formik, FormikProps, Form, Field } from 'formik';
import * as yup from 'yup';

type FieldOption = {
	label: string;
	value: string;
};

type FieldConfig = {
	name: string;
	label: string;
	type: 'text' | 'select' | 'multiselect' | 'date';
	options?: FieldOption[];
	disabled?: boolean;
	span?: number;
	helperText?: React.ReactNode;
	error?: boolean | undefined;
	variant?: 'filled' | undefined;
	sx?: any;
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
};

type FormProps = {
	initialValues: any;
	onDataChange: (values: any) => void;
	onSubmit: (values: any) => void;
	validationSchema: yup.ObjectSchema<any>;
	onFormChange?: (values: any, formikHelpers: any) => void;
	resetTrigger?: boolean;
	fields: FieldConfig[];
	formRef: React.RefObject<FormikProps<any>>;
	actions?: ActionConfig[];
};

type ActionConfig = {
	label: string;
	onClick: () => void;
	type?: string;
	// color?: any;
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

const FormAdvanced: React.FC<FormProps> = ({
	initialValues,
	onSubmit,
	validationSchema,
	fields,
	onDataChange,
	formRef,
	actions
}) => {
	return (
		<Formik
			innerRef={formRef}
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
				useEffect(() => {
					onDataChange(values);
				}, [values]);
				return (
					<Form onSubmit={handleSubmit}>
						<Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
							{fields.map((field: FieldConfig) => {
								switch (field.type) {
									case 'select':
										return (
											<FormControl fullWidth size="medium">
												<InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
												<Field
													name={field.name}
													fullWidth
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.name}
													labelId={`${field.name}-label`}
													as={Select}
													sx={field.sx}
													variant={field.variant}
												>
													{field.options?.map((option) => (
														<MenuItem key={option.value} value={option.value}>
															{option.label}
														</MenuItem>
													))}
												</Field>
											</FormControl>
										);
									case 'multiselect':
										return (
											<FormControl fullWidth size="medium">
												<InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
												<Field
													name={field.name}
													fullWidth
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.name}
													labelId={`${field.name}-label`}
													as={Select}
													multiple
													sx={field.sx}
													variant={field.variant}
												>
													{field.options?.map((option) => (
														<MenuItem key={option.value} value={option.value}>
															{option.label}
														</MenuItem>
													))}
												</Field>
											</FormControl>
										);
									case 'date':
										return (
											<Field
												as={TextField}
												name={field.name}
												label={field.label}
												fullWidth
												size="medium"
												variant={field.variant}
												onBlur={handleBlur}
												onChange={handleChange}
												sx={field.sx}
												value={values.name}
												type={field.type || 'text'}
												helperText={touched[field.name] && errors[field.name]}
												error={touched[field.name] && !!errors[field.name]}
												InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
											/>
										);
									default:
										return (
											<Field
												as={TextField}
												name={field.name}
												label={field.label}
												fullWidth
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.name}
												variant={field.variant}
												size="medium"
												sx={field.sx}
												type={field.type || 'text'}
												helperText={touched[field.name] && errors[field.name]}
												error={touched[field.name] && !!errors[field.name]}
											/>
										);
								}
							})}
						</Box>
						<Box display="flex" justifyContent="end" mt="50px" gap="30px">
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
	);
};

export default FormAdvanced;