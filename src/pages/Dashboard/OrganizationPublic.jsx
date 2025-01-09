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
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

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
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  fontWeight: 'bold',
  textTransform: 'uppercase',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const columns = [
  { id: 'organisationName', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone', label: 'Phone', minWidth: 170 },
  { id: 'address', label: 'Address', minWidth: 250 }, // Added address column
];

export default function OrganizationPublic() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Separate search states
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');

  useEffect(() => {
    const getOrganizations = async () => {
      try {
        const response = await axios.get('https://backendblood-production.up.railway.app/api/v1/organizations/organizations-list');
        if (response.data?.success) {
          setData(response.data?.orgData);
        } else {
          setError('Failed to fetch organization data.');
        }
      } catch (error) {
        console.log(error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    getOrganizations();
  }, []);

  // Filtering logic for organizations
  const filteredData = data.filter((org) => {
    const nameMatch =
      !searchName ||
      org.organisationName?.toLowerCase().includes(searchName.toLowerCase());
    const addressMatch =
      !searchAddress ||
      org.address?.toLowerCase().includes(searchAddress.toLowerCase());
    return nameMatch && addressMatch;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Pagination logic
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
        </Toolbar>
      </Navbar>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          padding: '0 20px',
        }}
      >
        {/* Heading */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Organizations List
        </Typography>

        {/* TWO SEARCH FIELDS for organizations */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 600,
            mb: 3,
          }}
        >
          <TextField
            label="Search by organization name"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Search by state (address)"
            variant="outlined"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            fullWidth
          />
        </Box>

        {/* Conditional Rendering based on loading and error states */}
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
            }}
          >
            <CircularProgress size={60} color="primary" />
            <Typography variant="h6" sx={{ marginTop: '16px', color: '#555' }}>
              Loading Organisations...
            </Typography>
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : filteredData.length === 0 ? (
          <Typography variant="body1">No Organisation found.</Typography>
        ) : (
          <Paper
            sx={{
              width: '100%',
              maxWidth: '1200px',
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <TableContainer>
              <Table stickyHeader aria-label="organizations table">
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
                  {paginatedData.map((row) => (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value ?? '—'}
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
              count={filteredData.length}
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
