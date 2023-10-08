import React from 'react';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import '../assets/scss/ProductList.scss';

const ProductList = () => {
	const products = useSelector((state) => state.products);

	return (
		<div className='container mt-4'>
			<h2 className='mb-3'>Products</h2>
			<div className='products-grid'>
				{products.map((product) => (
					<div key={product.productId} className='products-grid-item'>
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductList;
