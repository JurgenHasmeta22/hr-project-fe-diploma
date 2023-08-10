import { Box, Button, Container, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

export default function Profile() {
	const [value, setValue] = useState(1);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Item One" {...a11yProps(0)} />
					<Tab label="Item Two" {...a11yProps(1)} />
					<Tab label="Item Three" {...a11yProps(2)} />
				</Tabs>
			</Box>
			{value === 1 && (
				<Box sx={{ p: 3 }}>
					<Typography>Item One</Typography>
				</Box>
			)}
			{value === 2 && (
				<Box sx={{ p: 3 }}>
					<Typography>Item Two</Typography>
				</Box>
			)}
			{value === 3 && (
				<Box sx={{ p: 3 }}>
					<Typography>Item Three</Typography>
				</Box>
			)}
		</>
	);
}
