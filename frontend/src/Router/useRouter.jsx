import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
  } from "react-router-dom";
    
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

    import { useSelector } from "react-redux";
import Page404 from "../Buyer/pages/Page404";

export default function useRouter() {
    const SELLER = useSelector(state => state?.Admin?.seller)


    const router = createBrowserRouter(
     createRoutesFromElements(
       <Route path="/" element={<RootLayout />}>
             <Route path="/" element={<BuyerRootLayout />} >
                 <Route index element={<Homepage />} />
                 <Route path='user' element={<BuyerAuthLayout/>}>
                     <Route path='login' element={<Login />} />
                     <Route path='signup' element={<Signup />} />
                 </Route>
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
