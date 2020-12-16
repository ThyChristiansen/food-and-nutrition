import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
const moment = require("moment");

function* fetchPayment(action) {
  try {
    const response = yield axios.get(`/api/payment/general-payment/${action.payload.date}`)
    yield put({
      type: 'SET_PAYMENT',
      payload: response.data
    });
    // console.log('----------->',response.data)
  } catch (error) {
    console.log('Payment is error:', error);
  }
}

function* addPayment(action) {
  try {
    let dateAfterFormat = action.payload.date;
    let year = moment(action.payload.date).format("YYYY");

    yield axios.post(`/api/payment`, action.payload);
    // console.log(action.payload)
    yield put({
      type: 'FETCH_PAYMENT',
      payload: { date: dateAfterFormat }
    });
    yield put({
      type: 'FETCH_TOTAL_PAYMENT_BY_MONTH',
      payload: year
    })
  } catch (error) {
    console.log('addPayment is error:', error);
  }
}

function* editPayment(action) {
  try {
    // console.log('addPayment from saga', action.payload.date);
    let year = moment(action.payload.date).format("YYYY");
    yield axios.put(`/api/payment`, action.payload);

    yield put({
      type: 'FETCH_PAYMENT',
      payload: { date: action.payload.date }
    });
    yield put({
      type: 'FETCH_TOTAL_PAYMENT_BY_MONTH',
      payload: year 
    })
  } catch (error) {
    console.log('editPayment is error:', error);
  }
}

function* fetchTotalPaymentByMonth(action) {
  try {
    const response = yield axios.get(`/api/payment/total-payment/${action.payload}`)
    yield put({
      type: 'GET_TOTAL_PAYMENT_BY_MONTH',
      payload: response.data
    });
    
  } catch (error) {
    console.log('fetchTotalPaymentByMonth is error:', error);
  }
}

function* deletePayment(action) {
  try {
    let year = moment(action.payload.date).format("YYYY");
    yield axios.delete(`/api/payment/${action.payload.id}`);
    yield put({
      type: 'FETCH_PAYMENT',
      payload: { date: action.payload.date }
    });
    yield put({
      type: 'FETCH_TOTAL_PAYMENT_BY_MONTH',
      payload: year
    })
  } catch (error) {
    console.log('deletePayment is error:', error);
  }
}

function* paymentPageSaga() {
  yield takeLatest('ADD_PAYMENT', addPayment);
  yield takeLatest('FETCH_PAYMENT', fetchPayment);
  yield takeLatest('EDIT_PAYMENT', editPayment);
  yield takeLatest('FETCH_TOTAL_PAYMENT_BY_MONTH', fetchTotalPaymentByMonth);
  yield takeLatest('DELETE_PAYMENT', deletePayment);

}

export default paymentPageSaga;