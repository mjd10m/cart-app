import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const drawerWidth = 240;
const sideBarItems = [
  {
    label: "Home",
    icon: <HomeIcon/>,
    route: ''
  },
  {
    label: "Customers",
    icon: <PeopleIcon/>,
    route: 'customers'
  },
  {
    label: "Invite Admin User",
    icon: <GroupAddIcon/>,
    route: 'invite'
  },
]

function SideBar() {
  const navigate = useNavigate()
  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {sideBarItems.map((text, index) => (
          <ListItem button = "true" key={index} disablePadding onClick={()=> navigate(`/admin/${text.route}`,{ replace: true })}>
            <ListItemButton>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default SideBar
