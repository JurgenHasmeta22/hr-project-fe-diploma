import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	Tab,
	Tabs,
	Typography
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import TabPanel from '~/components/tabPanel';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useDrawer } from '~/components/drawer/drawerContext';
import { useStore } from '~/store/zustand/store';
import usersController from '~/services/users';
import IUser from '~/interfaces/IUser';
import ICertification from '~/interfaces/ICertification';
import IEducation from '~/interfaces/IEducation';
import IProject from '~/interfaces/IProject';
import ISkill from '~/interfaces/ISkill';
import IWorkExperience from '~/interfaces/IWorkExperience';

const userSchema = Yup.object().shape({
	userName: Yup.string().required('required'),
	userFirstname: Yup.string().required('required'),
	userLastname: Yup.string().required('required'),
	userEmail: Yup.string().required('required')
});

const certificateSchema = Yup.object().shape({
	certEmri: Yup.string().required('required'),
	certPershkrim: Yup.string().required('required')
});

const skillSchema = Yup.object().shape({
	llojiAftesise: Yup.string().required('required')
});

const workSchema = Yup.object().shape({
	ppEmri: Yup.string().required('required')
});

const educationSchema = Yup.object().shape({
	eduName: Yup.string().required('required')
});

const projectSchema = Yup.object().shape({
	emriProjekt: Yup.string().required('required'),
	pershkrimProjekt: Yup.string().required('required')
});

