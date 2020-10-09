import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
const moment = require("moment");



function* fetchPayment(action) {
  try {
    const response = yield axios.get(`/payment/${action.payload.date}`)
    yield put({
      type: 'SET_PAYMENT',
      payload: response.data
    });
  } catch (error) {
    console.log('Payment is error:', error);
  }
}

function* addPayment(action) {
  try {
    // console.log('addPayment from saga', action.payload)
    let dateAfterFormat = moment(action.payload.date).format("MM")
    yield axios.post(`/payment`, action.payload);
    // console.log(action.payload)
    yield put({
      type: 'FETCH_PAYMENT',
      payload: {date:dateAfterFormat}
    });
  } catch (error) {
    console.log('addPayment is error:', error);
  }
}

function* editPayment(action) {
  try {
    console.log('addPayment from saga', action.payload.date)
    yield axios.put(`/payment`, action.payload);
    console.log(action.payload)
    yield put({
      type: 'FETCH_PAYMENT',
      payload: {date:action.payload.date}
    });
  } catch (error) {
    console.log('editPayment is error:', error);
  }
}





function* paymentPageSaga() {
  yield takeLatest('ADD_PAYMENT', addPayment);
  yield takeLatest('FETCH_PAYMENT', fetchPayment);
  yield takeLatest('EDIT_PAYMENT', editPayment);

  
}

export default paymentPageSaga;