// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/shared/Layouts/Layout';
import Modal from '../components/shared/modal/Modal';
import API from '../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';


// Define columns outside the component for better performance
const columns = [
  { id: 'bloodGroup', label: 'Blood Group', minWidth: 170 },
  { id: 'inventoryType', label: 'Inventory Type', minWidth: 100 },
  { id: 'quantity', label: 'Quantity (ML)', minWidth: 170, align: 'right' },
  { id: 'email', label: 'Donor Email', minWidth: 170 },
  {
    id: 'createdAt',
    label: 'Time & Date',
    minWidth: 170,
    align: 'right',
    format: (value) => moment(value).format('DD/MM/YYYY hh:mm A'),
  },
];

// Styled components for enhanced table styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark, // Primary dark color for header
  color: theme.palette.common.white,            // White text for contrast
  fontWeight: 'bold',                           // Bold text
  textTransform: 'uppercase',                   // Uppercase text
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover, // Zebra striping for odd rows
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected, // Enhanced hover effect
  },
}));

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  // Fetch blood records
  const getBloodRecords = async () => {
    try {
      const response = await API.get('/inventory/get-inventory');
      if (response.data?.success) {
        setData(response.data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout>
      <div className="container content">
        <h4
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ cursor: 'pointer' }}
        >
          <i className="fa-solid fa-plus text-success py-4"></i>
          Add Inventory
        </h4>
        <Modal />

        {/* Enhanced Recent Blood Transactions Table */}
        <Paper sx={{ width: '100%', overflowX: 'auto', marginTop: '20px', boxShadow: 3 }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
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
      </div>
    </Layout>
  );
}
