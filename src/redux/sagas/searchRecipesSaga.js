import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchRecipes(action) {
  try {
    const input = action.payload.input;
    const typeMeal = action.payload.meal;
    const minCalories = action.payload.calories[0];
    const maxCalories = action.payload.calories[1];
    const minFat = action.payload.fat[0];
    const maxFat = action.payload.fat[1];
    const minProtein = action.payload.protein[0];
    const maxProtein = action.payload.protein[1];
    const intolerances = action.payload.intolerances;


    console.log('input from saga', input, typeMeal, minCalories, maxCalories, minFat, maxFat,minProtein,maxProtein, intolerances)

    const response = yield axios.get(`/api/searchRecipes/${input}/${typeMeal}/${minCalories}/${maxCalories}/${minFat}/${maxFat}/${minProtein}/${maxProtein}/${intolerances}`)
    yield put({
      type: 'SET_RECIPES',
      payload: response.data
    });
    console.log('-------->from fetchAutoCompleteRecipesSaga', response.data)

  } catch (error) {
    console.log('Search recipes title is error:', error);
  }

}

function* searchRecipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
}

export default searchRecipesSaga;