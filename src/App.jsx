import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import ProtectedAuthRoute from './ProtectedRoutes/ProtectedAuthRoute'
import AuthContextProvider from './context/authContext'
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPassword'
import Products from './pages/Products/Products'
import Cart from './pages/Cart/Cart'
import Brands from './pages/Brands/Brands'
import Categories from './pages/Categories/Categories'
import WishList from './pages/WishList/WishList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify';
import Address from './pages/Address/Address'
import Orders from './pages/Orders/Orders'
import NotFound from './pages/NotFound/NotFound'
import { WishlistProvider } from './context/WishlistContext'

const queryClient=new QueryClient()



function App() {
const router=createBrowserRouter([
  {path:'',element:<Layout />,children:[
    {index:true,element:<ProtectedRoutes><Home /></ProtectedRoutes>},
    {path:'/products',element:<ProtectedRoutes><Products /></ProtectedRoutes>},
    {path: "/productDetails/:id", element:<ProtectedRoutes><ProductDetails /></ProtectedRoutes>},
    {path:'/cart',element:<ProtectedRoutes><Cart /></ProtectedRoutes>},
    {path:'/brands',element:<ProtectedRoutes><Brands /></ProtectedRoutes>},
    {path:'/categories',element:<ProtectedRoutes><Categories /></ProtectedRoutes>},
    {path:'/wishlist',element:<ProtectedRoutes><WishList /></ProtectedRoutes>},
    {path: "/address/:cartId", element:<ProtectedRoutes><Address /></ProtectedRoutes>},
    {path: "/allorders", element:<ProtectedRoutes><Orders /></ProtectedRoutes>},
    {path:'/login',element:<ProtectedAuthRoute><Login /></ProtectedAuthRoute>},
    {path:'/forgot-password',element:<ProtectedAuthRoute><ForgotPasswordPage /></ProtectedAuthRoute>},
    {path:'/register',element:<ProtectedAuthRoute><Register /></ProtectedAuthRoute>},
    {path: "*", element:<NotFound />}
  ]}
])
  return (
    <>
       <QueryClientProvider client={queryClient}>
       <AuthContextProvider>
       <WishlistProvider>
    <RouterProvider router={router} />
    <ToastContainer />
    </WishlistProvider>
    </AuthContextProvider>
       </QueryClientProvider>

    </>
  )
}

export default App
