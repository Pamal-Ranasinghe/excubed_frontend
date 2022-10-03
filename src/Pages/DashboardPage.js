import  React,{useState,useEffect} from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"; 
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Deposits from "../components/Deposits";
import Accounts from "../components/Accounts";
import {useNavigate} from 'react-router-dom';


import axios from 'axios'


function DashboardPage() {
  const [accountData,setAccountData] = useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    getData()
  },[])
  
  const getData = async () =>{
    const result = await axios.get('https://banking-app-pamal.herokuapp.com/account/get-accounts')
    console.log("account data",result.data.data)
    setAccountData(result.data.data)
  }

  const deleteHandler = async(id) =>{
    console.log(id)
      const deleteResult = await axios.delete(`https://banking-app-pamal.herokuapp.com/account/delete-account/${id}`)
      const getDataresult = await axios.get('http://localhost:4000/account/get-accounts')
      setAccountData(getDataresult.data.data)

  }
  const editHandler = async(account) =>{
    console.log(account)
    navigate("/edit-account",{state:account})
      // const deleteResult = await axios.delete(`http://localhost:4000/account/delete-account/${id}`)
      // const getDataresult = await axios.get('http://localhost:4000/account/get-accounts')
      // setAccountData(getDataresult.data.data)

  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
      {/* Chart */}
      {/* <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
       
        </Paper>
      </Grid> */}
      {/* Recent Deposits */}
      {/* <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Deposits />
        </Paper>
      </Grid> */}
      {/* Recent Orders */}
      <Grid item lg>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Accounts accountData={accountData} deleteHandler={deleteHandler} editHandler={editHandler}/>
        </Paper>
      </Grid>
    </Grid>
    {/* <Copyright sx={{ pt: 4 }} /> */}
  </Container>
  )
}

export default DashboardPage