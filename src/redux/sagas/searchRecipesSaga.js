import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchAutoCompleteRecipes(action) {
  try {
    const input = action.payload.input
    console.log('input from saga',input)

    const response = yield axios.get(`/api/searchRecipes/${input}`)
    yield put({
      type: 'SET_AUTO_COMPLETE_RECIPES',
      payload: response.data

    });
    console.log('-------->from fetchAutoCompleteRecipesSaga',response.data)

  } catch (error) {
    console.log('Search recipes title is error:', error);
  }
}

function* searchRecipesSaga() {
  yield takeLatest('FETCH_AUTO_COMPLETE_RECIPES', fetchAutoCompleteRecipes);
}

export default searchRecipesSaga;