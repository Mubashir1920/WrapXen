'use client'
import { IoBagHandleOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import Cart from "./Cart/Cart";
import CartItemCount from "./CartItemCount";
import WishListCount from "./WishListCount";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showSideNav, setShowSideNav] = useState(false)


  return (
    <header className="bg-white shadow-sm shadow-gray-200 py-1">
      <nav className="flex justify-between  items-center w-[92%] py-3 mx-auto">
        {/*  Mobile Nav Menu */}
        <RxHamburgerMenu onClick={() => {
          setShowSideNav(prev => !prev)
          setShowCart(false)
        }}
          className="text-3xl cursor-pointer md:hidden text-gray-900" />
        <div
          className={`transform  transition-transform duration-500 ease-in-out fixed top-0 left-0 h-[100vh] pl-10 bg-white shadow-md shadow-gray-200 border border-black rounded-tr-2xl rounded-br-2xl w-[80vw] md:w-[30vw] ${showSideNav ? 'translate-x-0' : '-translate-x-full'
            }`}>
          <div className='h-full relative '>
            <FiArrowLeft onClick={() => setShowSideNav(false)} size={25} className='top-2 cursor-pointer absolute right-10 ' />
            <h3 className='text-2xl text-left mt-20'>WRAPXEN</h3>
            <div className="  bg-white items-center   ">
              <ul className="flex flex-col gap-2 mt-10">
                <li>
                  <Link onClick={()=>setShowSideNav(false)} className="hover:text-gray-500 text-lg" href="/">Home</Link>
                </li>
                <li>
                  <Link onClick={()=>setShowSideNav(false)} className="hover:text-gray-500 text-lg" href="/store">Store</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>



        <div className="  bg-white    md:flex items-center px-5 hidden ">
          <ul className="flex  gap-8 ">
            <li>
              <Link className="hover:text-gray-500" href="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" href="/store">Store</Link>
            </li>
          </ul>
        </div>
        {/* Site Icon */}
        <div className="select-none" >
          <Link href='/' className="font-extrabold text-xl md:text-2xl tracking-tighter" >WRAPXEN</Link>
        </div>

        {/* Icons */}

        <div className="flex items-center gap-2.5 md:gap-4">
          {/* Show Cart */}
          <div className="relative" >
            <IoBagHandleOutline onClick={() => {
              setShowCart(prev => !prev)
              setShowSideNav(false)
            }}
              size={22}
              className=" cursor-pointer  text-gray-900" />
            <Cart active={showCart} setactive={setShowCart} />
            <CartItemCount />
          </div>

          {/* To Wish List Page Details  */}
          <Link href='/account/wishlist' className="relative hidden md:inline-block" >
            <FaRegHeart size={20} className=" cursor-pointer  text-gray-900" />
            <WishListCount />
          </Link>

          {/* Show User Details Page */}
          <FaRegUser onClick={() => setShowUser(prev => !prev)} size={20} className="cursor-pointer  text-gray-900" />

          {showUser && <div className="z-10 fixed top-[70px] right-4 md:right-10 width-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44" >
            <div className="px-4 py-3 text-sm text-center divide-y text-black">
              <div className="font-medium ">Dashboard</div>
            </div>
            <div className="py-1">
              <button className="block px-4 py-2 text-sm text-black w-full ">Sign out</button>
            </div>
          </div>}
        </div>


      </nav>
    </header>
  )
}

export default Navbar
