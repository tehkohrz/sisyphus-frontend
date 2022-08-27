import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Logo } from '../../atoms';
import { useAuth } from '../../hooks/use-auth';
import './style.css';

export default function HeaderBanner() {
  const navigate = useNavigate();
  function returnToHomePage() {
    navigate('/journal');
  }
  // function sendToLoginPage() {
  //   navigate('/login');
  // }
  // isLoggedIn, userName
  const { isAuthenticated, user } = useAuth();

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
        {isAuthenticated && (
          <>
            <Header className='username' title={user.username} />
            <Header className='username' title={'/'} />
            <Button
              name='SignOut'
              className='log-inout' /* handleClick={logout function}*/
            />
          </>
        )}
      </div>
    </div>
  );
}
