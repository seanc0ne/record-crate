// Add a source
// export const addSource = (formData) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };
//     const res = await axios.put('/api/source', formData, config);
//     dispatch({
//       type: UPDATE_TRACK,
//       payload: res.data,
//     });
//     dispatch(setAlert('Source added', 'success'));
//   } catch (err) {
//     const errors = err.response.data.errors; // we want to display the array of errors
//     // if there are errors we want to dispatch an alert for each of them
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//     }
//     dispatch({
//       type: TRACK_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
