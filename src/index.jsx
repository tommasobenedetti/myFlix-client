import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>

        <MainView />

      </Provider>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

//adds the redux tool extension
const store = createStore(moviesApp, devToolsEnhancer());

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);