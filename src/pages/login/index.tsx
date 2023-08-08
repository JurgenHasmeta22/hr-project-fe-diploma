import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Formik } from 'formik';
import * as yup from 'yup';
import authenticationController from '~/services/authentication';
import ILoginReq from '~/interfaces/ILoginReq';

const initialValues = {
	userName: '',
	password: ''
};

const loginSchema = yup.object().shape({
	userName: yup.string().required('required'),
	password: yup.string().required('required')
});

export default function Login() {
	const handleFormSubmit = async (values: any) => {
		const payload: ILoginReq = {
			userName: values.userName,
			password: values.password
		};
		const response = await authenticationController.onLogin(payload);
		console.log(response);
	};

	return (
		<Container component="div" maxWidth="sm">
			<Box
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					px: 4,
					py: 6,
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					background: '#90ee90'
				}}
			>
				<Typography component="h1" variant="h1">
					Sign in
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
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me ?"
							></FormControlLabel>
							<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link
										href="/forgotPassword"
										variant="body1"
										underline="none"
										sx={{ color: '#fff' }}
									>
										Forgot password ?
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
