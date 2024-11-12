// import React from 'react'
// // import { userMenu } from './Menus/userMenu'
// import { useLocation, Link} from 'react-router-dom'
// import {useSelector} from "react-redux"
// import '../../../styles/Layout.css';

// const Sidebar = () => {

//   const {user} = useSelector(state => state.auth)

//     const location  = useLocation();
    
//   return (
//     <>
//       <div className="sidebar">
//         <div className="menu">
//           {user?.role === "organisation" && (
//             <>
//               <div className={`menu-item ${location.pathname === "/" && "active"}`}> 
//                 <i className="fa fa-solid fa-warehouse"></i>
//                 <Link to="/">Inventory</Link>
//               </div>
//               <div className={`menu-item ${location.pathname === "/donar" && "active"}`}> 
//                 <i className="fa fa-solid fa-hand-holding-medical"></i>
//                 <Link to="/donar">Donar</Link>
//               </div>
//               <div className={`menu-item ${location.pathname === "/hospital" && "active"}`}> 
//                 <i className="fa fa-solid fa-hospital"></i>
//                 <Link to="/hospital">Hospital</Link>
//               </div>
//             </>
//           )}
//           {user?.role === "admin" && (
//             <>
//               <div className={`menu-item ${location.pathname === "/donar-list" && "active"}`}> 
//                 <i className="fa fa-solid fa-warehouse"></i>
//                 <Link to="/donar-list">Donar List</Link>
//               </div>
//               <div className={`menu-item ${location.pathname === "/hospital-list" && "active"}`}> 
//                 <i className="fa fa-solid fa-hand-holding-medical"></i>
//                 <Link to="/hospital-list">Hospital List</Link>
//               </div>
//               <div className={`menu-item ${location.pathname === "/org-list" && "active"}`}> 
//                 <i className="fa fa-solid fa-hospital"></i>
//                 <Link to="/org-list">Organisation List</Link>
//               </div>
//             </>
//           )}
//           {(user?.role === 'donar' || user?.role === "hospital") && (
//             <div className={`menu-item ${location.pathname === "/organisation" && "active"}`}> 
//               <i className="fa-sharp fa-solid fa-building-ngo"></i>
//               <Link to="/organisation">Organisation</Link>
//             </div>
//           )}
//           {(user?.role === "hospital") && (
//             <div className={`menu-item ${location.pathname === "/consumer" && "active"}`}> 
//               <i className="fa-sharp fa-solid fa-building-ngo"></i>
//               <Link to="/consumer">Consumer</Link>
//             </div>
//           )}
//           {(user?.role === "donar") && (
//             <div className={`menu-item ${location.pathname === "/donation" && "active"}`}> 
//               <i className="fa-sharp fa-solid fa-building-ngo"></i>
//               <Link to="/donation">Donation</Link>
//             </div>
//           )}
            
//             {/* {userMenu.map((menu) =>{
//                 const isActive = location.pathname === menu.path
//                 return (
//                     <div className={`menu-item ${isActive && "active"}`} key={menu.name}> 
//                         <i className={menu.icon}></i>
//                         <Link to={menu.path}>{menu.name}</Link>
//                     </div>
//                 );
//             })} */}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Sidebar

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
    { path: '/', label: 'Inventory', icon: 'warehouse', roles: ['organisation'] },
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










