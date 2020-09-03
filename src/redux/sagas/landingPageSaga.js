import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* fetchAnswer(action) {
  try {
    const question = action.payload.question
    console.log('question from saga',question)
    const response = yield axios.get(`/api/landingpage/${question}`)
    yield put({
      type: 'SET_ANSWER',
      payload: response.data
    });

  } catch (error) {
    console.log('Answer is error:', error);
  }
}

function* fetchRecipe(action) {
  try {
    const meal = action.payload.meal
    const response = yield axios.get(`/api/landingpage/recipes/${meal}`)
    yield put({
      type: 'SET_RECIPE',
      payload: response.data
    });
  } catch (error) {
    console.log('Recipe is error:', error);
  }
}



function* landingPageSaga() {
  yield takeLatest('FETCH_ANSWER', fetchAnswer);
  yield takeLatest('FETCH_RECIPE', fetchRecipe);
}

export default landingPageSaga;