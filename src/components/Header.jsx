import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, clearAuthenticatedUserId } from '../redux/usersSlice';

const Header = () => {
	const cartItems = useSelector((state) => state.cart);
	const authenticatedUserId = useSelector(
		(state) => state.users.authenticatedUserId
	);

	const dispatch = useDispatch();

	// Logout user
	const handleLogout = () => {
		dispatch(clearUser());
		dispatch(clearAuthenticatedUserId());
	};

	const cartItemCount = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	return (
		<header className='header'>
			<nav
				className='navbar navbar-expand-lg navbar-light
      '>
				<NavLink to='/' className='navbar-brand'>
					<img src='/images/logo.png' alt='Logo' />
				</NavLink>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse justify-content-end'
					id='navbarNav'>
					<ul className='navbar-nav ml-auto'>
						<li className='nav-item'>
							<NavLink
								to='/'
								className={({ isActive }) =>
									`nav-link ${isActive ? 'active' : ''}`
								}>
								Home
							</NavLink>
						</li>

						{authenticatedUserId ? (
							<>
								<li className='nav-item'>
									<NavLink
										to='/cart'
										className={({ isActive }) =>
											`nav-link ${isActive ? 'active' : ''}`
										}>
										Cart
									</NavLink>
								</li>

								<li className='nav-item'>
									<NavLink
										to='/profile'
										className={({ isActive }) =>
											`nav-link ${isActive ? 'active' : ''}`
										}>
										Profile
									</NavLink>
								</li>

								<li>
									<NavLink
										to='/cart'
										className={({ isActive }) =>
											`position-relative cart-link-icon ${
												isActive ? 'active' : ''
											}`
										}>
										<i className='bi bi-cart-fill'></i>
										<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
											{cartItemCount}
											<span className='visually-hidden'>items in cart</span>
										</span>
									</NavLink>
								</li>
								<li className='nav-item'>
									<button
										className='nav-link btn logout-btn'
										onClick={handleLogout}>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li className='nav-item'>
									<NavLink
										to='/signup'
										className={({ isActive }) =>
											`nav-link ${isActive ? 'active' : ''}`
										}>
										Sign Up
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										to='/login'
										className={({ isActive }) =>
											`nav-link ${isActive ? 'active' : ''}`
										}>
										Login
									</NavLink>
								</li>
								<li>
									<NavLink
										to='/cart'
										className={({ isActive }) =>
											`position-relative cart-link-icon ${
												isActive ? 'active' : ''
											}`
										}>
										<i className='bi bi-cart-fill'></i>
										<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
											{cartItemCount}
											<span className='visually-hidden'>items in cart</span>
										</span>
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
