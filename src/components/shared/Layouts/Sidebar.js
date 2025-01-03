'use client';

import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import '../../../styles/Layout.css';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const menuItems = [
    { path: '/home', label: 'Inventory', icon: 'warehouse', roles: ['organisation'] },
    { path: '/donar', label: 'Donar', icon: 'hand-holding-medical', roles: ['organisation'] },
    { path: '/hospital', label: 'Hospital', icon: 'hospital', roles: ['organisation'] },
    { path: '/donar-list', label: 'Donar List', icon: 'warehouse', roles: ['admin'] },
    { path: '/hospital-list', label: 'Hospital List', icon: 'hand-holding-medical', roles: ['admin'] },
    { path: '/org-list', label: 'Organisation List', icon: 'hospital', roles: ['admin'] },
    { path: '/organisation', label: 'Organisation', icon: 'building-ngo', roles: ['donar', 'hospital'] },
    { path: '/consumer', label: 'Consumer', icon: 'building-ngo', roles: ['hospital'] },
    { path: '/donation', label: 'Donation', icon: 'building-ngo', roles: ['donar'] },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user?.role));

  return (
    <Box
      sx={{
        width: '250px',
        bgcolor: '#dc3545', // Sidebar background color
        color: 'white', // Ensure text and icons are white
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '64px', // Adjust this value to match the height of your navbar
        left: 0,
        zIndex: 1300,
        '& .MuiListItem-root:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.04)',
        },
        '& .MuiListItem-root.active': {
          bgcolor: 'black', // Active background color
          color: 'white', // Active text color
          '& .MuiListItemIcon-root': {
            color: 'white', // Active icon color
          },
        },
      }}
    >
      <Typography variant="h6" align="center" sx={{ my: 2 }}>
        {user?.role === 'organisation' && 'Organisation'}
        {user?.role === 'admin' && 'Admin'}
        {(user?.role === 'donar' || user?.role === 'hospital') && 'User'}
      </Typography>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)', mb: 2 }} />
      <List>
        {filteredMenuItems.map((item) => (
          <ListItem
            button
            component={RouterLink}
            to={item.path}
            key={item.label}
            className={location.pathname === item.path ? 'active' : ''}
            sx={{
              color: 'white', // Ensure text color is white
              '& .MuiListItemIcon-root': {
                color: 'white', // Ensure icon color is white
              },
              '&.active': {
                bgcolor: 'black', // Active background color
                color: 'white', // Active text color
                '& .MuiListItemIcon-root': {
                  color: 'white', // Active icon color
                },
              },
            }}
          >
            <ListItemIcon>
              <Icon sx={{ color: 'inherit' }} className={`fa fa-solid fa-${item.icon}`} />
            </ListItemIcon>
            <ListItemText primary={item.label} sx={{ color: 'inherit' }} /> {/* Ensure text color is inherited (white) */}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;