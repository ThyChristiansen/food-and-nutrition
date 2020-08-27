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





function* userSaga() {
  yield takeLatest('FETCH_ANSWER', fetchAnswer);
}

export default userSaga;