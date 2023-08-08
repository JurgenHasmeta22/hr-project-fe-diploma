import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import { tokens } from '~/utils/theme';
import StatBox from '~/components/dashboard/StatBox';
import ProgressCircle from '~/components/dashboard/ProgressCircle';
import BarChart from '~/components/dashboard/BarChart';
import Header from '~/components/dashboard/Header';

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box m="20px">
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Header title="Dashboard" subtitle="Welcome to your dashboard" />
				<Box>
					<Button
						sx={{
							backgroundColor: colors.blueAccent[700],
							color: colors.grey[100],
							fontSize: '14px',
							fontWeight: 'bold',
							padding: '10px 20px'
						}}
					>
						<DownloadOutlinedIcon sx={{ mr: '10px' }} />
						Download Reports
					</Button>
				</Box>
			</Box>
			<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
				<Box
					sx={{ backgroundColor: colors.primary[400] }}
					gridColumn="span 3"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title="12,361"
						subtitle="Emails Sent"
						progress="0.75"
						increase="+14%"
						icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					sx={{ backgroundColor: colors.primary[400] }}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title="431,225"
						subtitle="Sales Obtained"
						progress="0.50"
						increase="+21%"
						icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					sx={{ backgroundColor: colors.primary[400] }}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title="32,441"
						subtitle="New Clients"
						progress="0.30"
						increase="+5%"
						icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					sx={{ backgroundColor: colors.primary[400] }}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title="1,325,134"
						subtitle="Traffic Received"
						progress="0.80"
						increase="+43%"
						icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
					/>
				</Box>
				<Box gridColumn="span 8" gridRow="span 2" sx={{ backgroundColor: colors.primary[400] }}>
					<Box
						mt="25px"
						p="0 30px"
						display="flex "
						justifyContent="space-between"
						alignItems="center"
					>
						<Box>
							<Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
								Revenue Generated
							</Typography>
							<Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
								$59,342.32
							</Typography>
						</Box>
						<Box>
							<IconButton>
								<DownloadOutlinedIcon sx={{ fontSize: '26px', color: colors.greenAccent[500] }} />
							</IconButton>
						</Box>
					</Box>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 2"
					sx={{ backgroundColor: colors.primary[400] }}
					p="30px"
				>
					<Typography variant="h5" fontWeight="600">
						Campaign
					</Typography>
					<Box display="flex" flexDirection="column" alignItems="center" mt="25px">
						<ProgressCircle size="125" />
						<Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: '15px' }}>
							$48,352 revenue generated
						</Typography>
						<Typography>Includes extra misc expenditures and costs</Typography>
					</Box>
				</Box>
				<Box gridColumn="span 4" gridRow="span 2" sx={{ backgroundColor: colors.primary[400] }}>
					<Typography variant="h5" fontWeight="600" sx={{ padding: '30px 30px 0 30px' }}>
						Sales Quantity
					</Typography>
					<Box height="250px" mt="-20px">
						<BarChart isDashboard={true} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
