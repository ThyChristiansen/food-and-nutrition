import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* featchMealPlan(action) {
  try {
    const date = action.payload.date;
    // console.log('featchMealPlan from saga',date)
    const response = yield axios.get(`/mealPlan/${date}`);
    yield put({
      type: 'SET_MEAL_PLAN',
      payload: response.data
    });
    console.log('----->', response.data)
  } catch (error) {
    console.log('featchMealPlan is error:', error);
  }
}

function* addMealPlan(action) {
  try {
    console.log('addMealPlan from saga', action.payload)
    yield axios.post(`/mealPlan`, action.payload);
  } catch (error) {
    console.log('addMealPlan is error:', error);
  }
}



function* calendar() {
  yield takeLatest('ADD_MEAL_PLAN', addMealPlan);
  yield takeLatest('FEATCH_MEAL_PLAN', featchMealPlan);

}

export default calendar;