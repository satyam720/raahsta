import axios from 'axios';
import { showAlert } from './alerts.js';

export const signup = async function (data) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'User signed up successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
      return true;
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message || 'Unable to sign up. Please try again.');
  }
  return false;
};
