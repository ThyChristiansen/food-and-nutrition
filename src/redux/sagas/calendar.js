import axios from 'axios';
import { put,takeLatest } from 'redux-saga/effects';


function* addMealPlan(action) {
  try {
    // const mealPlan= {
    //    mealTitle : action.payload.mealTitle,
    //    mealType : action.payload.mealType,
    //    mealDescription : action.payload.mealDescription,
    // }
    console.log('addMealPlan from saga',action.payload)

    const response = yield axios.post(`/addMealPlan`, action.payload)
  } catch (error) {
    console.log('addMealPlan is error:', error);
  }
}

function* calendar() {
  yield takeLatest('ADD_MEAL_PLAN', addMealPlan);
}

export default calendar;