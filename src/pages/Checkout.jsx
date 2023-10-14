import React, { useState } from 'react';
import '../assets/scss/Checkout.scss';
import { useSelector } from 'react-redux';

const Checkout = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		address: '',
		cardNumber: '',
		expirationDate: '',
		cvv: '',
	});
	const [formErrors, setFormErrors] = useState({});

	const isStepValid = (step) => {
		switch (step) {
			case 1:
				return (
					formData.firstName.trim() !== '' &&
					formData.lastName.trim() !== '' &&
					formData.email.trim() !== '' &&
					formData.address.trim() !== ''
				);
			case 2:
				return (
					formData.cardNumber.trim() !== '' &&
					formData.expirationDate.trim() !== '' &&
					formData.cvv.trim() !== ''
				);
			default:
				return true;
		}
	};

	const handleTabClick = (step) => {
		if (isStepValid(step)) {
			setActiveTab(step);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const nextStep = () => {
		if (activeTab < 2 && isStepValid(activeTab)) {
			setActiveTab(activeTab + 1);
		}
	};

	const prevStep = () => {
		if (activeTab > 1) {
			setActiveTab(activeTab - 1);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const errors = {};
		if (!formData.firstName) {
			errors.firstName = 'First name is required';
		}
		if (!formData.lastName) {
			errors.lastName = 'Last name is required';
		}
		if (!formData.email) {
			errors.email = 'Email is required';
		}
		if (!formData.address) {
			errors.address = 'Address is required';
		}
		if (activeTab === 2) {
			if (!formData.cardNumber) {
				errors.cardNumber = 'Card number is required';
			}
			if (!formData.expirationDate) {
				errors.expirationDate = 'Expiration date is required';
			}
			if (!formData.cvv) {
				errors.cvv = 'CVV is required';
			}
		}

		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
		} else {
			alert('Checkout successful!');
		}
	};

	const cartItems = useSelector((state) => state.cart);

	// Calculate total amount
	const totalAmount = cartItems.reduce((total, item) => {
		return total + item.productPrice * item.quantity;
	}, 0);

	return (
		<div className='container py-5'>
			<div className='checkout'>
				<h2>Checkout</h2>
				<div className='checkout-tabs'>
					<div
						className={`checkout-tab ${activeTab === 1 ? 'active' : ''}`}
						onClick={() => handleTabClick(1)}>
						Personal Information
					</div>
					<div
						className={`checkout-tab ${activeTab === 2 ? 'active' : ''}`}
						onClick={() => handleTabClick(2)}>
						Payment Information
					</div>
				</div>

				<div className='checkout-form'>
					<form onSubmit={handleSubmit}>
						{activeTab === 1 && (
							<div className='step-1'>
								<div className='form-grid'>
									<div className='form-group'>
										<label htmlFor='firstName'>First Name</label>
										<input
											type='text'
											id='firstName'
											name='firstName'
											value={formData.firstName}
											onChange={handleChange}
										/>
										{formErrors.firstName && (
											<div className='error'>{formErrors.firstName}</div>
										)}
									</div>
									<div className='form-group'>
										<label htmlFor='lastName'>Last Name</label>
										<input
											type='text'
											id='lastName'
											name='lastName'
											value={formData.lastName}
											onChange={handleChange}
										/>
										{formErrors.lastName && (
											<div className='error'>{formErrors.lastName}</div>
										)}
									</div>
									<div className='form-group'>
										<label htmlFor='email'>Email</label>
										<input
											type='email'
											id='email'
											name='email'
											value={formData.email}
											onChange={handleChange}
										/>
										{formErrors.email && (
											<div className='error'>{formErrors.email}</div>
										)}
									</div>
									<div className='form-group'>
										<label htmlFor='address'>Address</label>
										<input
											type='text'
											id='address'
											name='address'
											value={formData.address}
											onChange={handleChange}
										/>
										{formErrors.address && (
											<div className='error'>{formErrors.address}</div>
										)}
									</div>
								</div>
							</div>
						)}
						{activeTab === 2 && (
							<div className='step-2'>
								<div className='form-group'>
									<input
										type='text'
										name='cardNumber'
										value={formData.cardNumber}
										onChange={handleChange}
										placeholder='Card Number'
									/>
									{formErrors.cardNumber && (
										<div className='error'>{formErrors.cardNumber}</div>
									)}
									<input
										type='text'
										name='expirationDate'
										value={formData.expirationDate}
										onChange={handleChange}
										placeholder='Expiration Date'
									/>
									{formErrors.expirationDate && (
										<div className='error'>{formErrors.expirationDate}</div>
									)}
									<input
										type='text'
										name='cvv'
										value={formData.cvv}
										onChange={handleChange}
										placeholder='CVV'
									/>
									{formErrors.cvv && (
										<div className='error'>{formErrors.cvv}</div>
									)}
								</div>
							</div>
						)}
						<div className='form-navigation'>
							{activeTab > 1 && (
								<button type='button' className='btn' onClick={prevStep}>
									Previous
								</button>
							)}
							{activeTab < 2 && (
								<button
									type='button'
									onClick={nextStep}
									className='btn'
									disabled={!isStepValid(activeTab)}>
									Next
								</button>
							)}
							{activeTab === 2 && (
								<button
									className='btn'
									type='submit'
									disabled={!isStepValid(activeTab)}>
									Complete Purchase
								</button>
							)}
						</div>
					</form>
				</div>

				{/* Display cart items */}
				<div className='cart-items'>
					<h3>Your Cart Items</h3>
					{cartItems.map((item) => (
						<div key={item.productId} className='cart-item'>
							<h3>{item.productName}</h3>
							<div className='d-flex cart-item-price justify-content-between'>
								<p>Price:</p> <span>${item.productPrice}</span>
							</div>
							<p>Quantity: {item.quantity}</p>
						</div>
					))}
				</div>

				{/* Display total amount */}
				<div className='total-amount  '>
					<h3>Total Amount</h3>
					<p>${totalAmount.toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
