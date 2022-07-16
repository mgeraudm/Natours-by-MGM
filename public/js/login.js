/*eslint-disable*/
/*
//const express = require('express');
const cors = require('cors');

app.options('*', cors()); // enable pre-flight request for DELETE request
app.del('/products/:id', cors(), function(req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
});

app.listen(80, function() {
  console.log('CORS-enabled web server listening on port 80');
});
*/
//import 'regenerator-runtime/runtime';
//import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    // console.log(res.data.status);
    alert('Logged in successfully!');
    showAlert('success', 'Logged in successfully!');
    window.setTimeout(() => {
      location.assign('/');
    }, 500);
  } catch (err) {
    alert(err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    location.reload(true);
    location.assign('/');
    // console.log(res.data.status);
    alert('Logged out successfully!');
    showAlert('success', 'Logged out successfully!');

    if (res.data.status === 'success');
  } catch (err) {
    //console.log(res.data.status);
    //console.log(err.response.data.message);
    alert('Error Logging out.');
    showAlert('error', 'Error Logging out');
  }
};
