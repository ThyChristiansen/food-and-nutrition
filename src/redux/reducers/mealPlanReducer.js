export const getMealPlan = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEAL_PLAN':
      return action.payload;
    default:
      return state;
  }
};

export const getAllMealPlan = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_MEAL_PLAN':
      return action.payload
    default:
      return state;
  }
};

