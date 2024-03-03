import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                textAlign="center"
            >
                <Typography variant="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Page Not Found
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/dashboard')}
                >
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
};

export default Error;
