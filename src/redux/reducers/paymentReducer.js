export const paymentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PAYMENT':
      // console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
};

export const totalPaymentByMonthReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_TOTAL_PAYMENT_BY_MONTH':
      // console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
};



