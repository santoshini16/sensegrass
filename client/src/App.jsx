import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import AiReport from './components/AiReport';

function App() {


  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/farmerDashboard' element={<FarmerDashboard/>}/>
        <Route path='/aireport' element={<AiReport/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
