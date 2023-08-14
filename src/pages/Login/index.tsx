import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import LoginForm from '../../components/forms/Login';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string>('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const apiKey = 'AIzaSyAI1NsFZrRaBSRCtj8TkIxA3Mg-qYFDRzg'; // Replace with your actual API key

      const response = await axios.post('https://empireone-global-inc.uc.r.appspot.com/api/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-API-Key': apiKey,
        },
      });

      console.log('Response:', response); // Add this logging statement

      if (response.status === 200) {
        const data = response.data;
        if (data.token) {
          console.log('Login successful');
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
      setError('An error occurred during login');
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
