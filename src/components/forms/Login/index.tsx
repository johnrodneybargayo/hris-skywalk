// LoginForm.jsx
import React, { useState } from 'react';
import './styles.scss';

const LoginForm: React.FC<{ onLogin: (email: string, password: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(''); // Reset the error message

    try {
      // Call the onLogin function passed from the parent component
      onLogin(email, password);
    } catch (error) {
      console.error('An error occurred during login:', error);
      setError('An error occurred during login');
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
              <form className="form" onSubmit={handleSubmit} method="POST">
                <label className="label-login" htmlFor="chk" aria-hidden="true">
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
                <label htmlFor="chk" aria-hidden="true" className="label-forgot-pass">
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
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
