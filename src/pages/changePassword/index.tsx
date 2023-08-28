import React from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
	currentPassword: yup.string().required('Current password is required'),
	newPassword: yup
		.string()
		.required('New password is required')
		.min(8, 'Password should be minimum 8 characters'),
	confirmNewPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], 'Passwords do not match')
		.required('Confirm password is required')
});

const ChangePassword: React.FC = () => {
	const initialValues = {
		currentPassword: '',
		newPassword: '',
		confirmNewPassword: ''
	};

	const handleFormSubmit = (values: typeof initialValues) => {
		console.log(values);
	};

	return (
		<Container
			component="main"
			maxWidth="xs"
			style={{ display: 'flex', alignItems: 'center', height: '100vh' }}
		>
			<Box
				width={400}
				mx="auto"
				p={4}
				borderRadius={3}
				bgcolor="background.paper"
				sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
				boxShadow="0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19)"
			>
				<Typography variant="h5" gutterBottom align="center">
					Ndrysho passwordin
				</Typography>
				<Formik
					initialValues={initialValues}
					onSubmit={handleFormSubmit}
					validationSchema={validationSchema}
				>
					{({ errors, touched, isValid }) => (
						<Form>
							<Box mb={2}>
								<Field
									name="currentPassword"
									as={TextField}
									fullWidth
									label="Passwordi aktual"
									type="password"
									error={touched.currentPassword && !!errors.currentPassword}
									helperText={touched.currentPassword && errors.currentPassword}
									sx={{
										'& .MuiInputLabel-outlined': {
											color: '#fff'
										},
										'& .MuiInputLabel-outlined.Mui-focused': {
											color: '#fff'
										}
									}}
								/>
							</Box>
							<Box mb={2}>
								<Field
									name="newPassword"
									as={TextField}
									fullWidth
									label="Passwordi i ri"
									type="password"
									error={touched.newPassword && !!errors.newPassword}
									helperText={touched.newPassword && errors.newPassword}
									sx={{
										'& .MuiInputLabel-outlined': {
											color: '#fff'
										},
										'& .MuiInputLabel-outlined.Mui-focused': {
											color: '#fff'
										}
									}}
								/>
							</Box>
							<Box mb={2}>
								<Field
									name="confirmNewPassword"
									as={TextField}
									fullWidth
									label="Konfirmo passwordin"
									type="password"
									error={touched.confirmNewPassword && !!errors.confirmNewPassword}
									helperText={touched.confirmNewPassword && errors.confirmNewPassword}
									sx={{
										'& .MuiInputLabel-outlined': {
											color: '#fff'
										},
										'& .MuiInputLabel-outlined.Mui-focused': {
											color: '#fff'
										}
									}}
								/>
							</Box>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								disabled={!isValid}
								fullWidth
							>
								Ndrysho passwordin
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
		</Container>
	);
};

export default ChangePassword;
