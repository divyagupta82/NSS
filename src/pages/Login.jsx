import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../login.css";

export default function AuthForm({ setIsLoggedIn, isLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isUser, setIsUser] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const passwordValid = /^[A-Za-z\d@$!%*?&]{6,}$/.test(formData.password);
    if (!passwordValid) {
      setErrorMessage('Password must be at least 6 characters long and include at least one special character.');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const endpoint = isUser
        ? (isLogin ? '/api/user/login' : '/api/user/signup')
        : '/api/admin/login';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);

        // Redirect based on whether the user is an admin or not
        if (isUser) {
          navigate('/');
        } else {
          navigate('/admin');
        }
      } else {
        setErrorMessage(data.message || 'Request failed.');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  const switchToUser = () => {
    setIsUser(true);
    setIsLogin(true);
  };

  const switchToAdmin = () => {
    setIsUser(false);
    setIsLogin(true);
  };

  return (
    <div className='container'>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className='form-container'>
        <div className='form-toggle'>
          <button className={isUser ? 'active' : ""} onClick={switchToUser}>
            User
          </button>
          <button className={!isUser ? 'active' : ""} onClick={switchToAdmin}>
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isUser ? (
            isLogin ? (
              <div className='form'>
                <h2>User Login</h2>
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <a href='#'>Forgot Password?</a>
                <button type='submit'>Login</button>
                <p>Not a Member? <a href='#' onClick={toggleForm}>Signup now</a></p>
              </div>
            ) : (
              <div className='form'>
                <h2>User Signup</h2>
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button type='submit'>Signup</button>
                <p>Already a Member? <a href='#' onClick={toggleForm}>Login now</a></p>
              </div>
            )
          ) : (
            <div className='form'>
              <h2>Admin Login</h2>
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required
              />
              <a href='#'>Forgot Password?</a>
              <button type='submit'>Login</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
