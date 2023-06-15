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

    import { useSelector, useDispatch } from "react-redux";
    import { AdminLogout } from "../redux-tk/reducers/AdminReducer";

export default function useRouter() {
  

    
    const dispatch = useDispatch()
    let SELLER = useSelector(state => state?.Admin?.seller)
    console.log(SELLER);
    const token = SELLER?.token;
    
    //jwt expiration check
    const isMyTokenExpired = isExpired(token);
    if(isMyTokenExpired){
    dispatch(AdminLogout(null));
    localStorage.removeItem('22YardsAdmin');
    
  }
    

    const router = createBrowserRouter(
     createRoutesFromElements(
       <Route path="/" element={<RootLayout />}>
             <Route path="/" element={<BuyerRootLayout />} >
                 <Route index element={<Homepage />} />
                 <Route path='user' element={<BuyerAuthLayout/>}>
                     <Route path='login' element={<Login />} />
                     <Route path='signup' element={<Signup />} />
                 </Route>
             <Route path='all-products' element={<AllProducts/>} />
             </Route>
             <Route path="seller" element={<SellerRootLayout/> }>
                 <Route index element={ SELLER ? <Navigate to={'/seller/home'} /> : <Welcomepage/>} />
                 <Route path="home" element={ SELLER ? <AuthorizedSellerLayout/> : <Navigate to={'/seller'}/> } >
                     <Route index element={ SELLER ? <HomepageSeller/> : <Navigate to={'/seller'}/>  } />
                     <Route path="view-all-products" element={ SELLER ? <AllProductsSeller/> : <Navigate to={'/seller'}/>} />
                     <Route path="view-product/:id" element={ SELLER ? <ProductDetailsSeller/> : <Navigate to={'/seller'}/> } />
                     <Route path="add-new-product" element={ SELLER ? <AddNewProduct/> : <Navigate to={'/seller'}/> } />
                     <Route path="faq" element={ SELLER ? <Faq/> : <Navigate to={'/seller'}/> } />
                 </Route>
             </Route>
             <Route path="*" element={<Page404/>} />
       </Route>
     )
    );
    
  return [router]
}
