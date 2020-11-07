import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addToFavorite(action) {
  try {
    console.log(action.payload)
    yield axios.post('/favorite-recipe', action.payload);
  } catch (error) {
    console.log('Add favorite recipe error', error);
  }
}

function* fetchFavoriteList() {
  try {
    const response = yield axios.get('/favorite-recipe');
    yield put({
      type: 'SET_FAVORITE_LIST',
      payload: response.data
    });
    // console.log('----->', response.data)
  } catch (error) {
    console.log('Fetch favorite recipe error', error);
  }
}

function* fetchTriedList() {
  try {
    const response = yield axios.get('/favorite-recipe/tried');
    yield put({
      type: 'SET_TRIED_LIST',
      payload: response.data
    });
    // console.log('----->', response.data)
  } catch (error) {
    console.log('Fetch tried recipe error', error);
  }
}

function* deleteFavoriteList(action) {
  try {
    axios.delete(`/favorite-recipe/delete-out-off-list/${action.payload.itemId}/${action.payload.droppableId}`);
    yield put({
      type: 'FETCH_FAVORITE_RECIPE',
    });
    yield put({
      type: 'FETCH_TRIED_RECIPE',
    });
  } catch (error) {
    console.log('Error with delete favorite recipe:', error);
  }
}

function* showNotification(action) {
  try {
    yield put({
      type: 'SET_NOTIFICATION',
      payload: action.payload
    });
  } catch (error) {
    console.log('Add to favorite list Notification  error', error);
  }
}

function* moveFavoriteRecipeToTried(action) {
  try {
    let id = action.payload.id
    console.log(id)
    yield axios.post('/favorite-recipe/drop-to-tried-list', action.payload);
    yield axios.delete(`/favorite-recipe/favorite-recipe-deleted-after-drag/${id}`)
  } catch (error) {
    console.log('moveFavoriteRecipeToTried error', error);
  }
}

function* moveTriedRecipeToFavorite(action) {
  try {
    let id = action.payload.id
    console.log('----->',id)
    yield axios.post('/favorite-recipe/drop-to-favorite-list', action.payload);
    yield axios.delete(`/favorite-recipe/tried-recipe-deleted-after-drag/${id}`)
  } catch (error) {
    console.log('moveTriedRecipeToFavorite error', error);
  }
}

function* favoriteRecipeSaga() {
  yield takeLatest('ADD_FAVORITE_RECIPE', addToFavorite);
  yield takeLatest('FETCH_FAVORITE_RECIPE', fetchFavoriteList);
  yield takeLatest('DELETE_FAVORITE_RECIPE', deleteFavoriteList);
  yield takeLatest('NOTIFICATION_BADGE', showNotification);
  yield takeLatest('FETCH_TRIED_RECIPE', fetchTriedList);
  yield takeLatest('MOVE_FAVORITE_RECIPE_TO_TRIED', moveFavoriteRecipeToTried);
  yield takeLatest('MOVE_TRIED_RECIPE_TO_FAVORITE', moveTriedRecipeToFavorite);


}

export default favoriteRecipeSaga;
