import { showAlert } from './alerts';
import axios from 'axios';

// type is either 'password' or 'data
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updatePassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status == 'success') {
      // location.reload(true);
      showAlert('success', `${type.toUpperCase()} updated succesfully`);
    }
  } catch (err) {
    showAlert('error', 'Failed to udpate User Data, Please try again!');
  }
};
