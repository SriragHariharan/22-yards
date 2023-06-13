import axios from 'axios'

export default function useSellerAuthInstance() {

    const sellerAuthInstance = axios.create({
        baseURL: 'http://localhost:4000/api/seller/auth/', 
        headers: {
            'Content-Type': 'application/json',
        }
    })

  return [sellerAuthInstance]
}
