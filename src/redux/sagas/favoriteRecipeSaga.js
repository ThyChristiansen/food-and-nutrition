import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addToFavorite(action) {
  try {
    console.log(action.payload)
    const response = yield axios.post('/favorite-recipe', action.payload);
    

  } catch (error) {
    console.log('Add favorite recipe error', error);
  }
}

function* favoriteRecipeSaga() {
  yield takeLatest('ADD_FAVORITE_RECIPE', addToFavorite);
}

export default favoriteRecipeSaga;
