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
        <ListItemButton>
          <ListItemIcon className="icon">
            <DashboardIcon />
          </ListItemIcon>
          <Link href="/dashboard" underline="none">
            <ListItemText secondary="Dashboard" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon className="icon">
            <LocalLibraryIcon />
          </ListItemIcon>
          <Link href="/courses" underline="none">
            <ListItemText secondary="Cursos" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon className="icon">
            <PeopleIcon />
          </ListItemIcon>
          <Link href="/students" underline="none">
            <ListItemText secondary="Estudiantes" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon className="icon">
            <InfoIcon />
          </ListItemIcon>
          <Link href="/about-us" underline="none">
            <ListItemText secondary="Sobre nosotros" />
          </Link>
        </ListItemButton>
      </List>
    </Drawer>
  );
}
