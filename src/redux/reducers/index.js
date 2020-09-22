import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import {answerReducer,getRandomRecipeReducer} from './landingPageReducer';
import {getRecipeReducer,getRecipeSummrizeReducer} from './searchRecipesReducer';
import {getMealPlan} from './mealPlanReducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  answerReducer,
  getRandomRecipeReducer,
  getRecipeReducer,
  getRecipeSummrizeReducer,
  getMealPlan
});

export default rootReducer;
