import React from 'react';
import ProductList from '../components/ProductList';
import CategoryMenu from '../components/CategoryMenu';
import { Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import FeaturedProducts from '../components/FeaturedProducts';

const Home = () => {
	return (
		<div className='container pb-3'>
			<div className='home'>
				<h1 className='my-4 text-center'>Welcome to ShopSphere</h1>

				<div className='card'>
					<div className='card-header'>
						<div className='card-title'>
							<h2 className=''>Categories</h2>
						</div>
					</div>
					<div className='card-body'>
						<div className='home-category-menu'>
							<CategoryMenu />
						</div>
					</div>
				</div>

				<div className='home-product-list mt-5'>
					<ProductList />
				</div>

				<div className='home-featured-products mt-5'>
					<h2>Featured Products</h2>
					<FeaturedProducts />
				</div>

				{/* Nested routes */}
				<Outlet />
			</div>
		</div>
	);
};

export default Home;
