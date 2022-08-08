import React, { useState, useEffect } from "react";
import { UserData } from '../components/UserData';
import { roles } from '../components/constants'
import '../components/UserManagment.css';

import Avatar from '@mui/material/Avatar';
import PreviewIcon from '@mui/icons-material/Preview';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  //console.log("Hash: ", hash)
  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  //console.log("Colour: ", color)
  return color;
}

export default function BasicTable(props) {
  // console.log("Props: ",props)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell align="left" ><div style={{ paddingLeft: 30 }}>User</div></TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow
              key={row.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Avatar sx={{ bgcolor: stringToColor(row.username) }}>{row.username[0]}</Avatar>
                  <div style={{ padding: "10px" }}>{row.username}</div>
                </div>
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ paddingRight: 3 }}>
                    {row.role == "admin" ? <AdminPanelSettingsIcon></AdminPanelSettingsIcon> : <PreviewIcon></PreviewIcon>}
                  </div>
                  <div style={{ paddingTop: 2 }}>{row.role}</div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const UserManagment = () => {
  const [open, setOpen] = React.useState(false);
  const handleAdd = () => setOpen(!open);

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    username:'',
    email:'',
    role:'viewer'
  });

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleNameChange = event => {
    setValues({
      ...values,
      username: event.target.value
    });
  };

  const handleRoleChange = (event) => {
    setValues({
      ...values,
      role: event.target.value
    });
  };

  const handleMailChange = (event) => {
    setValues({
      ...values,
      email: event.target.value
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [userData, setUserData] = React.useState(UserData);

  const handleSubmit= () => {
    console.log("Value:",values);
    setUserData((userData) => [ ...userData, { username:  values.username,role:values.role, email:values.email} ]);
    setValues({
      password: '',
      showPassword: false,
      username:'',
      email:'',
      role:'viewer'
    });
    handleAdd();
  //createUser();
  //getUsers();
  //setUserData();
  }


  return (
    <div style={{ width: "auto", height: "auto" }}>
        <center>
          <div style={{ width: 500 }}>
            <BasicTable data={userData}></BasicTable>
          </div>
        </center>
        <Fab color="primary" aria-label="add" onClick={handleAdd} style={{zIndex:"10",position:"fixed",right:"10px",bottom:"10px"}}>
            {open ? <CancelIcon /> : <AddIcon />}
          </Fab>

        <Dialog 
          open={open}
          onClose={handleAdd}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add New User"}
          </DialogTitle>
          <DialogContent style={{ padding: 50 }}>
            <div style={{ padding: 10 }}>
              <TextField
                required
                id="outlined-required-name"
                label="Name"
                placeholder="Enter Full Name"
                onChange={handleNameChange}
                value={values.username}
              />

            </div>
            <div style={{ padding: 10 }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Select Role"
                value={values.role}
                onChange={handleRoleChange}
              >
                {roles.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: 10 }} >
              <TextField
                style={{ paddingRight: 10 }}
                required
                id="outlined-required-email"
                label="Email"
                placeholder="Enter Valid Email"
                onChange={handleMailChange}
                value={values.email}
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handlePasswordChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAdd}>Cancel</Button>
            <Button onClick={handleSubmit} autoFocus style={{ backgroundColor: "blue", color: "white" }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    // <>
    //     { pets.map(pet => 
    //     <div className={styles.pets}>
    //         <div>ID: {pet.id}</div>
    //         <div>Name: {pet.name} </div>
    //         <div>Age: {pet.age}</div>
    //     </div>) 
    //     }
    // </>
  )
};
