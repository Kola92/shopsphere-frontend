import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Header from './components/Header';
import './assets/scss/main.scss';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import { Login } from './pages/Login';
import SignUp from './pages/SignUp';
import Checkout from './pages/Checkout';
import { useSelector } from 'react-redux';

const App = () => {
	const authenticatedUserId = useSelector(
		(state) => state.users.authenticatedUserId
	);
	useEffect(() => {});

	return (
		<Router>
			<div className='app'>
				{/* Navigation */}
				<Header />

				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/product/:id' element={<ProductDetails />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/signin' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/checkout' element={<Checkout />} />
					<Route
						path='/profile'
						element={
							<ProtectedRoute authenticatedUserId={authenticatedUserId}>
								<UserProfile />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
