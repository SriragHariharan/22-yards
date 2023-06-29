import axios from 'axios';

const BuyerProductInstance = axios.create({
	// Configuration
	baseURL: import.meta.env.VITE_SERVER+'buyer/',
	headers: {
		Accept: 'application/json',
	},
});

export default BuyerProductInstance;