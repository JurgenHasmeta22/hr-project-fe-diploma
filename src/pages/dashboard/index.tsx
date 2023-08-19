import { Box, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { tokens } from '~/utils/theme';
import StatBox from '~/components/dashboard/StatBox';
import Header from '~/components/dashboard/Header';

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box m="20px">
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Header title="Dashboard" subtitle="Miresevini ne dashboardin tuaj" />
			</Box>
			<Box display="grid" gridTemplateColumns="repeat(9, 1fr)" gridAutoRows="250px" gap="30px">
				<Box
					sx={{ backgroundColor: colors.primary[400] }}
					gridColumn="span 3"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title="7"
						subtitle="Nr i projekteve"
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
						title="37"
						subtitle="Nr i punonjeseve"
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
						title="27"
						subtitle="Nr i lejeve"
						progress="0.30"
						increase="+5%"
						icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
