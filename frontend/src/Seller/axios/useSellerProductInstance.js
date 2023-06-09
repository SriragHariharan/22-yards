import axios from 'axios'
import { useSelector } from 'react-redux';

export default function useSellerProductInstance() {

    const Token = useSelector(state => state?.Admin.seller.token)

    const sellerProductInstance = axios.create({
        baseURL: import.meta.env.VITE_SERVER+'seller/', 
        headers: {
            'Content-Type': 'multipart/form-data', 
            'Authorization': `Bearer ${Token}`        }
      });

  return [sellerProductInstance]
}
