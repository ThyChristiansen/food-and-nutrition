export const getMealPlan = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEAL_PLAN':
      console.log("---->", action.payload)
      return action.payload;
    default:
      return state;
  }
};