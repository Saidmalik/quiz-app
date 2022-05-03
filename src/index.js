import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducer from './redux/reducers/rootReducer';
// import reduxThunk from 'redux-thunk';

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(reduxThunk))
// );

// const app = (
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
// );

// ReactDOM.render(app, document.getElementById('root'));

// reportWebVitals();
