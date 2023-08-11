import { Box, useMediaQuery } from '@mui/material';
import Header from '~/components/dashboard/Header';
import { useNavigate } from 'react-router';
import projectsController from '~/services/projects';
import { FormikProps } from 'formik';
import * as yup from 'yup';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { toast } from 'react-toastify';
import FormAdvanced from '~/components/form';
import { useState, useRef } from 'react';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const projectSchema = yup.object().shape({
	emriProjekt: yup.string().required('required'),
	pershkrimProjekt: yup.string().required('required')
});

const CreateProject = () => {
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
			emriProjekt: values.emriProjekt,
			pershkrimProjekt: values.pershkrimProjekt
		};
		const response = await projectsController.addProject(payload);

		if (response) {
			toast.success('Ruajtja e ndryshimeve me sukses !');
			navigate('/admin/projects');
		} else {
			toast.error('Rujtja nuk e realizua !');
		}
	};

	return (
		<Box m="20px">
			<Header title="Shto perdorues" subtitle="Krijo nje perdorues te ri" />
			<FormAdvanced
				initialValues={{
					userId: '',
					emriProjekt: '',
					pershkrimProjekt: ''
				}}
				fields={[
					{
						name: 'projektId',
						label: 'Id',
						disabled: true,
						variant: 'filled',
						type: 'text',
						sx: { gridColumn: 'span 2' }
					},
					{
						name: 'emriProjekt',
						label: 'Emri',
						variant: 'filled',
						type: 'text',
						sx: { gridColumn: 'span 2' }
					},
					{
						name: 'pershkrimProjekt',
						label: 'Pershkrim',
						variant: 'filled',
						type: 'text',
						sx: { gridColumn: 'span 2' }
					}
				]}
				onDataChange={(values: any) => {
					handleDataChange(values);
				}}
				onSubmit={handleFormSubmit}
				validationSchema={projectSchema}
				formRef={formikRef}
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
			/>
		</Box>
	);
};

export default CreateProject;
