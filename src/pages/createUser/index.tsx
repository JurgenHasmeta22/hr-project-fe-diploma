import { Box, useMediaQuery } from '@mui/material';
import Header from '~/components/dashboard/Header';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import authenticationController from '~/services/authentication';
import FormAdvanced from '~/components/form';
import { FormikProps } from 'formik';
import { useState, useRef } from 'react';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const userSchema = yup.object().shape({
	userName: yup.string().required('required'),
	userFirstname: yup.string().required('required'),
	userLastname: yup.string().required('required'),
	userEmail: yup.string().required('required'),
	balancaLeje: yup.string().required('required'),
	userIsActive: yup.string().required('required')
});

const CreateUser = () => {
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const [formData, setFormData] = useState({});
	const formikRef = useRef<FormikProps<any>>(null);
	const handleDataChange = (values: any) => {
		setFormData(values); // Update the parent's state with form data
	};

	const handleResetFromParent = () => {
		formikRef.current?.resetForm();
	};

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
			navigate('/users');
		} else {
			toast.error('Rujtja nuk e realizua !');
		}
	};

	return (
		<Box m="20px">
			<Header title="Shto nje perdorues" subtitle="Krijo nje perdorues te ri" />
			<FormAdvanced
				initialValues={{
					userId: '',
					userName: '',
					userFirstname: '',
					userLastname: '',
					userEmail: '',
					balancaLeje: '',
					userIsActive: ''
				}}
				fields={[
					{
						name: 'userId',
						label: 'Id e perdoruesit',
						disabled: true,
						variant: 'filled',
						type: 'text',
						sx: { gridColumn: 'span 2' }
					},
					{
						name: 'userName',
						label: 'Username',
						variant: 'filled',
						type: 'text',
						sx: { gridColumn: 'span 2' }
					},
					{
						name: 'userFirstname',
						label: 'Emri',
						variant: 'filled',
						type: 'text',
						sx: { gridColumn: 'span 2' }
					},
					{
						name: 'userLastname',
						label: 'Mbiemri',
						variant: 'filled',
						type: 'text',
						sx: { gridColumn: 'span 2' }
					},
					{
						name: 'userEmail',
						label: 'Email',
						variant: 'filled',
						type: 'text',
						sx: { gridColumn: 'span 2' }
					},
					{
						name: 'balancaLeje',
						label: 'Balanca e lejeve',
						variant: 'filled',
						type: 'text',
						sx: { gridColumn: 'span 2' }
					},
					{
						name: 'userIsActive',
						label: 'Statusi',
						variant: 'filled',
						type: 'text',
						sx: { gridColumn: 'span 2' }
					}
				]}
				actions={[
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
						icon: <SaveAsIcon sx={{ ml: '10px' }} color="action" />
					},
					{
						label: 'Anullo',
						type: 'reset',
						onClick: () => {
							handleResetFromParent();
						},
						color: 'secondary',
						variant: 'contained',
						sx: {
							border: '1px solid #000',
							bgcolor: '#ff5252',
							fontSize: '15px',
							fontWeight: '700'
						},
						icon: <ClearAllIcon color="action" sx={{ ml: '10px' }} />
					}
				]}
				onDataChange={(values: any) => {
					handleDataChange(values);
				}}
				onSubmit={handleFormSubmit}
				validationSchema={userSchema}
				formRef={formikRef}
			/>
		</Box>
	);
};

export default CreateUser;
