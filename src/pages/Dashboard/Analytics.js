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

const columns = [
  { id: 'bloodGroup', label: 'Blood Group', minWidth: 170 },
  { id: 'inventoryType', label: 'Inventory Type', minWidth: 170 },
  { id: 'quantity', label: 'Quantity (ML)', minWidth: 170, align: 'right' },
  { id: 'email', label: 'Donor Email', minWidth: 170 },
  { id: 'createdAt', label: 'Time & Date', minWidth: 170, align: 'right', format: (value) => moment(value).format('DD/MM/YYYY hh:mm A') },
];

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const colors = ["#884A39","#C38154","#FFC26F","#4F709C","#4942E4","#0079FF","#FF0060","#22A699"];

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {data?.map((record, i) => (
          <div className="card m-2 p-1" key={i} style={{ width: '18rem', backgroundColor: `${colors[i]}` }}>
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
      <div className="container my-3">
        <h1 className='my-3'>Recent Blood Transactions</h1>
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
                {inventoryData
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
