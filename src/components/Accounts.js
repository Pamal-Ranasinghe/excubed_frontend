import * as React from 'react';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import axios from 'axios'

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Accounts(props) {
  const {accountData,deleteHandler,editHandler} = props
  return (
    <React.Fragment>
      <Title>All Accounts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account Number</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell>Account Name</TableCell>
            <TableCell>Account Type</TableCell>
            <TableCell >Account Currency</TableCell>
            <TableCell >Account Balance</TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountData.map((row) => (
            <TableRow key={row._id}>
              <TableCell align="center">{row.account_number}</TableCell>
              <TableCell >{row.owner_name}</TableCell>
              <TableCell align="center">{row.account_name}</TableCell>
              <TableCell>{row.account_type}</TableCell>
              <TableCell align="center">{row.account_currency}</TableCell>
              <TableCell align="center">{row.account_currency == "LKR" ? `Rs. ${row.account_balance}`:row.account_currency == "USD" ? `$ ${row.account_balance}` : `EU ${row.account_balance}`}</TableCell>
              <TableCell align="center"><Button variant="contained" onClick={() => editHandler(row)}>Edit</Button></TableCell>
              <TableCell align="center"><Button variant="contained" color="error" onClick={() => deleteHandler(row._id)}>Delete</Button></TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
    
      </Link>
    </React.Fragment>
  );
}