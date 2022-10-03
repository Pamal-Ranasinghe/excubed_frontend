import React,{useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import axios from 'axios'
import {useNavigate} from 'react-router-dom';

export default function FormContent() {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [accountName,setAccountName] = useState("")
    const [accountType,setAccountType] = useState("")
    const [accountCurrencyType,setAccountCurrencyType] = useState("")
    const [accountNumber,setAccountNumber] = useState("")
    const [accountBalance,setAccountBalance] = useState("")
    const navigate = useNavigate();


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
        console.log(e.target.value)
        console.log(accountType)
        switch(e.target.value){
            case 10:setAccountType("Fixed Account")
                    break;
            case 20: setAccountType("Saving Account")
                    break
            default: console.log("Error")
        }
      }
      const handleCurrencyType = (e) =>{
        console.log(e.target.value)
        console.log(accountType)
        switch(e.target.value){
            case 10:setAccountCurrencyType("LKR")
                    break;
            case 20: setAccountCurrencyType("USD")
                    break
            case 30: setAccountCurrencyType("EU")
                    break
            default: console.log("Error")
        }
      }

    const formSubmit = async () =>{
        const data = {
            account_number:accountNumber,
            account_name:accountName,
            account_type:accountType,
            account_balance:accountBalance,
            account_currency:accountCurrencyType,
            owner_name:firstName+" "+lastName
            
        }
        try {
            const result = await axios.post("https://banking-app-pamal.herokuapp.com/account/create-account",data)
            console.log(result,"Result")

            alert("Account Created")
            navigate('/')
        } catch (error) {
            
        }
    }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter Account Details
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
            value={firstName}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
             onChange={(e) => handleAccountNumberChange(e)}
             defaultValue={accountNumber}
             value={accountNumber}
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
            value={accountName}
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
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   value={accountType}
          label="Account type"
          onChange={handleAccountType}
        >
          <MenuItem value={10}>Fixed Account</MenuItem>
          <MenuItem value={20}>Saving Account</MenuItem>
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
        //   value={age}
          label="Age"
          onChange={handleCurrencyType}
        >
          <MenuItem value={10}>LKR</MenuItem>
          <MenuItem value={20}>USD</MenuItem>
          <MenuItem value={30}>EU</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
             onChange={(e) => handleAccountBalanceChange(e)}
             defaultValue={accountBalance}
             value={accountBalance}
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
  );
}