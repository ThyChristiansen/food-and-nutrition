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
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
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
