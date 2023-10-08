import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../assets/scss/FeaturedProduct.scss';

const FeaturedProducts = () => {
	const products = useSelector((state) => state.products);

	return (
		<div className='featured-products-grid'>
			{products.slice(0, 4).map((product) => (
				<div key={product.productId} className='featured-products-item'>
					<div className='card featured-product-card'>
						<div className='featured-product-image'>
							<img
								src={product.image}
								alt={product.productName}
								className='card-img-top'
							/>
						</div>

						<div className='card-body'>
							<h5 className='card-title'>{product.productName}</h5>
							<p className='card-text price'>${product.productPrice}</p>
							<Link
								to={`/product/${product.productId}`}
								className='btn add-cart-btn' role='button'>
								View Details
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default FeaturedProducts;
