import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/Utils/authContext'; // Import the AuthProvider

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <AuthProvider> {/* Wrap your App component with AuthProvider */}
      <App />
    </AuthProvider>
  </Router>,
  rootElement
);
