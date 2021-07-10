import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
    
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './app/reducers';
import { createStore,applyMiddleware,compose } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);