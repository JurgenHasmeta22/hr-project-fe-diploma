import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import TabPanel from '~/components/tabPanel';

export default function Profile() {
	const [value, setValue] = useState(0);
	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	};

	return (
		<Box>
			<Tabs value={value} onChange={handleChange} variant="fullWidth">
				<Tab label="Certification" />
				<Tab label="Education" />
				<Tab label="Projects" />
			</Tabs>
			<TabPanel value={value} index={0}>
				Certification Information...
			</TabPanel>
			<TabPanel value={value} index={1}>
				Education Information...
			</TabPanel>
			<TabPanel value={value} index={2}>
				Project Information...
			</TabPanel>
		</Box>
	);
}
