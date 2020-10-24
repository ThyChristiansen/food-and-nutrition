import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMealPlan(action) {
  try {
    const date = action.payload.date;
    console.log('fetchMealPlan from saga',date)
    const response = yield axios.get(`/mealPlan/${date}`);
    yield put({
      type: 'SET_MEAL_PLAN',
      payload: response.data
    });
    console.log('----->', response.data)
  } catch (error) {
    console.log('fetchMealPlan is error:', error);
  }
}

function* addMealPlan(action) {
  try {
    console.log('addMealPlan from saga', action.payload)
    yield axios.post(`/mealPlan`, action.payload);
    yield put({
      type: 'FETCH_MEAL_PLAN',
      payload: { date: action.payload.date }
    });
  } catch (error) {
    console.log('addMealPlan is error:', error);
  }
}

function* editMealPlan(action) {
  try {
    console.log('editMealPlan from saga', action.payload)
    yield axios.put(`/mealPlan`, action.payload);
    yield put({
      type: 'FETCH_MEAL_PLAN',
      payload: { date: action.payload.date }
    });
  } catch (error) {
    console.log('editMealPlan is error:', error);
  }
}

function* addRecipeToCalendar(action) {
  try {
    console.log('addMealPlan from saga', action.payload.item.id)

    yield axios.post(`/mealPlan/addRecipe`, action.payload);
    console.log(action.payload.date)
    yield put({
      type: 'FETCH_MEAL_PLAN',
      payload: { date: action.payload.date }
    });
  } catch (error) {
    console.log('addRecipeToCalendar is error:', error);
  }
}



function* calendar() {
  yield takeLatest('ADD_MEAL_PLAN', addMealPlan);
  yield takeLatest('FETCH_MEAL_PLAN', fetchMealPlan);
  yield takeLatest('EDIT_MEAL_PLAN', editMealPlan);
  yield takeLatest('ADD_RECIPE_TO_CALENDAR', addRecipeToCalendar);

}

export default calendar;