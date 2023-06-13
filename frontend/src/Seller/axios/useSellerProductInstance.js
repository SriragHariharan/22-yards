import axios from 'axios'
import { useSelector } from 'react-redux';

export default function useSellerProductInstance() {

    const Token = useSelector(state => state?.Admin.seller.token)

    const sellerProductInstance = axios.create({
        baseURL: 'http://localhost:4000/api/seller/', 
        headers: {
            'Content-Type': 'multipart/form-data', 
            'Authorization': `Bearer ${Token}`        }
      });

  return [sellerProductInstance]
}
