import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const theme = createTheme();

export default function TransferCredit() {

    const [senderAccountNumber,setSenderAccountNumber] = useState("")
    const [receiverAccountNumber,setReceiverAccountNumber] = useState("")
    const [amount,setAmount] = useState("")
    const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = {
        account_number_from:senderAccountNumber,
        account_number_to:receiverAccountNumber,
        amount:amount
    }

    try {
       const result =  await axios.post('https://banking-app-pamal.herokuapp.com/transaction/do-transaction',data)
       alert("Transaction Completed")
       navigate("/")
       console.log(result,"balance")
    } catch (error) {
        
    }
    console.log(data)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <TransferWithinAStationIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Transfer Credit
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Sender Account Number"
              name="Sender Account Number"
              autoFocus
              value={senderAccountNumber}
              onChange={(e) => setSenderAccountNumber(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Receiver Account Number"
              label="Receiver Account Number"
              type="text"
              value={receiverAccountNumber}
              onChange={(e) => setReceiverAccountNumber(e.target.value)}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="Amount"
              label="Amount"
              type="number"
              id="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor: 'secondary.main', textTransform: 'none'}}
            >
              Transfer
            </Button>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}