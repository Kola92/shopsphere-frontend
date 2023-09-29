import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import smartphoneImage from '../assets/images/smartphone.jpg';

const productDetails = [
	{
		productName: 'T-Shirt',
		description: 'A comfortable and stylish t-shirt for everyday wear.',
		productPrice: 20,
		categoryId: 1,
		image: '/images/t-shirt.jpg',
	},
	{
		productName: 'Smartphone',
		description:
			'The latest smartphone with powerful features and performance.',
		productPrice: 500,
		categoryId: 2,
		// image: '/images/smartphone.jpg',
		image: smartphoneImage,
	},
	{
		productName: 'Novel',
		description:
			'An engaging novel that will keep you hooked from start to finish.',
		productPrice: 15,
		categoryId: 3,
		image: '/images/novel.jpg',
	},
	{
		productName: 'Sofa',
		description: 'A comfortable sofa to relax and unwind after a long day.',
		productPrice: 350,
		categoryId: 4,
		image: '/images/sofa.jpg',
	},
	{
		productName: 'Running Shoes',
		description: 'High-quality running shoes designed for optimal performance.',
		productPrice: 70,
		categoryId: 5,
		image: '/images/shoe.jpg',
	},
	{
		productName: 'Jeans',
		description: 'Classic jeans that offer both style and comfort.',
		productPrice: 40,
		categoryId: 1,
		image: '/images/jeans.jpg',
	},
	{
		productName: 'Laptop',
		description: 'A powerful laptop for work, entertainment, and more.',
		productPrice: 800,
		categoryId: 2,
		image: '/images/laptop.jpg',
	},
	{
		productName: 'Coffee Table',
		description: 'A stylish coffee table that complements your living space.',
		productPrice: 120,
		categoryId: 4,
		image: '/images/coffee-table.jpg',
	},
	{
		productName: 'Necklace',
		description:
			'Elegant necklace that adds a touch of sophistication to any outfit.',
		productPrice: 50,
		categoryId: 6,
		image: '/images/necklace.jpg',
	},
	{
		productName: 'Lipstick',
		description: 'Vibrant lipstick in various shades to enhance your look.',
		productPrice: 10,
		categoryId: 7,
		image: '/images/lipstick.jpg',
	},
];

const initialState = productDetails.map((productDetail) => ({
	productId: uuidv4(),
	...productDetail,
}));

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action) => {
			return action.payload;
		},
	},
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
