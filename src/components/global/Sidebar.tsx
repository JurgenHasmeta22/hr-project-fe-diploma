import { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { tokens } from '~/utils/theme';
import 'react-pro-sidebar/dist/css/styles.css';
import { useStore } from '~/store/zustand/store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Item = ({ title, to, icon, selected, setSelected }: any) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100]
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

const SubMenuItem = ({ label, selected, setSelected }: any) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { userDetailsLoggedIn } = useStore();
	const isEmployee = userDetailsLoggedIn?.userRolis?.some((el) => el.roli.roliEmri === 'Employee');

	return (
		<SubMenu
			title={label}
			icon={<ReceiptOutlinedIcon />}
			style={{
				color: colors.grey[100]
			}}
		>
			{!isEmployee && (
				<Item
					title="Lista e lejeve"
					to="/permissions"
					icon={<ReceiptOutlinedIcon />}
					selected={selected}
					setSelected={setSelected}
				/>
			)}
			<Item
				title="Rezervimi i lejeve"
				to="/permissionReservation"
				icon={<ReceiptOutlinedIcon />}
				selected={selected}
				setSelected={setSelected}
			/>
		</SubMenu>
	);
};

const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState('Dashboard');
	// const [position, setPosition] = useState<'left' | 'right'>('left');
	const [visible, setVisible] = useState(true);
	const { userDetailsLoggedIn } = useStore();

	return (
		<Box
			sx={{
				'& .pro-sidebar-inner': {
					background: `${colors.primary[400]} !important`
				},
				'& .pro-icon-wrapper': {
					backgroundColor: 'transparent !important'
				},
				'& .pro-inner-item': {
					padding: '5px 35px 5px 20px !important'
				},
				'& .pro-inner-item:hover': {
					color: '#868dfb !important'
				},
				'& .pro-menu-item.active': {
					color: '#6870fa !important'
				}
			}}
		>
			<ProSidebar collapsed={isCollapsed}>
				<Menu>
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: '10px 0 20px 0',
							color: colors.grey[100]
						}}
					>
						{!isCollapsed && (
							<Box position="absolute" top={4} right={5}>
								<IconButton onClick={() => setVisible(false)}>X</IconButton>
							</Box>
						)}
					</MenuItem>
					{!isCollapsed && (
						<Box mb="35px">
							<Box textAlign="center">
								<AccountCircleIcon style={{ fontSize: 100 }} />
								<Typography
									variant="h2"
									color={colors.grey[100]}
									fontWeight="bold"
									sx={{ m: '20px 0 0 0' }}
								>
									{userDetailsLoggedIn?.userName}
								</Typography>
								<Typography variant="h5" color={colors.greenAccent[500]}>
									{userDetailsLoggedIn?.userRolis![0].roli.roliEmri}
								</Typography>
							</Box>
						</Box>
					)}
					<Box paddingLeft={isCollapsed ? undefined : '10%'}>
						<Item
							title="Dashboard"
							to="/dashboard"
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Perdoruesit"
							to="/users"
							icon={<PeopleOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<SubMenuItem label="Lejet" selected={selected} setSelected={setSelected} />
						<Item
							title="Projektet"
							to="/projects"
							icon={<PersonOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;
