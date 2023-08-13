import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Divider,
	Grid,
	IconButton,
	Tab,
	Tabs,
	Typography
} from '@mui/material';
import { useState } from 'react';
import TabPanel from '~/components/tabPanel';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

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

export default function Profile() {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();

	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	};
	const handleEditAvatar = () => {
		console.log('Edit Avatar clicked');
	};

	return (
		<>
			<Box padding={3}>
				<Box display="flex" alignItems="center" gap={3}>
					<Button
						color="secondary"
						variant="contained"
						onClick={() => {
							navigate('/admin/dashboard');
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
					<Button variant="contained" startIcon={<EditIcon />} color="secondary">
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
