import React, { useState } from 'react';
import './LoginForm.css';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="container">
      <div className="form_background">
      <img className="logo" src="https://empireonecontactcenter.com/wp-content/uploads/2023/03/Contact-Center-logo.png"/>
        <div className="image-placeholder"></div>
        <div className="form-container">
          <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="login">
              <form className="form">
                <label htmlFor="chk" aria-hidden="true">HRIS Sign in</label>
                <input id='email' className="input" type="email" name="email" placeholder="Email" required />
                <input id='passwd' className="input" type="password" name="pswd" placeholder="Password" required />
                <button>Log in</button>
              </form>
            </div>

            <div className="register">
              <form className="form">
                <label htmlFor="chk" aria-hidden="true">Password Reset</label>
                <p className='forgot-pass'>Enter the email address or username associated with your account. A reset instruction will be provided in the email to reset your password</p>
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

export { }; // Add an empty export statement to make it a module
