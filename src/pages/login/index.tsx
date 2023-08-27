import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Formik } from 'formik';
import * as yup from 'yup';
import authenticationController from '~/services/authentication';
import ILoginReq from '~/interfaces/ILoginReq';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '~/store/zustand/store';

const initialValues = {
	userName: '',
	password: ''
};

const loginSchema = yup.object().shape({
	userName: yup.string().required('required'),
	password: yup.string().required('required')
});

export default function Login() {
	const navigate = useNavigate();
	const { setUser } = useStore();

	const handleFormSubmit = async (values: any) => {
		const payload: ILoginReq = {
			userName: values.userName,
			password: values.password
		};
		const response = await authenticationController.onLogin(payload);
		if (response) {
			setUser(response);
			navigate('/dashboard');
		}
	};

	return (
		<Container component="div" maxWidth="sm">
			<Box
				sx={{
					borderRadius: 2,
					px: 4,
					py: 6,
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					bgcolor: 'background.paper',
					boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19)'
				}}
			>
				<Typography component="h1" variant="h1">
					Logohu
				</Typography>
				<Formik
					onSubmit={handleFormSubmit}
					initialValues={initialValues}
					validationSchema={loginSchema}
				>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit }: any) => (
						<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								fullWidth
								margin="normal"
								label="Username"
								name="userName"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.userName}
								error={!!touched.userName && !!errors.userName}
								helperText={touched.userName && errors.userName}
								sx={{
									'& .MuiInputLabel-outlined': {
										color: '#fff'
									},
									'& .MuiInputLabel-outlined.Mui-focused': {
										color: '#fff'
									}
								}}
							/>
							<TextField
								fullWidth
								margin="normal"
								name="password"
								label="Password"
								type="password"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								error={!!touched.password && !!errors.password}
								helperText={touched.password && errors.password}
								sx={{
									'& .MuiInputLabel-outlined': {
										color: '#fff'
									},
									'& .MuiInputLabel-outlined.Mui-focused': {
										color: '#fff'
									}
								}}
							/>
							<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								Logohu
							</Button>
							<Grid container>
								<Grid item xs>
									<Link to="/changePassword" style={{ color: '#fff', textDecoration: 'none' }}>
										Ndrysho passwordin
									</Link>
								</Grid>
							</Grid>
						</Box>
					)}
				</Formik>
			</Box>
		</Container>
	);
}