export default function Profile() {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const formikRef = useRef<FormikProps<any>>(null);
	const { openDrawer } = useDrawer();
	const { user } = useStore();
	const [userProfile, setUserProfile] = useState<IUser | null>(null);
	const location = useLocation();

	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	};

	const handleDataChange = (values: any) => {
		setFormData(values);
	};

	const handleResetFromParent = () => {
		formikRef.current?.resetForm();
	};

	const handleEditProfile = () => {
		openDrawer({
			formRef: formikRef,
			initialValues: {
				userId: '',
				userName: '',
				userFirstname: '',
				userLastname: '',
				userEmail: '',
				balancaLeje: '',
				userIsActive: '',
				password: ''
			},
			fields: [
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
				}
			],
			validationSchema: userSchema,
			onSave: (values: any) => {
				console.log(values);
			},
			title: 'Edito perdoruesin',
			actions: [
				{
					label: 'Anullo',
					onClick: () => {
						handleResetFromParent();
					},
					type: 'reset',
					color: 'secondary',
					variant: 'contained',
					sx: {
						border: '1px solid #000',
						bgcolor: '#ff5252',
						fontSize: '15px',
						fontWeight: '700'
					},
					icon: <ClearAllIcon />
				},
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
					icon: <SaveAsIcon />
				}
			],
			onDataChange: (values: any) => {
				handleDataChange(values);
			},
			subTitle: 'Plotesoni detajet e perdoruesit'
		});
	};

	const handleCreateCertificate = () => {
		openDrawer({
			formRef: formikRef,
			initialValues: {
				certEmri: '',
				certPershkrim: ''
			},
			fields: [
				{
					name: 'certEmri',
					label: 'Emri',
					variant: 'filled',
					type: 'text',
					sx: { gridColumn: 'span 2' }
				},
				{
					name: 'certPershkrim',
					label: 'Pershkrimi',
					variant: 'filled',
					type: 'text',
					sx: { gridColumn: 'span 2' }
				}
			],
			validationSchema: certificateSchema,
			onSave: (values: any) => {
				console.log(values);
			},
			title: 'Shto certifikate',
			actions: [
				{
					label: 'Anullo',
					onClick: () => {
						handleResetFromParent();
					},
					type: 'reset',
					color: 'secondary',
					variant: 'contained',
					sx: {
						border: '1px solid #000',
						bgcolor: '#ff5252',
						fontSize: '15px',
						fontWeight: '700'
					},
					icon: <ClearAllIcon />
				},
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
					icon: <SaveAsIcon />
				}
			],
			onDataChange: (values: any) => {
				handleDataChange(values);
			}
			// subTitle: 'Plotesoni detajet e perdoruesit'
		});
	};

	const handleCreateSkill = () => {
		openDrawer({
			formRef: formikRef,
			initialValues: {
				llojiAftesise: ''
			},
			fields: [
				{
					name: 'llojiAftesise',
					label: 'Lloji i aftesise',
					variant: 'filled',
					type: 'text',
					sx: { gridColumn: 'span 2' }
				}
			],
			validationSchema: skillSchema,
			onSave: (values: any) => {
				console.log(values);
			},
			title: 'Shto Aftesi',
			actions: [
				{
					label: 'Anullo',
					onClick: () => {
						handleResetFromParent();
					},
					type: 'reset',
					color: 'secondary',
					variant: 'contained',
					sx: {
						border: '1px solid #000',
						bgcolor: '#ff5252',
						fontSize: '15px',
						fontWeight: '700'
					},
					icon: <ClearAllIcon />
				},
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
					icon: <SaveAsIcon />
				}
			],
			onDataChange: (values: any) => {
				handleDataChange(values);
			}
			// subTitle: 'Plotesoni detajet e perdoruesit'
		});
	};

	const handleCreateWork = () => {
		openDrawer({
			formRef: formikRef,
			initialValues: {
				ppEmri: ''
			},
			fields: [
				{
					name: 'ppEmri',
					label: 'Emri',
					variant: 'filled',
					type: 'text',
					sx: { gridColumn: 'span 2' }
				}
			],
			validationSchema: workSchema,
			onSave: (values: any) => {
				console.log(values);
			},
			title: 'Shto pune',
			actions: [
				{
					label: 'Anullo',
					onClick: () => {
						handleResetFromParent();
					},
					type: 'reset',
					color: 'secondary',
					variant: 'contained',
					sx: {
						border: '1px solid #000',
						bgcolor: '#ff5252',
						fontSize: '15px',
						fontWeight: '700'
					},
					icon: <ClearAllIcon />
				},
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
					icon: <SaveAsIcon />
				}
			],
			onDataChange: (values: any) => {
				handleDataChange(values);
			}
			// subTitle: 'Plotesoni detajet e perdoruesit'
		});
	};

	const handleCreateProject = () => {
		openDrawer({
			formRef: formikRef,
			initialValues: {
				emriProjekt: '',
				pershkrimProjekt: ''
			},
			fields: [
				{
					name: 'emriProjekt',
					label: 'Emri',
					variant: 'filled',
					type: 'text',
					sx: { gridColumn: 'span 2' }
				},
				{
					name: 'pershkrimProjekt',
					label: 'Pershkrimi',
					variant: 'filled',
					type: 'text',
					sx: { gridColumn: 'span 2' }
				}
			],
			validationSchema: projectSchema,
			onSave: (values: any) => {
				console.log(values);
			},
			title: 'Edito perdoruesin',
			actions: [
				{
					label: 'Anullo',
					onClick: () => {
						handleResetFromParent();
					},
					type: 'reset',
					color: 'secondary',
					variant: 'contained',
					sx: {
						border: '1px solid #000',
						bgcolor: '#ff5252',
						fontSize: '15px',
						fontWeight: '700'
					},
					icon: <ClearAllIcon />
				},
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
					icon: <SaveAsIcon />
				}
			],
			onDataChange: (values: any) => {
				handleDataChange(values);
			}
			// subTitle: 'Plotesoni detajet e perdoruesit'
		});
	};

	const handleCreateEducation = () => {
		openDrawer({
			formRef: formikRef,
			initialValues: {
				eduName: ''
			},
			fields: [
				{
					name: 'eduName',
					label: 'Emri',
					variant: 'filled',
					type: 'text',
					sx: { gridColumn: 'span 2' }
				}
			],
			validationSchema: userSchema,
			onSave: (values: any) => {
				console.log(values);
			},
			title: 'Shto edukimin',
			actions: [
				{
					label: 'Anullo',
					onClick: () => {
						handleResetFromParent();
					},
					type: 'reset',
					color: 'secondary',
					variant: 'contained',
					sx: {
						border: '1px solid #000',
						bgcolor: '#ff5252',
						fontSize: '15px',
						fontWeight: '700'
					},
					icon: <ClearAllIcon />
				},
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
					icon: <SaveAsIcon />
				}
			],
			onDataChange: (values: any) => {
				handleDataChange(values);
			}
			// subTitle: 'Plotesoni detajet e perdoruesit'
		});
	};

	useEffect(() => {
		if (location.state?.userId) {
			async function fetchUserDetails() {
				try {
					const user = await usersController.getUser(location.state?.userId);
					setUserProfile(user);
				} catch (error) {
					console.error('Failed to fetch user:', error);
				}
			}
			fetchUserDetails();
		}
	}, [location.state?.userId]);

	return (
		<>
			<Box padding={3}>
				<Box display="flex" alignItems="center" gap={3}>
					<Button
						color="secondary"
						variant="contained"
						onClick={() => {
							navigate('/dashboard');
						}}
					>
						<ArrowBackIcon color="action" />
					</Button>
					<Box flexGrow={1}>
						<Box display={'flex'} flexDirection={'row'} gap={'50px'}>
							<Typography variant="h5" gutterBottom>
								{userProfile?.userName}
							</Typography>
							<Box display={'flex'} flexDirection={'row'} gap={'5px'}>
								<Typography variant="h5" gutterBottom>
									{userProfile?.userFirstname}
								</Typography>
								<Typography variant="h5" gutterBottom>
									{userProfile?.userLastname}
								</Typography>
							</Box>
						</Box>
						<Box display="flex" alignItems="center" gap={3}>
							<Typography variant="body1" color="textSecondary">
								Certifikatat: {userProfile?.userCertifikates!.length}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								Punet e meparshme: {userProfile?.userPervojePunes!.length}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								Edukimi: {userProfile?.userEdukims!.length}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								Projektet: {userProfile?.userProjekts!.length}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								Aftesite: {userProfile?.userAftesis!.length}
							</Typography>
						</Box>
					</Box>
					<Button
						variant="contained"
						startIcon={<EditIcon />}
						color="secondary"
						onClick={() => {
							handleEditProfile();
						}}
					>
						Edito profilin
					</Button>
				</Box>
				<Divider sx={{ my: 2 }} />
			</Box>
			<Box>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					textColor="primary"
					// sx={{ borderRight: 3, borderColor: 'divider' }}
					orientation="horizontal"
				>
					<Tab label="Certifikatat" style={{ backgroundColor: '#ff8888' }} />
					<Tab label="Edukimet" style={{ backgroundColor: '#ff8888' }} />
					<Tab label="Projektet" style={{ backgroundColor: '#ff8888' }} />
					<Tab label="Aftesite" style={{ backgroundColor: '#ff8888' }} />
					<Tab label="Pervoja e punes" style={{ backgroundColor: '#ff8888' }} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<Box>
						<Button
							variant="contained"
							startIcon={<AddOutlinedIcon />}
							color="error"
							onClick={() => {
								handleCreateCertificate();
							}}
						>
							Shto
						</Button>
					</Box>
					<Grid container spacing={4} mt={'5px'}>
						{userProfile?.userCertifikates!.map((certificate: ICertification, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card elevation={4}>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											{certificate.certEmri}
										</Typography>
										<Typography variant="body2" color="textSecondary" gutterBottom>
											{certificate.certPershkrim}
										</Typography>
									</CardContent>
									<CardActions sx={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
										<Button variant="contained" startIcon={<EditIcon />} color="secondary">
											Edito
										</Button>
										<Button size="small" startIcon={<EditIcon />} color="error">
											Elemino
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Box>
						<Button
							variant="contained"
							startIcon={<AddOutlinedIcon />}
							color="error"
							onClick={() => {
								handleCreateEducation();
							}}
						>
							Shto
						</Button>
					</Box>
					<Grid container spacing={4} mt={'5px'}>
						{userProfile?.userEdukims!.map((education: IEducation, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card elevation={4}>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											{education.eduName}
										</Typography>
									</CardContent>
									<CardActions sx={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
										<Button variant="contained" startIcon={<EditIcon />} color="secondary">
											Edito
										</Button>
										<Button size="small" startIcon={<EditIcon />} color="error">
											Elemino
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Box>
						<Button
							variant="contained"
							startIcon={<AddOutlinedIcon />}
							color="error"
							onClick={() => {
								handleCreateProject();
							}}
						>
							Shto
						</Button>
					</Box>
					<Grid container spacing={4} mt={'5px'}>
						{userProfile?.userProjekts!.map((project: IProject, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card elevation={4}>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											{project.emriProjekt}
										</Typography>
										<Typography variant="body2" color="textSecondary" gutterBottom>
											{project.pershkrimProjekt}
										</Typography>
									</CardContent>
									<CardActions sx={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
										<Button variant="contained" startIcon={<EditIcon />} color="secondary">
											Edito
										</Button>
										<Button size="small" startIcon={<EditIcon />} color="error">
											Elemino
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<Box>
						<Button
							variant="contained"
							startIcon={<AddOutlinedIcon />}
							color="error"
							onClick={() => {
								handleCreateSkill();
							}}
						>
							Shto
						</Button>
					</Box>
					<Grid container spacing={4} mt={'5px'}>
						{userProfile?.userAftesis!.map((skill: ISkill, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card elevation={4}>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											{skill.llojiAftesise}
										</Typography>
									</CardContent>
									<CardActions sx={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
										<Button variant="contained" startIcon={<EditIcon />} color="secondary">
											Edito
										</Button>
										<Button size="small" startIcon={<EditIcon />} color="error">
											Elemino
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={4}>
					<Box>
						<Button
							variant="contained"
							startIcon={<AddOutlinedIcon />}
							color="error"
							onClick={() => {
								handleCreateWork();
							}}
						>
							Shto
						</Button>
					</Box>
					<Grid container spacing={4} mt={'5px'}>
						{userProfile?.userPervojePunes!.map((work: IWorkExperience, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card elevation={4}>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											{work.ppEmri}
										</Typography>
									</CardContent>
									<CardActions sx={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
										<Button variant="contained" startIcon={<EditIcon />} color="secondary">
											Edito
										</Button>
										<Button size="small" startIcon={<EditIcon />} color="error">
											Elemino
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</TabPanel>
			</Box>
		</>
	);
}
