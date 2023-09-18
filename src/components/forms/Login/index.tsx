import React, { useState } from 'react';
import './styles.scss';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isAuthenticated: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isAuthenticated }) => {
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
    <div className="custom-container">
      <div className="custom-form_background">
        <img
          className="custom-logo"
          src="https://empireonecontactcenter.com/wp-content/uploads/2023/03/Contact-Center-logo.png"
          alt="Logo"
        />
        <div className="custom-image-placeholder"></div>
        <div className="custom-form-container">
          <div className="custom-main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="custom-login">
              {isAuthenticated ? (
                <p>Welcome, User!</p>
              ) : (
                <form className="custom-form" onSubmit={handleSubmit} method="POST">
                  <label className="custom-label-login" htmlFor="chk" aria-hidden="true">
                    HRIS Sign in
                  </label>
                  <input
                    id="custom-email"
                    className="custom-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    id="custom-passwd"
                    className="custom-input"
                    type="password"
                    name="pswd"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="custom-has-text-right margin-26">
                    <label id="custom-remeber" htmlFor="custom-remember-me">
                      Remember me
                    </label>
                    <input type="checkbox" id="custom-remember-me" name="remember-me" />
                  </div>
                  <button type="submit">Log in</button>
                </form>
              )}
            </div>

            <div className="custom-register">
              <form className="custom-form">
                <label htmlFor="chk" aria-hidden="true" className="custom-label-forgot-pass">
                  Password Reset
                </label>
                <p className="custom-forgot-pass">
                  Enter the email address or username associated with your account. A reset instruction will be provided
                  in the email to reset your password
                </p>
                <input className="custom-input" type="email" name="email" placeholder="Email" required />
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
