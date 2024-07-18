import React from 'react'
import { motion } from "framer-motion"
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
import ForgetPassword from '../pages/AuthPages/ForgetPassword';
import Registration from '../pages/AuthPages/Registration';
import DemoAccount from '../pages/AuthPages/DemoAccount';
import Login from '../pages/AuthPages/Login';
import LoginWithOTP from '../pages/AuthPages/LoginWithOTP';
import RegistrationLocation from '../pages/AuthPages/RegistrationLocation';
const AnimatedRoutes = () => {
    const location = useLocation();
  return (
    <div>
        <AnimatePresence>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="LoginWithOTP" element={<LoginWithOTP />} />
        <Route
          path="RegistrationLocation"
          element={<RegistrationLocation />}
        />
        <Route path="ForgetPassword" element={<ForgetPassword />} />
        <Route path="Registration" element={<Registration />} />
        <Route path="DemoAccount" element={<DemoAccount />} />
      </Routes>
      </AnimatePresence>
    </div>
  )
}

export default AnimatedRoutes