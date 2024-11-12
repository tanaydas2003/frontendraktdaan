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

const columns = [
  { id: 'bloodGroup', label: 'Blood Group', minWidth: 170 },
  { id: 'inventoryType', label: 'Inventory Type', minWidth: 100 },
  { id: 'quantity', label: 'Quantity (ML)', minWidth: 170, align: 'right' },
  { id: 'email', label: 'Donor Email', minWidth: 170 },
  { id: 'createdAt', label: 'Time & Date', minWidth: 170, align: 'right', format: (value) => moment(value).format('DD/MM/YYYY hh:mm A') },
];

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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

        <Paper sx={{ width: '100%', overflowX: 'auto', marginTop: '20px' }}>
          <TableContainer sx={{ minWidth: 320 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: '#343a40', // Bootstrap's table-dark background
                        color: 'white', // Bootstrap's text color
                        fontWeight: 'bold', // Similar to table-active styling
                        textTransform: 'uppercase', // Bootstrap's text-uppercase
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
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
                    </TableRow>
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
