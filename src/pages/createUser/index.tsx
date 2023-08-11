import { Box, Button, TextField, useMediaQuery } from '@mui/material';
import Header from '~/components/dashboard/Header';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import authenticationController from '~/services/authentication';
// import FormAdvanced from '~/components/form';
import { Formik, FormikProps } from 'formik';
import { useState, useRef } from 'react';
import SaveAsIcon from '@mui/icons-material/SaveAs';

const checkoutSchema = yup.object().shape({
	emriProjekt: yup.string().required('required'),
	pershkrimProjekt: yup.string().required('required')
});

const CreateUser = () => {
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const [formData, setFormData] = useState({});
	// const formikRef = useRef<FormikProps<any>>(null);

	// const handleDataChange = (values: any) => {
	// 	setFormData(values); // Update the parent's state with form data
	// };

	// const handleResetFromParent = () => {
	// 	formikRef.current?.resetForm();
	// };

	const handleFormSubmit = async (values: any) => {
		const payload = {
			userId: values.userId,
			userName: values.userName,
			userFirstname: values.userFirstname,
			userLastname: values.userLastname,
			userEmail: values.userEmail,
			balancaLeje: values.balancaLeje,
			userIsActive: values.userIsActive,
			password: values.password
		};
		const response = await authenticationController.onRegister(payload);

		if (response) {
			toast.success('Ruajtja e ndryshimeve me sukses !');
			navigate('/admin/users');
		} else {
			toast.error('Rujtja nuk e realizua !');
		}
	};

	return (
		<Box m="20px">
			<Header title="Shto nje perdorues" subtitle="Krijo nje perdorues te ri" />
			{/* <FormAdvanced
				initialValues={{
					userId: '',
					userName: '',
					userFirstname: '',
					userLastname: '',
					userEmail: '',
					balancaLeje: '',
					userIsActive: '',
					password: ''
				}}
				onSubmit={handleFormSubmit}
				validationSchema={checkoutSchema}
				// onFormChange={(values, formikHelpers) => {
				// 	// Any additional logic on form change if necessary
				// }}
				// formRef={formikRef}
				// onDataChange={(values: any) => {
				// 	handleDataChange(values);
				// }}
			/> */}
			<Formik
				onSubmit={handleFormSubmit}
				initialValues={{
					userId: '',
					userName: '',
					userFirstname: '',
					userLastname: '',
					userEmail: '',
					balancaLeje: '',
					userIsActive: '',
					password: ''
				}}
				validationSchema={checkoutSchema}
				enableReinitialize
			>
				{({ values, errors, touched, handleBlur, handleChange, handleSubmit }: any) => (
					<form onSubmit={handleSubmit}>
						<Box
							display="grid"
							gap="30px"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							sx={{
								'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
							}}
						>
							<TextField
								fullWidth
								disabled={true}
								variant="filled"
								type="text"
								label="Id e perdoruesit"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.userId}
								name="userId"
								error={!!touched.userId && !!errors.userId}
								helperText={touched.userId && errors.userId}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Username"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.userName}
								name="userName"
								error={!!touched.userName && !!errors.userName}
								helperText={touched.userName && errors.userName}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Emri i perdoruesit"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.userFirstname}
								name="userFirstname"
								error={!!touched.userFirstname && !!errors.userFirstname}
								helperText={touched.userFirstname && errors.userFirstname}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Mbiemri i perdoruesit"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.userLastname}
								name="userLastname"
								error={!!touched.userLastname && !!errors.userLastname}
								helperText={touched.userLastname && errors.userLastname}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Emaili i perdoruesit"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.userEmail}
								name="userEmail"
								error={!!touched.userEmail && !!errors.userEmail}
								helperText={touched.userEmail && errors.userEmail}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Balanca e lejeve te perdoruesit"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.balancaLeje}
								name="balancaLeje"
								error={!!touched.balancaLeje && !!errors.balancaLeje}
								helperText={touched.balancaLeje && errors.balancaLeje}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Statusi i perdoruesit"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.userIsActive}
								name="userIsActive"
								error={!!touched.userIsActive && !!errors.userIsActive}
								helperText={touched.userIsActive && errors.userIsActive}
								sx={{ gridColumn: 'span 2' }}
							/>
						</Box>
						<Box display="flex" justifyContent="end" mt="50px">
							<Button
								type="submit"
								color="secondary"
								variant="contained"
								sx={{
									border: '1px solid #000',
									bgcolor: '#30969f',
									fontSize: '15px',
									fontWeight: '700'
								}}
							>
								Ruaj ndryshimet
								<SaveAsIcon sx={{ ml: '10px' }} color="action" />
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default CreateUser;
