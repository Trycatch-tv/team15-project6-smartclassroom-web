import { Divider, Drawer, Link, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import './index.css';
export default function LeftMenu() {
    return <Drawer variant="permanent">
        <List component="nav">
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <Link href='/' underline="none">
                    <ListItemText secondary="Dashboard" />
                </Link>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <PeopleIcon />
                </ListItemIcon>
                <Link href='/courses' underline="none">
                    <ListItemText secondary="Courses" />
                </Link>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <ShoppingCartIcon />
                </ListItemIcon>
                <Link href='/grades' underline="none">
                    <ListItemText secondary="Grades" />
                </Link>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <BarChartIcon />
                </ListItemIcon>
                <Link href='/students' underline="none">
                    <ListItemText secondary="Students" />
                </Link>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <LayersIcon />
                </ListItemIcon>
                <Link href='/teachers' underline="none">
                    <ListItemText secondary="Teachers" />
                </Link>
            </ListItemButton>
        </List>
    </Drawer>
}
