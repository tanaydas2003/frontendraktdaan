'use client';

import React, { useState } from 'react';
import { BiDonateBlood, BiUserCircle, BiMenu } from "react-icons/bi";
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import Sidebar from './Sidebar';

// ------------------------------------
// STYLED COMPONENTS
// ------------------------------------
const Navbar = styled(AppBar)({
  background: 'linear-gradient(to right, #000000, #1a1a1a)',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
});

const NavLink = styled(Button)({
  color: 'white',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    bottom: '0',
    left: '50%',
    background: 'linear-gradient(to right, #ff4b4b, #ff0000)',
    transition: 'all 0.3s ease-in-out',
    transform: 'translateX(-50%)',
  },
  '&:hover:after': {
    width: '80%',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const LogoutButton = styled(Button)({
  background: 'linear-gradient(to right, #dc3545, #c82333)',
  color: 'white',
  padding: '8px 24px',
  borderRadius: '25px',
  textTransform: 'none',
  fontWeight: '500',
  boxShadow: '0 2px 4px rgba(220, 53, 69, 0.2)',
  '&:hover': {
    background: 'linear-gradient(to right, #c82333, #bd2130)',
    boxShadow: '0 4px 8px rgba(220, 53, 69, 0.3)',
  },
});

const UserInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 12px',
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  marginRight: '16px',
});

const RoleBadge = styled('span')({
  background: 'linear-gradient(to right, #2196f3, #1976d2)',
  color: 'white',
  padding: '4px 12px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: '500',
  marginLeft: '8px',
});

function MainNav() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar position="static">
        <Toolbar sx={{ minHeight: '70px' }}>
          {/* ============ Hamburger Icon ============ */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{
              mr: 2,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <BiMenu size={24} />
          </IconButton>

          {/* ============ Logo / Title ============ */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
              }}
            >
              <BiDonateBlood color="#ff4b4b" size={28} style={{ marginRight: 8 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                <NavLink component={RouterLink} to="/home" disableRipple>
                  Raktdaan
                </NavLink>
              </Typography>
            </Box>
          </Box>

          {/* 
            ====================================
            Only show these on SM & up (desktop)
            ====================================
          */}
          <Hidden smDown>
            {/* "Analytics" or "Home" Link */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {location.pathname === '/home' || location.pathname === '/hospital' ? (
                <NavLink component={RouterLink} to="/analytics" disableRipple>
                  Analytics
                </NavLink>
              ) : (
                <NavLink component={RouterLink} to="/home" disableRipple>
                  Home
                </NavLink>
              )}
            </Box>
          </Hidden>

          {/* User Info (desktop only) */}
          <Hidden smDown>
            <UserInfo>
              <BiUserCircle size={20} style={{ marginRight: 8 }} />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user?.name || user?.hospitalName || user?.organisationName}
              </Typography>
              <RoleBadge>{user?.role}</RoleBadge>
            </UserInfo>
          </Hidden>

          {/* Logout (desktop only) */}
          <Hidden smDown>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </Hidden>
        </Toolbar>
      </Navbar>

      {/* ============ Sidebar (Drawer) ============ */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: '250px',
            background: 'linear-gradient(135deg, #dc3545, #9f1f2c)',
            color: 'white',
          },
        }}
      >
        {/* Pass handleLogout if you need logout inside the sidebar as well */}
        <Sidebar handleLogout={handleLogout} toggleSidebar={toggleSidebar} />
      </Drawer>
    </>
  );
}

export default MainNav;
