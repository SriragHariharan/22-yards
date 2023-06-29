import axios from 'axios'

export default function useSellerAuthInstance() {

    const sellerAuthInstance = axios.create({
        baseURL: import.meta.env.VITE_SERVER+'seller/auth/', 
        headers: {
            'Content-Type': 'application/json',
        }
    })

  return [sellerAuthInstance]
}
