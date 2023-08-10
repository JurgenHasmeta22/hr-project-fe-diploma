import { Box, Button, TextField, useMediaQuery } from '@mui/material';
import Header from '~/components/dashboard/Header';
import { useNavigate } from 'react-router';
import projectsController from '~/services/projects';
import { Formik } from 'formik';
import * as yup from 'yup';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { toast } from 'react-toastify';

const checkoutSchema = yup.object().shape({
	emriProjekt: yup.string().required('required'),
	pershkrimProjekt: yup.string().required('required')
});

const CreateProject = () => {
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const handleFormSubmit = async (values: any) => {
		const payload = {
			emriProjekt: values.emriProjekt,
			pershkrimProjekt: values.pershkrimProjekt
		};
		const response = await projectsController.addProject(payload);

		if (response) {
			toast.success('Ruajtja e ndryshimeve me sukses !');
            navigate("/admin/projects")
		} else {
			toast.error('Rujtja nuk e realizua !');
		}
	};

	return (
		<Box m="20px">
			<Header title="Shto perdorues" subtitle="Krijo nje perdorues te ri" />
			<Formik
				onSubmit={handleFormSubmit}
				initialValues={{
					emriProjekt: '',
					pershkrimProjekt: ''
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
								variant="filled"
								type="text"
								label="Emri i projektit"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.emriProjekt}
								name="emriProjekt"
								error={!!touched.emriProjekt && !!errors.emriProjekt}
								helperText={touched.emriProjekt && errors.emriProjekt}
								sx={{ gridColumn: 'span 2' }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Pershkrimi i projektit"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.pershkrimProjekt}
								name="pershkrimProjekt"
								error={!!touched.pershkrimProjekt && !!errors.pershkrimProjekt}
								helperText={touched.pershkrimProjekt && errors.pershkrimProjekt}
								sx={{ gridColumn: 'span 2' }}
							/>
						</Box>
						<Box display="flex" justifyContent="end" mt="50px" gap="30px">
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

export default CreateProject;
