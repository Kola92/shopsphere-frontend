import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticatedUserId } from '../redux/usersSlice';
import '../assets/scss/Login.scss';

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const users = useSelector((state) => state.users);

	const [credentials, setCredentials] = useState({ email: '', password: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [loginStatus, setLoginStatus] = useState(null);
	const [rememberMe, setRememberMe] = useState(false);

	const handleLogin = () => {
		const { email, password } = credentials;

		// Check if the email and password match a user's data
		const matchedUser = users.usersList.find(
			(user) => user.email === email && user.password === password
		);

		if (matchedUser) {
			setLoginStatus('success'); // Set login success status
			setTimeout(() => {
				// Redirect to home after a few seconds
				dispatch(setAuthenticatedUserId(matchedUser.id));
				navigate('/profile');
			}, 3000);
		} else {
			setLoginStatus('error'); // Set login error status
		}
	};

	return (
		<div className='login-container container '>
			{loginStatus === 'success' && (
				<div className='px-4 mt-5'>
					<p className='success-message'>Login successful!</p>
				</div>
			)}
			{loginStatus === 'error' && (
				<div className='px-4 mt-5'>
					<p className='error-message'>Login failed. Please try again.</p>
				</div>
			)}
			<div className='row'>
				<div className='col-12 col-lg-6 form-column px-lg-4'>
					<div className='login-header'>
						<div className='brand'>
							<div className='logo'>
								<img src='/images/shopsphere-logo.png' alt='Logo' />
							</div>
							<span>ShopSphere Store</span>
						</div>

						<div className='mt-2 text-center login-heading'>
							<h2>Welcome Back</h2>
						</div>
					</div>

					<form>
						<div className='mb-3'>
							<div className='input-group'>
								<span className='input-group-text'>
									<i className='bi bi-person'></i>
								</span>
								<input
									type='email'
									className='form-control'
									placeholder='Email'
									id='email'
									name='email'
									autoComplete='on'
									value={credentials.email}
									onChange={(e) =>
										setCredentials({ ...credentials, email: e.target.value })
									}
								/>
							</div>
						</div>

						<div className='mb-1'>
							<div className='input-group'>
								<span className='input-group-text'>
									<i className='bi bi-lock'></i>
								</span>
								<input
									type={showPassword ? 'text' : 'password'}
									className='form-control'
									placeholder='Password'
									value={credentials.password}
									id='current-password'
									name='current-password'
									autoComplete='on'
									onChange={(e) =>
										setCredentials({ ...credentials, password: e.target.value })
									}
								/>
								<span
									className='input-group-text input-group-text-password toggle-visibility'
									onClick={() => setShowPassword(!showPassword)}>
									<i
										className={`bi ${
											showPassword ? 'bi-eye-slash' : 'bi-eye'
										}`}></i>
								</span>
							</div>
						</div>

						<div className='login-form-footer mb-5'>
							<div className='remember-forgot'>
								<div className='form-check mb-0'>
									<input
										className='form-check-input'
										type='checkbox'
										id='keepLogged'
										checked={rememberMe}
										onChange={() => setRememberMe(!rememberMe)}
									/>
									<label className='form-check-label' htmlFor='keepLogged'>
										Keep me logged in
									</label>
								</div>

								<div className='forgot-password'>
									<a href='/forgot-password'>Forgot your password?</a>
								</div>
							</div>
						</div>

						<button
							type='button'
							className='btn btn-login'
							onClick={handleLogin}>
							Log in
						</button>

						<div className='signup-link'>
							Don't have an account? <a href='/signup'>Sign up</a>
						</div>
					</form>
				</div>

				<div className='col-lg-6 d-none d-lg-flex pe-lg-0'>
					<div className='signin-bg'></div>
				</div>
			</div>
		</div>
	);
};
