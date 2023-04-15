import * as React from 'react';
import { Component } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import  './index.css';
import logo from './../../../logo.svg';
import { IconButton, Badge } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function TopBar() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <AppBar className='topheader'>
            <Toolbar
                sx={{
                    pr: '24px',
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <a href="/" title="Smart Classroom">
                    <img src={logo} alt='Smart Classroom' className='applogo'/>
                </a>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                    >
                </Typography>
                <IconButton color="inherit">
                    <AccountCircleIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}