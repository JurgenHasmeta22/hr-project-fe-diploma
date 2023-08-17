import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Chip,
	Divider,
	Grid,
	Tab,
	Tabs,
	Typography
} from '@mui/material';
import { useRef, useState } from 'react';
import TabPanel from '~/components/tabPanel';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useDrawer } from '~/components/drawer/drawerContext';

interface CardInfo {
	title: string;
	description: string;
	imageUrl: string;
	date: string;
	tags: string[];
}

const cardData: CardInfo[] = [
	{
		title: 'Sample Card 1',
		description: 'Detailed description of card 1.',
		imageUrl: 'https://via.placeholder.com/150',
		date: 'July 15, 2023',
		tags: ['Design', 'UI/UX']
	},
	{
		title: 'Sample Card 2',
		description: 'Detailed description of card 2.',
		imageUrl: 'https://via.placeholder.com/150',
		date: 'August 10, 2023',
		tags: ['Development', 'React']
	}
	// ... add more cards as needed
];

const userSchema = Yup.object().shape({
	userName: Yup.string().required('required'),
	userFirstname: Yup.string().required('required'),
	userLastname: Yup.string().required('required'),
	userEmail: Yup.string().required('required'),
	balancaLeje: Yup.string().required('required'),
	userIsActive: Yup.string().required('required'),
	password: Yup.string().required('required')
});

export default function Profile() {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();
	// const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});
	const formikRef = useRef<FormikProps<any>>(null);
	const { openDrawer } = useDrawer();

	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	};
	const handleEditAvatar = () => {
		console.log('Edit Avatar clicked');
	};

	const handleDataChange = (values: any) => {
		setFormData(values); // Update the parent's state with form data
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
					disabled: true,
					sx: { gridColumn: 'span 2' }
				},
				{
					name: 'userIsActive',
					label: 'Statusi',
					variant: 'filled',
					type: 'text',
					disabled: true,
					sx: { gridColumn: 'span 2' }
				},
				{
					name: 'password',
					label: 'Passwordi',
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
					<Avatar
						src={'../../../assets/images/user.png'}
						alt={`Jurgen Profile Picture`}
						sx={{ width: 100, height: 100 }}
					/>
					<Box flexGrow={1}>
						<Typography variant="h5" gutterBottom>
							{'jurgen22'}
						</Typography>
						<Box display="flex" alignItems="center" gap={2}>
							<Typography variant="body1" color="textSecondary">
								Certifikatat: {2}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								Punet e meparshme: {2}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								Edukimi: {2}
							</Typography>
						</Box>
					</Box>
					<Box flexGrow={2}>
						<Typography variant="body1">{'bio'}</Typography>
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
					{/* <Tab label="Projektet" /> */}
					<Tab label="Pervoja e punes" style={{ backgroundColor: '#ff8888' }} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<Box>
						<Button variant="contained" startIcon={<AddOutlinedIcon />} color="error">
							Shto
						</Button>
					</Box>
					<Grid container spacing={4} mt={'5px'}>
						{cardData.map((card, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card elevation={4}>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											{card.title}
										</Typography>
										<Typography variant="body2" color="textSecondary" gutterBottom>
											{card.description}
										</Typography>
										<Typography variant="caption" color="textSecondary">
											{card.date}
										</Typography>
										<Box mt={2}>
											{card.tags.map((tag) => (
												<Chip
													label={tag}
													variant="outlined"
													size="small"
													sx={{ mr: 1, mt: 1 }}
													key={tag}
												/>
											))}
										</Box>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary">
											Learn More
										</Button>
										<Button variant="contained" startIcon={<EditIcon />} color="secondary">
											Edito
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Box>
						<Button variant="contained" startIcon={<AddOutlinedIcon />} color="error">
							Shto
						</Button>
					</Box>
					<Grid container spacing={4} mt={'5px'}>
						{cardData.map((card, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card elevation={4}>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											{card.title}
										</Typography>
										<Typography variant="body2" color="textSecondary" gutterBottom>
											{card.description}
										</Typography>
										<Typography variant="caption" color="textSecondary">
											{card.date}
										</Typography>
										<Box mt={2}>
											{card.tags.map((tag) => (
												<Chip
													label={tag}
													variant="outlined"
													size="small"
													sx={{ mr: 1, mt: 1 }}
													key={tag}
												/>
											))}
										</Box>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary">
											Learn More
										</Button>
										<Button variant="contained" startIcon={<EditIcon />} color="secondary">
											Edito
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Box>
						<Button variant="contained" startIcon={<AddOutlinedIcon />} color="error">
							Shto
						</Button>
					</Box>
					<Grid container spacing={4} mt={'5px'}>
						{cardData.map((card, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card elevation={4}>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											{card.title}
										</Typography>
										<Typography variant="body2" color="textSecondary" gutterBottom>
											{card.description}
										</Typography>
										<Typography variant="caption" color="textSecondary">
											{card.date}
										</Typography>
										<Box mt={2}>
											{card.tags.map((tag) => (
												<Chip
													label={tag}
													variant="outlined"
													size="small"
													sx={{ mr: 1, mt: 1 }}
													key={tag}
												/>
											))}
										</Box>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary">
											Learn More
										</Button>
										<Button variant="contained" startIcon={<EditIcon />} color="secondary">
											Edito
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
