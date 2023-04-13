import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import  './index.css';
import logo from './../../../logo.svg';

export default function TopBar() {
  
    return (
        <AppBar className='topheader'>
            <Toolbar
                sx={{
                  pr: '24px',
                }}
            >
                <a href="/" title="Smart Classroom"><img src={logo} alt='Smart Classroom' className='applogo'/></a>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                    >
                Classroom
                </Typography>
            </Toolbar>
        </AppBar>
    );
}