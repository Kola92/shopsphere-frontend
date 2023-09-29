import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateLocalStorage } from '../redux/cartSlice';
import '../assets/styles/ProductCard.css';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart);
	const [addedToCart, setAddedToCart] = useState(false);

	// Check if the product is in the cart when component mounts
	useEffect(() => {
		const isInCart = cartItems.some(
			(item) => item.productId === product.productId
		);
		setAddedToCart(isInCart);
	}, [cartItems, product.productId]);

	const handleAddToCart = () => {
		dispatch(addItem(product));
		dispatch(updateLocalStorage()); // Update local storage
		setAddedToCart(true);
	};

	return (
		<div className='card product-card'>
			<div className='image-container'>
				<img
					src={product.image}
					alt={product.productName}
					className='card-img-top'
				/>
			</div>

			<div className='card-body'>
				<h3 className='card-title'>{product.productName}</h3>
				<p className='card-text price'>${product.productPrice}</p>
				<button className='btn add-cart-btn' onClick={handleAddToCart}>
					{addedToCart ? 'Added to Cart' : 'Add to Cart'}
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
