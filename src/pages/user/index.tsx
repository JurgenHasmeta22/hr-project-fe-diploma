import { Box, Breadcrumbs, Button, TextField, Typography, useMediaQuery } from '@mui/material';
import Header from '~/components/dashboard/Header';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import usersController from '~/services/users';
import { Formik } from 'formik';
import * as yup from 'yup';
import IUser from '~/interfaces/IUser';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const checkoutSchema = yup.object().shape({
	emriProjekt: yup.string().required('required'),
	pershkrimProjekt: yup.string().required('required')
});

const User = () => {
	const [user, setUser] = useState<IUser | null>(null);
	const [userId, setUserId] = useState<number | undefined>(0);
	const [userName, setUserName] = useState<string>('');
	const [userFirstname, setUserFirstname] = useState<string>('');
	const [userLastname, setUserLastname] = useState<string>('');
	const [userEmail, setUserEmail] = useState<string>('');
	const [balancaLeje, setBalancaLeje] = useState<number>(0);
	const [userIsActive, setUserIsActive] = useState<number>(0);
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();
	const location = useLocation();
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const breadcrumbs = [
		<Link key="1" to={'/admin/users'} style={{ textDecoration: 'none' }}>
			{location.state?.from!}
		</Link>,
		<Typography key="2" color="text.primary">
			Detajet e perdoruesit
		</Typography>
	];

	const handleFormSubmit = async (values: any) => {
		const payload = {
			userName: values.userName,
			userFirstname: values.userFirstname,
			userLastname: values.userLastname,
			userEmail: values.userEmail,
			balancaLeje: values.balancaLeje,
			userIsActive: values.userIsActive,
			password: values.password
		};

		const response = await usersController.updateUser(user?.userId, payload);
		if (response === '') {
			getUser();
		}
	};

	async function getUser(): Promise<void> {
		const response: IUser = await usersController.getUser(location.state?.userId!);
		setUser(response);
		setUserId(response.userId!);
		setUserName(response.userName);
		setUserFirstname(response.userFirstname);
		setUserLastname(response.userLastname);
		setUserEmail(response.userEmail);
		setBalancaLeje(response.balancaLeje);
		setUserIsActive(response.userIsActive);
		setPassword(response.password!);
	}

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Box m="20px">
			<Box mb={'30px'} display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'20px'}>
				<Button
					color="secondary"
					variant="contained"
					onClick={() => {
						navigate('/admin/users');
					}}
				>
					<ArrowBackIcon color="action" />
				</Button>
				<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
					{breadcrumbs}
				</Breadcrumbs>
			</Box>
			<Header title="Detajet e perdoruesit" subtitle="Vizualizo dhe edito perdoruesin" />
			<Formik
				onSubmit={handleFormSubmit}
				initialValues={{
					userId,
					userName,
					userFirstname,
					userLastname,
					userEmail,
					balancaLeje,
					userIsActive,
					password
				}}
				validationSchema={checkoutSchema}
				enableReinitialize
				// onReset={}
			>
				{({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }: any) => (
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
						<Box display="flex" justifyContent="end" gap="30px">
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
									const response = await usersController.deleteUser(user?.userId);
									if (response === '') {
										navigate('/admin/users');
									}
								}}
							>
								Elemino
								<ClearOutlinedIcon color="action" sx={{ ml: '10px' }} />
							</Button>
							<Button
								onClick={() => {
									resetForm();
								}}
								type="reset"
								color="secondary"
								variant="contained"
								sx={{
									border: '1px solid #000',
									bgcolor: '#ff5252',
									fontSize: '15px',
									fontWeight: '700'
								}}
							>
								Anullo
								<ClearAllIcon color="action" sx={{ ml: '10px' }} />
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default User;
