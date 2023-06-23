import React, { useState } from 'react';
import './styles.scss';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Make a POST request to the login endpoint on the backend server
      const response = await fetch('/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        // Login successful
        // Perform any necessary actions (e.g., redirect to dashboard)
        console.log('Login successful');
        window.location.href = '/dashboard';
      } else {
        // Login failed
        const data = await response.json();
        console.log('Login failed:', data.message);
        window.location.href = '/404Error';
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      window.location.href = '/404Error';
    }
  };

  return (
    <div className="container">
      <div className="form_background">
        <img
          className="logo"
          src="https://empireonecontactcenter.com/wp-content/uploads/2023/03/Contact-Center-logo.png"
          alt="Logo"
        />
        <div className="image-placeholder"></div>
        <div className="form-container">
          <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="login">
              <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="chk" aria-hidden="true">
                  HRIS Sign in
                </label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  id="passwd"
                  className="input"
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="has-text-right margin-26">
                  <label id="remeber" htmlFor="remember-me">
                    Remember me
                  </label>
                  <input type="checkbox" id="remember-me" name="remember-me" />
                </div>
                <button type="submit">Log in</button>
              </form>
            </div>

            <div className="register">
              <form className="form">
                <label htmlFor="chk" aria-hidden="true">
                  Password Reset
                </label>
                <p className="forgot-pass">
                  Enter the email address or username associated with your account. A reset instruction will be provided
                  in the email to reset your password
                </p>
                <input className="input" type="email" name="email" placeholder="Email" required />
                <button>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;