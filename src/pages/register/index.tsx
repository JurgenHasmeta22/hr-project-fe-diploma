import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Register() {
	const handleSubmit = (event: any) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password')
		});
	};

	return (
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					px: 4,
					py: 6,
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					background: '#EFEDF7'
				}}
			>
				<Typography component="h1" variant="h1" sx={{ color: '#141b2d' }}>
					Sign Up
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						// inputProps={{ style: { border: '2px solid #141b2d' } }}
						InputLabelProps={{ sx: { color: '#141b2d', fontSize: '16px' } }}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						InputLabelProps={{ sx: { color: '#141b2d', fontSize: '16px' } }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								value="remember"
								color="primary"
								// inputProps={{ style: { background: '#141b2d' } }}
							/>
						}
						label="Remember me"
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
					<Grid container>
						<Grid item>
							<Link href="/login" variant="body1" underline="none">
								{'Already have an account ? Sign In'}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
