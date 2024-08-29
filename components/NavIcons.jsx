'use client'

import CartItemCount from "./CartItemCount";
import WishListCount from "./WishListCount";
import Cart from "./Cart/Cart";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";


const NavIcons = ({ setShowSideNav }) => {

    const [isUser, setIsUser] = useState(true)
    const [showUser, setShowUser] = useState(false)
    const [showCart, setShowCart] = useState(false)
    return (
        <div className="flex items-center gap-4 md:gap-6">

            {!isUser ? (
                <Link href='/login' className="hidden sm:block text-gray-600 text-md hover:text-gray-800 transition-colors"  >Login/SignUp</Link>
            ) : (
                <>
                    <FaRegUser onClick={() => setShowUser(prev => !prev)} size={20} className="cursor-pointer  text-gray-900" />

                    {showUser && <div className="z-10 fixed top-[70px] right-4 md:right-20 width-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44" >
                        <div className="px-2 py-6 text-sm text-center  flex flex-col gap-4 text-black">
                            <div className=" text-[15px] text-black ">Dashboard</div>
                            <div className=" text-[15px] text-black ">Your Orders</div>
                        </div>
                        <div className="py-1">
                            <button className="block px-4 py-2 text-sm text-black w-full ">Sign out</button>
                        </div>
                    </div>}
                </>
            )}


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

        </div>
    )
}

export default NavIcons
