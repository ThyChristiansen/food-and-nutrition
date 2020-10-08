const paymentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PAYMENT':
      console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
};

export default paymentReducer;
