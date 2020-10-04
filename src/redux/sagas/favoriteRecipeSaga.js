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


function* fetchFavoriteList(action) {
  try {
    const response = yield axios.get('/favorite-recipe');
    yield put({
      type: 'SET_FAVORITE_LIST',
      payload: response.data
    });
    console.log('----->', response.data)
  } catch (error) {
    console.log('Fetch favorite recipe error', error);
  }
}

function* deleteFavoriteList(action) {
  try {
    let id = action.payload.item.id
    yield axios.delete(`/favorite-recipe/${id}`);
    console.log('--->DELETE this recipe :', action.payload.item)
    yield put({
      type: 'FEATCH_FAVORITE_RECIPE',
    });
  } catch (error) {
    console.log('Error with delete favorite recipe:', error);
  }
}

function* showNotification(action) {
  try {
    yield put({
      type: 'SET_NOTIFICATION',
      payload:action.payload
    });
  } catch (error) {
    console.log('Add to favorite list Notification  error', error);
  }
}


function* favoriteRecipeSaga() {
  yield takeLatest('ADD_FAVORITE_RECIPE', addToFavorite);
  yield takeLatest('FEATCH_FAVORITE_RECIPE', fetchFavoriteList);
  yield takeLatest('DELETE_FAVORITE_RECIPE', deleteFavoriteList);
  yield takeLatest('NOTIFICATION_BADGE', showNotification);


}

export default favoriteRecipeSaga;
