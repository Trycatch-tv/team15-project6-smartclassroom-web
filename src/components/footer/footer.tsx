import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <Box
    component="footer"
    sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: (theme) =>
        theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
    }}
    >
    <Container>
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Trycatch-tv">
            Trycatch-tv
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    </Container>
    </Box>
  );
}