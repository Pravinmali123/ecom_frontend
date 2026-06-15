import React from 'react'
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
   <footer className="text-gray-600 bg-gray-300">
      
      {/* Top Section */}
      <div className="container px-1 py-10 mx-auto">
        <div className="flex flex-wrap text-center md:text-left">

          {/* Categories */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-semibold text-gray-900 mb-3">CATEGORIES</h2>
            <ul>
              <li><Link to="/" className="hover:text-pink-900">Home</Link></li>
              <li><Link to="/order" className="hover:text-pink-900">Order</Link></li>
              <li><Link to="/local" className="hover:text-pink-900">Local For Vocal</Link></li>
              <li><Link to="/cart" className="hover:text-pink-900">Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-semibold text-gray-900 mb-3">Customer Service</h2>
            <ul>
              <li><Link to="/returnpolicy" className="hover:text-pink-900">Return Policy</Link></li>
              <li><Link to="/about" className="hover:text-pink-900">About</Link></li>
              <li><Link to="/contact" className="hover:text-pink-900">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-semibold text-gray-900 mb-3">Services</h2>
            <ul>
              <li><Link to="/privacypolicy" className="hover:text-pink-900">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Payment Image */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 flex justify-center items-center">
            <img
              src="https://ecommerce-sk.vercel.app/pay.png"
              alt="payment"
              className="w-40"
            />
          </div>

        </div>
         {/* Bottom Section */}
      <div className="bg-gray-200">
        <div className="container px-5 py-4 mx-auto flex flex-col sm:flex-row items-center">

          {/* Logo */}
          <Link to="/">
            <img src={logo} className='h-10' alt="noimage" />
          </Link>

          {/* Copyright */}
          <p className="text-sm text-gray-500 sm:ml-6 mt-2 sm:mt-0">
            © 2026 ShopKart — www.shopKart.com
          </p>

          {/* Social Icons */}
          <span className="flex sm:ml-auto mt-3 sm:mt-0 space-x-4">

            {/* Facebook */}
            <svg className="w-5 h-5 cursor-pointer hover:text-pink-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>

            {/* Twitter */}
            <svg className="w-5 h-5 cursor-pointer hover:text-pink-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5z" />
            </svg>

            {/* Instagram */}
            <svg className="w-5 h-5 cursor-pointer hover:text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect width={20} height={20} x={2} y={2} rx={5} />
              <circle cx={12} cy={12} r={3} />
            </svg>

            {/* LinkedIn */}
            <svg className="w-5 h-5 cursor-pointer hover:text-pink-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            </svg>

          </span>
        </div>
      </div>
      </div>

     

    </footer>
  )
}

export default Footer
