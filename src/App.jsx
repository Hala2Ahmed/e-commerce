import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import { lazy, Suspense } from 'react'
const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import ProtectedAuthRoute from './ProtectedRoutes/ProtectedAuthRoute'
import AuthContextProvider from './context/authContext'
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPassword/ForgotPassword'))
const Products = lazy(() => import('./pages/Products/Products'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const Brands = lazy(() => import('./pages/Brands/Brands'))
const Categories = lazy(() => import('./pages/Categories/Categories'))
const WishList = lazy(() => import('./pages/WishList/WishList'))
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const ProductDetails = lazy(() => import('./pages/ProductDetails/ProductDetails'))
import { ToastContainer } from 'react-toastify';
const Address = lazy(() => import('./pages/Address/Address'))
const Orders = lazy(() => import('./pages/Orders/Orders'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
import { WishlistProvider } from './context/WishlistContext'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'

const queryClient=new QueryClient()



function App() {
const router=createBrowserRouter([
  {path:'',element:<Layout />,children:[
    {index:true,element:<ProtectedRoutes><Suspense fallback={<LoadingScreen />}><Home /></Suspense></ProtectedRoutes>},
    {path:'/products',element:<ProtectedRoutes><Suspense fallback={<LoadingScreen />}><Products /></Suspense></ProtectedRoutes>},
    {path: "/productDetails/:id", element:<ProtectedRoutes><Suspense fallback={<LoadingScreen />}><ProductDetails /></Suspense></ProtectedRoutes>},
    {path:'/cart',element:<ProtectedRoutes><Suspense fallback={<LoadingScreen />}><Cart /></Suspense></ProtectedRoutes>},
    {path:'/brands',element:<ProtectedRoutes><Suspense fallback={<LoadingScreen />}><Brands /></Suspense></ProtectedRoutes>},
    {path:'/categories',element:<ProtectedRoutes><Suspense fallback={<LoadingScreen />}><Categories /></Suspense></ProtectedRoutes>},
    {path:'/wishlist',element:<ProtectedRoutes><Suspense fallback={<LoadingScreen />}><WishList /></Suspense></ProtectedRoutes>},
    {path: "/address/:cartId", element:<ProtectedRoutes><Suspense fallback={<LoadingScreen />}><Address /></Suspense></ProtectedRoutes>},
    {path: "/allorders", element:<ProtectedRoutes><Suspense fallback={<LoadingScreen />}><Orders /></Suspense></ProtectedRoutes>},
    {path:'/login',element:<ProtectedAuthRoute><Suspense fallback={<LoadingScreen />}><Login /></Suspense></ProtectedAuthRoute>},
    {path:'/forgot-password',element:<ProtectedAuthRoute><Suspense fallback={<LoadingScreen />}><ForgotPasswordPage /></Suspense></ProtectedAuthRoute>},
    {path:'/register',element:<ProtectedAuthRoute><Suspense fallback={<LoadingScreen />}><Register /></Suspense></ProtectedAuthRoute>},
    {path: "*", element:<Suspense fallback={<LoadingScreen />}><NotFound /></Suspense>}
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
