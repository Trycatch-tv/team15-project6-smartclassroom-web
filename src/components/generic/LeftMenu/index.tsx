import * as React from 'react';
import {
  Divider,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from '@mui/icons-material/Dashboard';
import "./index.css";
export default function LeftMenu() {
  const [open, setOpen] = React.useState(true);
  return (
    <Drawer variant="permanent" open={open} className='leftMenu'>
      <List component="nav" className="side-bar">
        
        <ListItemButton href="/dashboard">
          <ListItemIcon className="icon">
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText secondary="Dashboard" />
        </ListItemButton>

        <ListItemButton  href="/courses">
          <ListItemIcon className="icon">
            <LocalLibraryIcon />
          </ListItemIcon>
          <ListItemText secondary="Cursos" />
        </ListItemButton>

        <ListItemButton href="/students">
          <ListItemIcon className="icon">
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText secondary="Estudiantes" />
        </ListItemButton>

        <ListItemButton href="/about-us">
          <ListItemIcon className="icon">
            <InfoIcon />
          </ListItemIcon>
          <ListItemText secondary="Sobre nosotros" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
