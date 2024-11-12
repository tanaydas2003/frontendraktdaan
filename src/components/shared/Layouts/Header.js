// import React from 'react'
// import { BiDonateBlood, BiUserCircle} from "react-icons/bi";
// import {useNavigate,useLocation,Link} from 'react-router-dom'
// import {useSelector} from 'react-redux';
// const Header = () => {
//   const {user} = useSelector(state => state.auth);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const handleLogout =() =>{
//     localStorage.clear();
//     alert('Logout Successfully');
//     navigate('/login');
//   }
//   return (
//     <>
//       <nav className="navbar">
//         <div className="container-fluid">
//             <div className="navbar-brand h1"><BiDonateBlood color='red' />Blood Bank App</div>
//             <ul className="navbar-nav flex-row">
//                 <li className="nav-item mx-3">
//                     <p className="nav-link"> <BiUserCircle />Welcome{" "} {user?.name || user?.hospitalName || user?.organisationName} &nbsp;
//                     <span className="badge bg-secondary">{user?.role}</span>
//                     </p>
//                 </li>
//                 {
//                   (location.pathname === "/"  || location.pathname === "/hospital") ? (
//                     <li className="nav-item mx-3">
//                     <Link to='/analytics' className="nav-link">
//                       Analytics
//                     </Link>
//                     </li>
//                   ) : (
//                     <li className="nav-item mx-3">
//                     <Link to='/' className="nav-link">
//                       Home
//                     </Link>
//                     </li>
//                   )
//                 }
//                 <li className="nav-item mx-3">
//                     <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//                 </li>
//             </ul>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Header


// import React from 'react';
// import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const Header = () => {
//   const { user } = useSelector(state => state.auth);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.clear();
//     alert('Logout Successfully');
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           <BiDonateBlood color="red" /> Blood Bank App
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <span className="nav-link">
//                 <BiUserCircle /> Welcome {user?.name || user?.hospitalName || user?.organisationName} &nbsp;
//                 <span className="badge bg-secondary">{user?.role}</span>
//               </span>
//             </li>
//             {location.pathname === "/" || location.pathname === "/hospital" ? (
//               <li className="nav-item">
//                 <Link to="/analytics" className="nav-link">
//                   Analytics
//                 </Link>
//               </li>
//             ) : (
//               <li className="nav-item mx-3">
//                 <Link to="/" className="nav-link">
//                   Home
//                 </Link>
//               </li>
//             )}
//             <li className="nav-item mx-3">
//               <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;


'use client';

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

const Navbar = styled(AppBar)({
  backgroundColor: 'black', // Navbar background color
});

const NavLink = styled(Button)({
  color: 'white', // Text color
});

function MainNav() {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle

  const handleLogout = () => {
    localStorage.clear();
    alert('Logout Successfully');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar position="static">
        <Toolbar>
          {/* Toggle Button for Sidebar */}
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar}>
            <BiMenu color="white" />
          </IconButton>

          {/* Logo and App Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <BiDonateBlood color="red" size={24} style={{ marginRight: 8 }} />
            <Typography variant="h6">
              <NavLink component={RouterLink} to="/" disableRipple>
                Blood Bank App
              </NavLink>
            </Typography>
          </Box>

          {/* Center Navigation Links - Hidden on mobile */}
          <Hidden smDown>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {location.pathname === "/" || location.pathname === "/hospital" ? (
                <NavLink component={RouterLink} to="/analytics" disableRipple>
                  Analytics
                </NavLink>
              ) : (
                <NavLink component={RouterLink} to="/" disableRipple>
                  Home
                </NavLink>
              )}
            </Box>
          </Hidden>

          {/* User Info - Hidden on mobile */}
          <Hidden smDown>
            <Typography variant="body1" sx={{ mr: 2, display: 'flex', alignItems: 'center', color: 'white' }}>
              <BiUserCircle />&nbsp;
              Welcome {user?.name || user?.hospitalName || user?.organisationName} &nbsp;
              <span className="badge bg-secondary">{user?.role}</span>
            </Typography>
          </Hidden>

          {/* Logout Button */}
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </Navbar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: '250px', // Sidebar width
            backgroundColor: '#dc3545', // Sidebar background color
            color: 'white', // Sidebar text color
          },
        }}
      >
        <Sidebar />
      </Drawer>
    </>
  );
}

export default MainNav;



