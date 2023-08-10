import { Box, Button, TextField, useMediaQuery } from '@mui/material';
import Header from '~/components/dashboard/Header';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import IProject from '~/interfaces/IProject';
import projectsController from '~/services/projects';
import { Formik } from 'formik';
import * as yup from 'yup';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { toast } from 'react-toastify';

const checkoutSchema = yup.object().shape({
	emriProjekt: yup.string().required('required'),
	pershkrimProjekt: yup.string().required('required')
});

const Project = () => {
	const [project, setProject] = useState<IProject | null>(null);
	const [projektId, setProjektId] = useState<string | undefined>('');
	const [emriProjekt, setEmriProjekt] = useState<string>('');
	const [pershkrimProjekt, setPershkrimProjekt] = useState<string>('');
	const navigate = useNavigate();
	const location = useLocation();
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const handleFormSubmit = async (values: any) => {
		const payload = {
			emriProjekt: values.emriProjekt,
			pershkrimProjekt: values.pershkrimProjekt
		};
		const response = await projectsController.updateProject(project?.projektId, payload);

		if (response === '') {
			toast.success('Ruajtja e ndryshimeve me sukses !');
			getProject();
		} else {
			toast.error('Rujtja nuk e realizua !');
		}
	};

	async function getProject(): Promise<void> {
		const response: IProject = await projectsController.getProject(location.state?.projectId!);
		setProject(response);
		setProjektId(response.projektId);
		setEmriProjekt(response.emriProjekt);
		setPershkrimProjekt(response.pershkrimProjekt);
	}

	useEffect(() => {
		getProject();
	}, []);

	return (
		<Box m="20px">
			<Header title="Detajet e projektit" subtitle="Vizualizo dhe edito projektin" />
			<Formik
				onSubmit={handleFormSubmit}
				initialValues={{
					projektId,
					emriProjekt,
					pershkrimProjekt
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
								label="Id e projektit"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.projektId}
								name="projektId"
								error={!!touched.projektId && !!errors.projektId}
								helperText={touched.projektId && errors.projektId}
								sx={{ gridColumn: 'span 2' }}
							/>
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
						<Box display="flex" justifyContent="end" mt="200px" gap="30px">
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
							<Button
								color="secondary"
								variant="contained"
								sx={{
									border: '1px solid #000',
									bgcolor: '#ff5252',
									fontSize: '15px',
									fontWeight: '700'
								}}
								onClick={async () => {
									const response = await projectsController.deleteProject(project?.projektId);

									if (response === '') {
										toast.success('Eleminimi me sukses !');
										navigate('/admin/projects');
									} else {
										toast.error('Eleminimi nuk u realizua !');
									}
								}}
							>
								Elemino
								<ClearOutlinedIcon color="action" sx={{ ml: '10px' }} />
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default Project;
