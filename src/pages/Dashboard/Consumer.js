import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layouts/Layout';
import moment from 'moment';
import API from '../../services/API';
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
  { id: 'inventoryType', label: 'Inventory Type', minWidth: 170 },
  { id: 'quantity', label: 'Quantity', minWidth: 170, align: 'right' },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'createdAt', label: 'Date', minWidth: 170, align: 'right', format: (value) => moment(value).format('DD/MM/YYYY hh:mm A') },
];

export default function Consumer() {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getDonars = async () => {
      try {
        const response = await API.post("/inventory/get-inventory-hospital", {
          filters: {
            inventoryType: "out",
            hospital: user?._id,
          },
        });
        if (response.data?.success) {
          setData(response.data?.inventory);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDonars();
  }, [user]);

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
                      backgroundColor: '#343a40',
                      color: 'white',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
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
    </Layout>
  );
}
