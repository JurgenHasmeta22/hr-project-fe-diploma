import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { tokens, ColorModeContext } from '~/utils/theme';

const Topbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);

	return (
		<Box display="flex" justifyContent="space-between" p={2}>
			<Box
				display="flex"
				// @ts-ignore
				backgroundColor={colors.primary[400]}
				borderRadius="3px"
			></Box>
			<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
				</IconButton>
				<IconButton>
					<SettingsOutlinedIcon />
				</IconButton>
				<IconButton>
					<PersonOutlinedIcon />
				</IconButton>
			</Box>
		</Box>
	);
};

export default Topbar;
