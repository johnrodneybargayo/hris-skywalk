import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Modal from 'react-modal'; // Import Modal from react-modal

// Set the app element for react-modal
Modal.setAppElement('#root');

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
