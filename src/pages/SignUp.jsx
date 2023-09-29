import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, setAuthenticatedUserId } from '../redux/usersSlice.js';
import '../assets/styles/SignUp.css';

const SignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [formErrors, setFormErrors] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [registrationSuccess, setRegistrationSuccess] = useState(false);
	const [registrationStatus, setRegistrationStatus] = useState(null);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Show registration success feedback
		try {
			// Perform signup logic
			const newUser = { ...formData };
			dispatch(addUser(newUser));

			// Set the authenticated user's ID
			dispatch(setAuthenticatedUserId(newUser.id));

			// Perform form validation
			const errors = {};
			if (!formData.name) {
				errors.name = 'Name is required';
			} else if (formData.name.length < 4) {
				errors.name = 'Name must be at least 4 characters';
			}
			if (!formData.email) {
				errors.email = 'Email is required';
			}
			if (!formData.password) {
				errors.password = 'Password is required';
			} else if (formData.password.length < 6) {
				errors.password = 'Password must be at least 6 characters';
			}

			if (Object.keys(errors).length > 0) {
				setFormErrors(errors);
				return;
			}

			// Registration successful
			setRegistrationSuccess(true);

			// Clear feedback message after 3 seconds
			setTimeout(() => {
				setRegistrationSuccess(false);
			}, 3000);

			// Clear form values
			setFormData({ name: '', email: '', password: '' });

			// Reset form errors
			setFormErrors({ name: '', email: '', password: '' });

			// Redirect to login page after a delay
			setTimeout(() => {
				navigate('/login');
			}, 5000); // Redirect after 5 seconds
		} catch (error) {
			console.error('Signup failed', error);
			setRegistrationSuccess(false);
			setRegistrationStatus('error'); // Set registration error status
		}
	};

	return (
		<div className='container'>
			<h2 className='my-4 sign-up-text'>Sign Up</h2>
			{registrationSuccess && (
				<p className='success-message text-capitalize text-bg-success'>
					Registration successful! You can log in.
				</p>
			)}
			{registrationStatus === 'error' && (
				<p className='error-message text-bg-danger'>
					Registration failed. Please try again.
				</p>
			)}
			<div className='row'>
				<div className='col-12 col-lg-6'>
					<form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<div className='input-group'>
								<span className='input-group-text'>
									<i className='bi bi-person'></i>
								</span>
								<input
									type='text'
									className={`form-control ${
										formErrors.name ? 'is-invalid' : ''
									}`}
									id='name'
									name='name'
									value={formData.name}
									onChange={handleInputChange}
									placeholder='Name'
								/>
							</div>
							{formErrors.name && (
								<p className='error-message'>{formErrors.name}</p>
							)}
						</div>

						<div className='mb-3'>
							<div className='input-group'>
								<span className='input-group-text'>
									<i className='bi bi-envelope'></i>
								</span>
								<input
									type='email'
									className={`form-control ${
										formErrors.email ? 'is-invalid' : ''
									}`}
									id='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									placeholder='Email'
								/>
							</div>
							{formErrors.email && (
								<p className='error-message'>{formErrors.email}</p>
							)}
						</div>

						<div className='mb-3'>
							<div className='input-group'>
								<input
									type={showPassword ? 'text' : 'password'}
									className={`form-control ${
										formErrors.password ? 'is-invalid' : ''
									}`}
									name='password'
									id='password'
									value={formData.password}
									onChange={handleInputChange}
									placeholder='Password'
								/>
								<span
									className='input-group-text'
									onClick={() => setShowPassword(!showPassword)}>
									<i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
								</span>
							</div>
							{formErrors.password && (
								<p className='error-message'>{formErrors.password}</p>
							)}
						</div>
						<button type='submit' className='btn btn-primary btn-signup'>
							Sign Up
						</button>
          </form>
          
            <div className='signin-link'>
              Don't have an account? <a href='/signup'>Sign up</a>
            </div>
				</div>
				<div class='col-lg-6 d-none d-lg-flex'>
					<div class='signup-bg'></div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
