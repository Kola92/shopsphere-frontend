import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthenticatedUserId } from '../redux/usersSlice';

const UserProfile = () => {
  const authenticatedUserId = useSelector(
    (state) => state.users.authenticatedUserId
  );
  const users = useSelector((state) => state.users.userList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = users.find((user) => user.id === authenticatedUserId);

  const handleLogout = () => {
    dispatch(clearAuthenticatedUserId);
    navigate('/login');
  };

  return (
    <div className='user-profile container mt-4'>
      {authenticatedUserId ? (
        <>
          <h2 className='user-profile__title'>Welcome, {user.name}!</h2>
          <div className='user-profile__info'>
            <p>Email: {user.email}</p>
            {/* <p>Email: user.email</p> */}
            <p>Orders: {user.orders.length}</p>
            {/* <p>Orders: user.orders.length</p> */}
          </div>

          <div className='user-profile__actions'>
            <Link to='/cart' className='btn btn-primary user-profile__link'>
              View Cart
            </Link>
            <Link
              to='/profile/edit'
              className='btn btn-secondary user-profile__link'
            >
              Edit Profile
            </Link>
            <button
              className='btn user-profile__logout-btn'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <p>You are not authenticated. Please log in or sign up.</p>
      )}
    </div>
  );
};

export default UserProfile;
