import React from 'react';
import { Button, Header } from '../../atoms';
import { useAuth } from '../../hooks/use-auth';
import './style.css';

export default function HeaderBanner() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className='header-banner'>
      <div className='logo-container'>
        <Header className='logo-header' title='Sisyphus' />
      </div>
      <div className='user-elements-container'>
        {/* user is logged in */}
        {isAuthenticated && (
          <>
            <Header className='username' title={user.username} />
            <Header className='username' title={'/'} />
            <Button name='SignOut' className='log-inout' />
          </>
        )}
      </div>
    </div>
  );
}
