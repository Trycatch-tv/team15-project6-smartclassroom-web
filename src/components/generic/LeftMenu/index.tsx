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

import "./index.css";
export default function LeftMenu() {
  return (
    <Drawer variant="permanent">
      <List component="nav">
        <ListItemButton>
          <ListItemIcon>
            <LocalLibraryIcon />
          </ListItemIcon>
          <Link href="/courses" underline="none">
            <ListItemText secondary="Cursos" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <Link href="/students" underline="none">
            <ListItemText secondary="Estudiantes" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          {/*TODO: change link to about-us*/}
          <Link href="/teachers" underline="none">
            <ListItemText secondary="Sobre nosotros" />
          </Link>
        </ListItemButton>
      </List>
    </Drawer>
  );
}
