//custom hook to access protected routes on buyer side
import { useSelector } from 'react-redux'
import axios from 'axios'


export default function useBuyerAuthInstance() {
    let user = useSelector(state => state?.User?.user)
    let token = user?.token;
    const BuyerAuthInstance = axios.create({
        // Configuration
        baseURL: 'http://localhost:4000/api/buyer/',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        },
    });

  return [BuyerAuthInstance]
}
