import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../../components/forms/Login';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string>('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const apiKey = 'AIzaSyAI1NsFZrRaBSRCtj8TkIxA3Mg-qYFDRzg'; // Replace with your actual API key

      // const response = await axios.post('https://empireone-global-inc.uc.r.appspot.com/api/login',
            const response = await axios.post('http://localhost:8080/api/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        if (data.token) {
          localStorage.setItem('accessToken', data.token);
          history.push('/dashboard');
        } else {
          setError(data.error);
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
      <LoginForm onLogin={handleLogin} />
      {error && <p className='error-login'>{error}</p>}
    </div>
  );
};

export default LoginPage;
