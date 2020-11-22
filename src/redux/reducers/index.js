import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import {answerReducer,getRandomRecipeReducer} from './landingPageReducer';
import {getRecipeReducer,getRecipeSummrizeReducer,getRecipeDetailReducer,getSimilarRecipeReducer} from './searchRecipesReducer';
import {getMealPlan,getAllMealPlan} from './mealPlanReducer';
import {getFavoriteRecipe,getTriedRecipe,setNotification } from './favoriteRecipeReducer';
import {paymentReducer,totalPaymentByMonthReducer } from './paymentReducer';

const rootReducer = combineReducers({
  errors,
  loginMode, 
  user,
  answerReducer,
  getRandomRecipeReducer,
  getRecipeReducer,
  getRecipeSummrizeReducer,
  getMealPlan,
  getRecipeDetailReducer,
  getFavoriteRecipe,
  getSimilarRecipeReducer,
  setNotification,
  paymentReducer,
  totalPaymentByMonthReducer,
  getTriedRecipe,
  getAllMealPlan
});

export default rootReducer;
