import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CoursesIcon from "@mui/icons-material/Bookmark";
import StudentsIcon from "@mui/icons-material/People";
import "./index.css";
export default function LeftMenu() {
  return (
    <Drawer variant="permanent">
      <List component="nav">
        <ListItemButton>
          <ListItemIcon>
            <CoursesIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <StudentsIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
