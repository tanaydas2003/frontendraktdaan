import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layouts/Layout';
import moment from 'moment';
import API from '../../services/API';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const columns = [
  { id: 'organisationName', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone', label: 'Phone', minWidth: 170 },
  { id: 'createdAt', label: 'Date', minWidth: 170, align: 'right', format: (value) => moment(value).format('DD/MM/YYYY hh:mm A') },
  { id: 'action', label: 'Action', minWidth: 170, align: 'center' },
];

export default function OrgList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getOrgs = async () => {
      try {
        const response = await API.get('/admin/organisation-list');
        if (response.data?.success) {
          setData(response.data?.orgData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrgs();
  }, []);

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Are You Sure You Want To Delete This Organisation?", "Sure");
      if (!answer) return;
      const response = await API.delete(`/admin/delete-donar/${id}`);
      alert(response.data?.message);
      setData(data.filter((record) => record._id !== id)); // Update the state directly instead of reloading the page
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                      if (column.id === 'action') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDelete(row._id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        );
                      }
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
    </Layout>
  );
}
