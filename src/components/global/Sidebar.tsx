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

	return (
		<SubMenu
			title={label}
			icon={<ReceiptOutlinedIcon />}
			style={{
				color: colors.grey[100]
			}}
		>
			<Item
				title="Lista e lejeve"
				to="/admin/permissions"
				icon={<ReceiptOutlinedIcon />}
				selected={selected}
				setSelected={setSelected}
			/>
			<Item
				title="Rezervimi i lejeve"
				to="/admin/permissionReservation"
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
							<Box display="flex" justifyContent="end" alignItems="center" ml="15px">
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>
					{!isCollapsed && (
						<Box mb="25px">
							<Box display="flex" justifyContent="center" alignItems="center">
								<img
									alt="profile-user"
									width="100px"
									height="100px"
									src={'../../../assets/images/user.png'}
									style={{ cursor: 'pointer', borderRadius: '50%' }}
								/>
							</Box>
							<Box textAlign="center">
								<Typography
									variant="h2"
									color={colors.grey[100]}
									fontWeight="bold"
									sx={{ m: '10px 0 0 0' }}
								>
									Anonim
								</Typography>
								<Typography variant="h5" color={colors.greenAccent[500]}>
									HR Admin
								</Typography>
							</Box>
						</Box>
					)}
					<Box paddingLeft={isCollapsed ? undefined : '10%'}>
						<Item
							title="Dashboard"
							to="/admin/dashboard"
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title="Perdoruesit"
							to="/admin/users"
							icon={<PeopleOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<SubMenuItem label="Lejet" selected={selected} setSelected={setSelected} />
						<Item
							title="Projektet"
							to="/admin/projects"
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
