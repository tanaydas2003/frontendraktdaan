'use client';

import React, { useEffect, useState } from 'react';
import { BiDonateBlood } from "react-icons/bi";
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import Alert from '@mui/material/Alert'; // Optional: Import Alert for error messages

// Styled components for Navbar
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

// Styled components for table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark, // Header background color
  color: theme.palette.common.white,          // White text
  fontWeight: 'bold',                         // Bold text
  textTransform: 'uppercase',                 // Uppercase text
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover, // Zebra striping for odd rows
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected, // Enhanced hover effect
  },
}));

const columns = [
  { id: 'hospitalName', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone', label: 'Phone', minWidth: 170 },
];

export default function Hospitals() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);     // Added error state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getHospitals = async () => {
      try {
        const response = await axios.get('https://backendblood-kif9.onrender.com/api/v1/hospitals/hospitals-list');
        if (response.data?.success) {
          setData(response.data?.hospitalData);
        } else {
          setError('Failed to fetch hospital data.');
        }
      } catch (error) {
        console.log(error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    getHospitals();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar position="static">
        <Toolbar sx={{ minHeight: '70px' }}>
          {/* Logo and Title */}
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
                <NavLink component={RouterLink} to="https://rakdtdaann.netlify.app/" disableRipple>
                  Raktdaan
                </NavLink>
              </Typography>
            </Box>
          </Box>

          {/* If you have additional buttons or links, add them here */}
        </Toolbar>
      </Navbar>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // Stack heading and table vertically
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          padding: '0 20px', // Added padding for better responsiveness
        }}
      >
        {/* Heading */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#333', // Adjust color as needed
          }}
        >
          Hospitals List
        </Typography>

        {/* Conditional Rendering based on loading and error states */}
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px', // Adjust height as needed
            }}
          >
            <CircularProgress size={60} color="primary" /> {/* Spinner */}
            <Typography variant="h6" sx={{ marginTop: '16px', color: '#555' }}>
              Loading Hospitals...
            </Typography>
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert> // Display error message
        ) : data.length === 0 ? (
          <Typography variant="body1">No hospitals found.</Typography>
        ) : (
          <Paper
            sx={{
              width: '100%', // Use full width for better responsiveness
              maxWidth: '1200px', // Optional: set a max width
              overflow: 'hidden',
              boxShadow: 3, // Add subtle shadow for depth
            }}
          >
            <TableContainer>
              <Table stickyHeader aria-label="hospitals table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'string'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </div>
    </div>
  );
}
