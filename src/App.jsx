

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomeLayout from './components/HomePageComponents/HomeLayout'
import Category from './components/CategoryPageComponents/Category'
import Brands from './components/BrandsPage/Brands'
import Cart from './components/CartPage/Cart'
import BestBrand from './components/BrandsPage/BestBrand'
import BestCategory from './components/CategoryPageComponents/BestCategory'
import ProductDetails from './components/ProductsPage/ProductDetails'
import Products from './components/ProductsPage/Products'
import NotFound from './components/NotFound/NotFound'
import SignUp from './components/Auth/SignUp/SignUp'
import Login from './components/Auth/LogIn/Login'
import { Toaster } from 'react-hot-toast'
import GaurdRoots from './components/GaurdRoots/GaurdRoots'
import UserContext from './Context/UserContext'
import CartContext from './Context/CaryContext'
import CheckOut from './components/Payment/CheckOut'
import AllOrders from './components/UserDashBoard/AllOrders'
import Wishlist from './Context/Wishlist'
import BestProduct from './components/BestProductsPage/BestProduct'
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword'
import ResetCode from './components/Auth/ResetCode/ResetCode'
import PutNewPassword from './components/Auth/PutNewPassword/PutNewPassword'
import SearchingProducts from './components/SearchingProducts/SearchingProducts'

const router = createBrowserRouter([
  {path:'',element:<GaurdRoots><Layout/></GaurdRoots>,children:[
     {path :'' , element : <HomeLayout/> , index :true},
     {path :'Products' , element : <Products/> },
     {path :'Searching/:Products' , element : <SearchingProducts/> },
     {path :'ProductsDetails/:id/:category' , element : <ProductDetails/> },
     {path :'Category' , element : <Category/> },
     {path :'Category/:CategoryName' , element : <BestCategory/> },
     {path :'Brands' , element : <Brands/> },
     {path :'Brands/:BrandName' , element : <BestBrand/> },
     {path :'Cart' , element : <Cart/> },
     {path :'checkout' , element : <CheckOut/> },
     {path :'allorders' , element : <AllOrders/> },
     {path :'BestProducts' , element : <BestProduct/> },
     {path :'*' , element : <NotFound/> },
    ]},



  
    {path:'auth',element:<Layout/>, children:[
      {path :'Login' , element : <Login/> },
      {path :'SignUp' , element : <SignUp/> },
      {path :'ForgotPassword' , element : <ForgotPassword/> },
      {path :'ResetCode' , element : <ResetCode/> },
      {path :'PutNewPassword' , element : <PutNewPassword/> },

    ],},
])
let query = new QueryClient({})

function App() {

  return <>
  <QueryClientProvider client={query}>
<UserContext>

<CartContext>
<Wishlist>
  
<RouterProvider router={router}>
</RouterProvider>
  </Wishlist>
</CartContext>

</UserContext>

  <Toaster position='bottom-right'/>

  </QueryClientProvider>
  
  </> 
}

export default App
