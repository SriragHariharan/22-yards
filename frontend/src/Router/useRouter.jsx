    import {
        createBrowserRouter,
        createRoutesFromElements,
        Navigate,
        Route,
    } from "react-router-dom";

    //raect jwt
    import { isExpired } from "react-jwt";

    //MDBootstrap
    import 'mdb-react-ui-kit/dist/css/mdb.min.css';
    import "@fortawesome/fontawesome-free/css/all.min.css";
    
    //layouts
    import RootLayout from "./RootLayout";
    import BuyerRootLayout from "../Buyer/layouts/BuyerRootLayout";
    import BuyerAuthLayout from "../Buyer/layouts/BuyerAuthLayout";
    import SellerRootLayout from "../Seller/layouts/SellerRootLayout";
    import AuthorizedSellerLayout from "../Seller/layouts/AuthorizedSellerLayout";
    
    //pages
    import Homepage from "../Buyer/pages/Homepage";
    import Login from "../Buyer/pages/Login";
    import Signup from "../Buyer/pages/Signup";
    import Welcomepage from "../Seller/pages/Welcomepage";
    import HomepageSeller from "../Seller/pages/HomepageSeller";
    import ProductDetailsSeller from "../Seller/pages/ProductDetailsSeller";
    import AddNewProduct from "../Seller/pages/AddNewProduct";
    import AllProductsSeller from "../Seller/pages/AllProductsSeller";
    import Faq from "../Seller/pages/Faq";
    import Page404 from "../Buyer/pages/Page404";
    import AllProducts from "../Buyer/pages/AllProducts";
    import ProductsbyCategory from "../Buyer/pages/ProductsbyCategory";
    import ViewProductDetails from "../Buyer/pages/ViewProductDetails";
    import Checkout from "../Buyer/pages/Checkout";
    import Cart from "../Buyer/pages/Cart";
    import PaymentStatus from "../Buyer/components/checkout/PaymentStatus";
    import Orders from "../Seller/pages/Orders";
    import Profile from "../Buyer/pages/Profile";
    import OrdersBuyer from "../Buyer/pages/OrdersBuyer";

    import { useSelector, useDispatch } from "react-redux";
    import { AdminLogout } from "../redux-tk/reducers/AdminReducer";
import { UserLogout } from "../redux-tk/reducers/UserReducer";

export default function useRouter() {
  

    const dispatch = useDispatch()

    let SELLER = useSelector(state => state?.Admin?.seller)
    const SELLERtoken = SELLER?.token;
    
    let BUYER = useSelector(state => state?.User?.user)


    //jwt expiration check
    var isMyTokenExpired = isExpired(SELLERtoken);
    if(isMyTokenExpired){
        dispatch(AdminLogout(null));
        localStorage.removeItem('22YardsAdmin');
    }

     //jwt expiration check
    //  var isMyTokenExpired = isExpired(BUYERtoken);
    //  if(isMyTokenExpired){
    //      dispatch(UserLogout());
    //      localStorage.removeItem('22YardsUser');
    //  }
     
    

    const router = createBrowserRouter(
     createRoutesFromElements(
       <Route path="/" element={<RootLayout />}>
             
             {/* buyer routes */}
             <Route path="/" element={<BuyerRootLayout />} >
                 <Route index element={<Homepage />} />
                 <Route path='user' element={<BuyerAuthLayout/>}>
                     <Route path='login'    element = { !BUYER ? <Login />  : <Navigate to={'/profile'} />   } />
                     <Route path='signup'   element = { !BUYER ? <Signup /> : <Navigate to={'/profile'} />   } />
                 </Route>
                <Route path='all-products' element={<AllProducts/>} />
                <Route path='category/:id' element={<ProductsbyCategory/>} />
                <Route path='view-product/:id' element={<ViewProductDetails/>} />
                <Route path='checkout' element={<Checkout/>} />
                <Route path='cart' element={<Cart/>} />
                <Route path='payment-status/:id' element={<PaymentStatus/>} />
                <Route path='profile' element={ BUYER ? <Profile/> : <Navigate to={'/user/login'}/> } />
                <Route path='orders' element={ BUYER ? <OrdersBuyer/> : <Navigate to={'/user/login'}/> } />
             </Route>

            {/* seller routes */}
             <Route path="seller" element={<SellerRootLayout/> }>
                 <Route index element={ SELLER ? <Navigate to={'/seller/home'} /> : <Welcomepage/>} />
                 <Route path="home" element={ SELLER ? <AuthorizedSellerLayout/> : <Navigate to={'/seller'}/> } >
                     <Route index element={ SELLER ? <HomepageSeller/> : <Navigate to={'/seller'}/>  } />
                     <Route path="view-all-products" element={ SELLER ? <AllProductsSeller/> : <Navigate to={'/seller'}/>} />
                     <Route path="view-product/:id" element={ SELLER ? <ProductDetailsSeller/> : <Navigate to={'/seller'}/> } />
                     <Route path="add-new-product" element={ SELLER ? <AddNewProduct/> : <Navigate to={'/seller'}/> } />
                     <Route path="faq" element={ SELLER ? <Faq/> : <Navigate to={'/seller'}/> } />
                     <Route path="orders" element={ SELLER ? <Orders/> : <Navigate to={'/seller'}/> } />
                 </Route>
             </Route>
             <Route path="*" element={<Page404/>} />
       </Route>
     )
    );
    
  return [router]
}
