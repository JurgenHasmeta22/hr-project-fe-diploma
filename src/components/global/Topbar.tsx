import { Box, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { tokens, ColorModeContext } from '~/utils/theme';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		navigate('/login');
	};
	const handleRedirectToProfile = () => {
		navigate('/profile');
	};

	return (
		<Box display="flex" justifyContent="space-between" p={2}>
			<Box
				display="flex"
				sx={{ backgroundColor: colors.primary[400] }}
				borderRadius="3px"
				component="div"
			></Box>
			<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
				</IconButton>
				<IconButton
					id="buttonProfile"
					aria-controls={open ? 'menuProfile' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					<PersonOutlinedIcon />
				</IconButton>
				<Menu
					id="menuProfile"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'buttonProfile'
					}}
				>
					<MenuItem onClick={handleRedirectToProfile}>Profili im</MenuItem>
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Menu>
			</Box>
		</Box>
	);
};

export default Topbar;