import  React,{useState,useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';


function EditAccountPage() {
    const [firstName,setFirstName] = useState(null)
    const [lastName,setLastName] = useState(null)
    const [accountName,setAccountName] = useState(null)
    const [accountType,setAccountType] = useState(null)
    const [accountCurrencyType,setAccountCurrencyType] = useState(null)
    const [accountNumber,setAccountNumber] = useState(null)
    const [accountBalance,setAccountBalance] = useState(null)
    const navigate = useNavigate();
    const {state} = useLocation();


    

    const handleAccountNumberChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value == "" || regex.test(e.target.value)) {
            setAccountNumber(e.target.value);
        }
      };
    const handleAccountBalanceChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value == "" || regex.test(e.target.value)) {
            setAccountBalance(e.target.value);
        }
      };

      const handleAccountType = (e) =>{
        setAccountType(e.target.value)
        
      }
      const handleCurrencyType = (e) =>{
        setAccountCurrencyType(e.target.value)
                
        
      }

    const formSubmit = async () =>{
        const tempFirstName = firstName ? firstName : state.owner_name && state.owner_name.split(" ").filter((item,index) => index == 0)
        const tempLastName = lastName ? lastName : state.owner_name && state.owner_name.split(" ").filter((item,index) => index == 1)
        const data = {
            account_number:accountNumber ? accountNumber:state.account_number,
            account_name:accountName ? accountName:state.account_name  ,
            account_type:accountType ? accountType:state.account_type,
            account_balance:accountBalance ? accountBalance:state.account_balance,
            account_currency:accountCurrencyType ?accountCurrencyType: state.account_currency,
            owner_name:tempFirstName +" "+  tempLastName
            
        }
        try {
            const result = await axios.put(`https://banking-app-pamal.herokuapp.com/account/update-account/${state._id}`,data)
            console.log(result,"Result")

            alert("Account Created")
            navigate('/')
        } catch (error) {
            
        }
    }
    const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Edit Account
          </Typography>
         
          <React.Fragment>
          <Typography variant="h6" gutterBottom>
        Edit Account Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstName ? firstName:state.owner_name && state.owner_name.split(" ").filter((item,index) => index == 0)}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName?lastName:state.owner_name && state.owner_name.split(" ").filter((item,index) => index == 1)}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
             onChange={(e) => handleAccountNumberChange(e)}
             defaultValue={accountNumber}
             value={accountNumber ? accountNumber :state.account_number}
             inputProps={{ maxLength: 12 }}
            required
            id="account_number"
            name="address1"
            label="Account Number"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="address2"
            name="address2"
            label="Account Name"
            value={accountName ?accountName : state.account_name}
            onChange={(e) => setAccountName(e.target.value)}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
       
        <Grid item xs={12} sm={6}>
        <Box >
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
        <Select
          value={accountType ? accountType:state.account_type}
          label="Account type"
          onChange={handleAccountType}
        >
          <MenuItem value="Fixed Account">Fixed Account</MenuItem>
          <MenuItem value="Saving Account">Saving Account</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Box >
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">Account Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={accountCurrencyType?accountCurrencyType:state.account_currency}
          label="Age"
          onChange={handleCurrencyType}
        >
          <MenuItem value="LKR">LKR</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EU">EU</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
             onChange={(e) => handleAccountBalanceChange(e)}
             defaultValue={accountBalance}
             value={accountBalance ? accountBalance :state.account_balance}
             inputProps={{ maxLength: 12 }}
            required
            id="account_number"
            name="address1"
            label="Account Balance"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
       
        <Grid item xs={12}>
            <Grid container justifyContent="center">
            <Grid item>
                <Button onClick={() => formSubmit()} variant="contained">Submit</Button>
            </Grid>
            </Grid>
        </Grid>
      </Grid>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default EditAccountPage