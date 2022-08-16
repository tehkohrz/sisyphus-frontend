import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Logo } from '../../atoms';
import './style.css';

export default function HeaderBanner() {
  const navigate = useNavigate();
  function returnToHomePage() {
    navigate('/');
  }
  function sendToLoginPage() {
    navigate('/login');
  }
  // isLoggedIn, userName

  // TEST VARIABLES
  const isLoggedIn = true;
  const userName = 'Jose';

  return (
    <div className='header-banner'>
      <div className='logo-container'>
        <Logo
          className='logo'
          source={''}
          handleClick={returnToHomePage}
        ></Logo>
        <Header className='logo-header' title='Sisyphus' />
      </div>
      <div className='user-elements-container'>
        {/* user is logged in */}
        {isLoggedIn && (
          <>
            <Header className='username' title={userName} />
            <Header className='username' title={'/'} />
            <Button
              name='SignOut'
              className='log-inout' /* handleClick={logout function}*/
            />
          </>
        )}
        {/* user is not logged in */}
        {!isLoggedIn && (
          <Button
            className='log-inout'
            name='Login'
            handleClick={sendToLoginPage}
          ></Button>
        )}
      </div>
    </div>
  );
}
