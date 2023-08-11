import React, { useEffect } from 'react';
import { Box, TextField, Select, MenuItem } from '@mui/material';
import { Field, Formik, FormikProps, Form } from 'formik';
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
};

const fields: FieldConfig[] = [];

type FormProps = {
	initialValues: any;
	onSubmit: (values: any) => void;
	validationSchema: yup.ObjectSchema<any>;
	onFormChange?: (values: any, formikHelpers: any) => void;
	resetTrigger?: boolean;
	// formRef?: React.Ref<FormikProps<any>>;
};

const FormAdvanced: React.FC<FormProps> = ({
	initialValues,
	onSubmit,
	validationSchema,
	onFormChange,
	resetTrigger
	// formRef
}) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			// enableReinitialize
			// innerRef={formRef}
		>
			{({ values, errors, touched, handleBlur, handleChange, handleSubmit }: FormikProps<any>) => {
				// if (onFormChange) {
				// 	onFormChange(values, { values, errors, touched, handleBlur, handleChange, handleSubmit });
				// }

				// useEffect(() => {
				//     onDataChange(values);
				// }, [values]);

				const commonProps = (field: FieldConfig) => ({
					name: field.name,
					label: field.label,
					fullWidth: true,
					onBlur: handleBlur,
					onChange: handleChange,
					value: values[field.name],
					error: !!touched[field.name] && !!errors[field.name],
					helperText: touched[field.name] && errors[field.name],
					sx: { gridColumn: field.span ? `span ${field.span}` : undefined },
					disabled: field.disabled
				});

				return (
					<Form onSubmit={handleSubmit}>
						<Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
							{fields.map((field) => {
								switch (field.type) {
									case 'select':
										return (
											<Select key={field.name} {...commonProps(field)}>
												{field.options?.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
												))}
											</Select>
										);
									case 'multiselect':
										return (
											<Select key={field.name} multiple {...commonProps(field)}>
												{field.options?.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
												))}
											</Select>
										);
									case 'date':
										return (
											<Field
												as={TextField}
												key={field.name}
												type="date"
												InputLabelProps={{ shrink: true }}
												{...commonProps(field)}
											/>
										);
									default:
										return (
											<Field
												as={TextField}
												key={field.name}
												variant="filled"
												{...commonProps(field)}
											/>
										);
								}
							})}
						</Box>
					</Form>
				);
			}}
		</Formik>
	);
};

export default FormAdvanced;
