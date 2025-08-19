import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch(error => {
        // Handle case where user is already logged out
        console.log('Logout error:', error);
        dispatch(logout()); // Still update Redux state
      });
  };

  return (
    <button
      className='inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'
      onClick={logOutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
