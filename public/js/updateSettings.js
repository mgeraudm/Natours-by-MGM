/* eslint-disable */
//import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data: data
    });

    if (res.data.status === 'success') {
      // console.log(`${type.toUpperCase()} updated successfully!`)
      alert('success', `${type.toUpperCase()} updated successfully!`);
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    // console.log(`error ${err.response.data.message}`);
    alert('error', err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};
