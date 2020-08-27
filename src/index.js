import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './redux/reducers'; // imports ./redux/reducers/index.js
import rootSaga from './redux/sagas'; // imports ./redux/sagas/index.js
import App from './components/App/App';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const sagaMiddleware = createSagaMiddleware();



const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewareList),
);

sagaMiddleware.run(rootSaga);

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Quicksand"', "sans-serif"].join(","),
  },
  palette: {
    primary: { main: "#F8E16C" },
    secondary: { main: "#195C60" },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('react-root'),
);
