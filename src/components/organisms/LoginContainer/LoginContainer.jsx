import React, { useState } from 'react';
import { Input, Button } from '../../atoms';
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

export default function LoginElement() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isAuthenticated, reAuth } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Authenticated redirect');
      navigate('/journal');
    }
  }, [isAuthenticated]);
  //! change Handlers for the inputs
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  //! event for login button
  const loginHandler = async () => {
    try {
      // Input checks for login, redirecting to toast msg
      if (!username) {
        throw new Error('Please enter username');
      }

      if (!password) {
        throw new Error('Please enter password');
      }
      await signIn(username, password);
      if (isAuthenticated) {
        console.log('Logged In');
        navigate('/journal');
      }
    } catch (err) {
      toast(err.message);
      console.log(err);
    }
  };
  return (
    <div className='login-container'>
      <ToastContainer />
      <p className='title'>Login</p>
      <Input
        className='login-input'
        placeholder='Username'
        changeHandler={usernameHandler}
        value={username}
        id='username'
      ></Input>
      <Input
        className='login-input'
        placeholder='Password'
        changeHandler={passwordHandler}
        value={password}
        id='password'
      ></Input>
      <div className='button-container'>
        <Button
          className='login-button'
          name='SignIn'
          handleClick={loginHandler}
        ></Button>
      </div>
    </div>
  );
}
