import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import AiReport from './components/AiReport';
import AiChartReport from './components/AiChartReport';
import Pricing from './pages/Pricing';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/adminDashboard' element={<AdminDashboard />} />
          <Route path='/farmerDashboard' element={<FarmerDashboard />} />
          <Route path='/aireport' element={<AiReport />} />
          <Route path='/aichart' element={<AiChartReport />} />
          <Route 
            path='/pricing' 
            element={
              <Elements stripe={stripePromise}>
                <Pricing />
              </Elements>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

