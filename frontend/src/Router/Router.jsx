import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
    
    //MDBootstrap
    import 'mdb-react-ui-kit/dist/css/mdb.min.css';
    import "@fortawesome/fontawesome-free/css/all.min.css";
    
    //layouts
    import RootLayout from "./RootLayout";
    import BuyerRootLayout from "../Buyer/layouts/BuyerRootLayout";
    import BuyerAuthLayout from "../Buyer/layouts/BuyerAuthLayout";
    
    //pages
    import Homepage from "../Buyer/pages/Homepage";
    import Login from "../Buyer/pages/Login";
    import Signup from "../Buyer/pages/Signup";
    import Welcomepage from "../Seller/pages/Welcomepage";
import HomepageSeller from "../Seller/pages/HomepageSeller";
import SellerRootLayout from "../Seller/layouts/SellerRootLayout";
import ProductDetailsSeller from "../Seller/pages/ProductDetailsSeller";
import AddNewProduct from "../Seller/pages/AddNewProduct";
import AllProductsSeller from "../Seller/pages/AllProductsSeller";
import AuthorizedSellerLayout from "../Seller/layouts/AuthorizedSellerLayout";


  // You can do this:
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
                <Route index element={<Welcomepage/>} />
                <Route path="home" element={<AuthorizedSellerLayout/> } >
                    <Route index element={<HomepageSeller/>} />
                    <Route path="view-all-products" element={<AllProductsSeller/>} />
                    <Route path="view-product" element={<ProductDetailsSeller/> } />
                    <Route path="add-new-product" element={<AddNewProduct/>} />
                </Route>
            </Route>
      </Route>
    )
  );

export default router