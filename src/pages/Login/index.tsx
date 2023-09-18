import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../../components/forms/Login';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');

  // Fetch the API key from the backend when the component mounts
  useEffect(() => {
    axios.get('https://empireone-global-inc.uc.r.appspot.com/api/get-api-key')
      .then((response) => {
        const { apiKey } = response.data;
        setApiKey(apiKey);
      })
      .catch((error) => {
        console.error('Error fetching API key:', error);
      });
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
     const loginUrl = 'https://empireone-global-inc.uc.r.appspot.com/api/login';
   //  const loginUrl = 'http://localhost:8080/api/login';

      console.log('Attempting login...');
      const response = await axios.post(
        loginUrl,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey, // Use the API key obtained from the backend
          },
        }
      );

      console.log('Login response:', response);

      if (response.status === 200) {
        const data = response.data;
        if (data.token) {
          // Set a cookie to store the user's authentication token
          Cookies.set('authToken', data.token);

          // Redirect the user to the dashboard
          history.push('/dashboard');
        } else {
          setError(data.error || 'An error occurred during login');
        }
      } else {
        setError(response.data.error || 'An error occurred during login');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setError('Invalid email or password. Please enter them again.');
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} isAuthenticated={false} />
      {error && <p className='error-login'>{error}</p>}
    </div>
  );
};

export default LoginPage;
