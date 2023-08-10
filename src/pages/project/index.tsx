import { Box, Button, TextField, useMediaQuery } from '@mui/material';
import Header from '~/components/dashboard/Header';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import IProject from '~/interfaces/IProject';
import projectsController from '~/services/projects';
import { Formik } from 'formik';
import * as yup from 'yup';

const checkoutSchema = yup.object().shape({
	emriProjekt: yup.string().required('required'),
	pershkrimProjekt: yup.string().required('required')
});

const Project = () => {
	const [project, setProject] = useState<IProject | null>(null);
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
		// if (response) {
		// 	getProject();
		// }
	};

	async function getProject(): Promise<void> {
		const response: IProject = await projectsController.getProject(location.state?.projectId!);
		setProject(response);
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
								variant="filled"
								type="text"
								label="Emri i projektit"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.emriProjekt}
								// defaultValue={project?.emriProjekt}
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
								// defaultValue={project?.pershkrimProjekt}
								name="pershkrimProjekt"
								error={!!touched.pershkrimProjekt && !!errors.pershkrimProjekt}
								helperText={touched.pershkrimProjekt && errors.pershkrimProjekt}
								sx={{ gridColumn: 'span 2' }}
							/>
						</Box>
						<Box display="flex" justifyContent="end" mt="250px">
							<Button type="submit" color="secondary" variant="contained">
								Edito projektin
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default Project;
