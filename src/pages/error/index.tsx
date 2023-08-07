import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { purple } from '@mui/material/colors';

export default function Error() {
	const primary = purple[500]; // #f44336

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				backgroundColor: primary
			}}
		>
			<Container>
				<Grid container>
					<Grid>
						<Typography variant="h1" style={{ color: 'white' }}>
							404
						</Typography>
						<Typography variant="h6" style={{ color: 'white' }}>
							The page you’re looking for doesn’t exist.
						</Typography>
						{/* <Button variant="contained">Back Home</Button> */}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
