// src/pages/Dashboard/Analytics.js
import React, { useEffect, useState } from 'react';
import Header from '../../components/shared/Layouts/Header';
import API from '../../services/API';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

// Define columns outside the component for better performance
const columns = [
  { id: 'bloodGroup', label: 'Blood Group', minWidth: 170 },
  { id: 'inventoryType', label: 'Inventory Type', minWidth: 170 },
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

// Styled components for enhanced styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  // Additional styling if needed
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Improve the hover effect
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const colors = [
    '#884A39',
    '#C38154',
    '#FFC26F',
    '#4F709C',
    '#4942E4',
    '#0079FF',
    '#FF0060',
    '#22A699',
  ];

  // Fetch blood group data
  const getBloodGroupData = async () => {
    try {
      const response = await API.get('/analytics/bloodGroups-data');
      if (response.data?.success) {
        setData(response.data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch recent blood records
  const getBloodRecords = async () => {
    try {
      const response = await API.get('/inventory/get-recent-inventory');
      if (response.data?.success) {
        setInventoryData(response.data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
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
    <>
      <Header />
      
      {/* Blood Group Cards (Unchanged) */}
      <div
        className="d-flex flex-row flex-wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data?.map((record, i) => (
          <div
            className="card m-2 p-1"
            key={i}
            style={{ width: '18rem', backgroundColor: `${colors[i % colors.length]}` }}
          >
            <div className="card-body">
              <h1 className="card-title bg-light text-dark text-center mb-3">{record.bloodGroup}</h1>
              <p className="card-text">
                Total In: <b>{record.totalIn}</b> (ML)
              </p>
              <p className="card-text">
                Total Out: <b>{record.totalOut}</b> (ML)
              </p>
              <p className="card-footer text-light bg-dark text-center">
                Total Available: <b>{record.availabeBlood}</b> (ML)
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Blood Transactions Table (Enhanced) */}
      <div className="container my-3">
        <Typography variant="h4" component="h1" gutterBottom>
          Recent Blood Transactions
        </Typography>
        <Paper
          sx={{
            width: '100%',
            overflow: 'hidden',
            marginTop: '20px',
            boxShadow: 3,
          }}
        >
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
                {inventoryData
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
            count={inventoryData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default Analytics;
