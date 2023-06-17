import axios from 'axios';

const BuyerProductInstance = axios.create({
	// Configuration
	baseURL: 'http://localhost:4000/api/buyer/',
	headers: {
		Accept: 'application/json',
	},
});

export default BuyerProductInstance;