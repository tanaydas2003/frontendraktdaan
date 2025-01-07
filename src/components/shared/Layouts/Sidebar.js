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
        background: 'linear-gradient(180deg, #dc3545 0%, #b02a37 100%)',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '64px',
        left: 0,
        zIndex: 1300,
        boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)',
        '& .MuiListItem-root': {
          margin: '4px 8px',
          borderRadius: '8px',
          transition: 'all 0.2s ease-in-out',
        },
        '& .MuiListItem-root:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          transform: 'translateX(4px)',
        },
        '& .MuiListItem-root.active': {
          bgcolor: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.35)',
          },
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            mb: 1
          }}
        >
          {user?.role === 'organisation' && 'Organisation Dashboard'}
          {user?.role === 'admin' && 'Admin Dashboard'}
          {(user?.role === 'donar' || user?.role === 'hospital') && 'User Dashboard'}
        </Typography>
      </Box>
      
      <Divider sx={{ 
        borderColor: 'rgba(255,255,255,0.1)', 
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        mb: 2 
      }} />
      
      <List sx={{ px: 1 }}>
        {filteredMenuItems.map((item) => (
          <ListItem
            button
            component={RouterLink}
            to={item.path}
            key={item.label}
            className={location.pathname === item.path ? 'active' : ''}
            sx={{
              py: 1.5,
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
                minWidth: '40px',
              },
              '& .MuiListItemText-primary': {
                fontSize: '0.95rem',
                fontWeight: 500,
              },
            }}
          >
            <ListItemIcon>
              <Icon 
                className={`fa fa-solid fa-${item.icon}`}
                sx={{ 
                  fontSize: '1.2rem',
                  transition: 'transform 0.2s ease',
                  transform: location.pathname === item.path ? 'scale(1.1)' : 'scale(1)',
                }} 
              />
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              sx={{
                '& .MuiTypography-root': {
                  transition: 'transform 0.2s ease',
                  transform: location.pathname === item.path ? 'translateX(4px)' : 'none',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;