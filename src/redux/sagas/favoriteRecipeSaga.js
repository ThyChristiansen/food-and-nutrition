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


function* fetchTriedList(action) {
  try {
    const response = yield axios.get('/favorite-recipe/tried');
    yield put({
      type: 'SET_TRIED_LIST',
      payload: response.data
    });
    console.log('----->', response.data)
  } catch (error) {
    console.log('Fetch tried recipe error', error);
  }
}

function* deleteFavoriteList(action) {
  try {
    let id = action.payload.item.id
    yield axios.delete(`/favorite-recipe/delete-out-off-list/${id}`);
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
      payload: action.payload
    });
  } catch (error) {
    console.log('Add to favorite list Notification  error', error);
  }
}

function* moveFavoriteRecipeToTried(action) {
  try {
    console.log(action.payload)
    yield axios.post('/favorite-recipe/drop-to-tried-list', action.payload);
    
    // yield axios.delete('/favorite-recipe/delete', action.payload)
    
  } catch (error) {
    console.log('moveFavoriteRecipeToTried error', error);
  }
}

function* moveTriedRecipeToFavorite(action) {
  try {
    console.log(action.payload)
    yield axios.post('/favorite-recipe/drop-to-favorite-list', action.payload);
  } catch (error) {
    console.log('moveTriedRecipeToFavorite error', error);
  }
}

function* favoriteRecipeSaga() {
  yield takeLatest('ADD_FAVORITE_RECIPE', addToFavorite);
  yield takeLatest('FEATCH_FAVORITE_RECIPE', fetchFavoriteList);
  yield takeLatest('DELETE_FAVORITE_RECIPE', deleteFavoriteList);
  yield takeLatest('NOTIFICATION_BADGE', showNotification);
  yield takeLatest('FEATCH_TRIED_RECIPE', fetchTriedList);
  yield takeLatest('MOVE_FAVORITE_RECIPE_TO_TRIED', moveFavoriteRecipeToTried);
  yield takeLatest('MOVE_TRIED_RECIPE_TO_FAVORITE', moveTriedRecipeToFavorite);


}

export default favoriteRecipeSaga;
