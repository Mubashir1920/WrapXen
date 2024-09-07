'use client'

import CartItemCount from "./CartItemCount";
import WishListCount from "./WishListCount";
import Cart from "./Cart/Cart";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";


const NavIcons = ({ setShowSideNav }) => {

    const wixClient = useWixClient()
    const router = useRouter()
    const isLoggedIn = wixClient.auth.loggedIn()

    const [isUser, setIsUser] = useState(false)
    const [showUser, setShowUser] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        try {
            Cookies.remove("refreshToken")
            const { logoutUrl } = await wixClient.auth.logout(window.location.href)

            router.push(logoutUrl)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        if (isLoggedIn) {
            setIsUser(true)
        }
    }, [isLoggedIn])


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
                        <div className="py-1 ">
                            <button
                                onClick={handleLogout}
                                className="block  px-4 py-2 text-sm text-black w-full"
                            >
                                {loading ? (<AiOutlineLoading size={22} className='animate-spin inline-block ' />) : ('Sign Out')}
                            </button>
                        </div>
                    </div>}
                </>
            )}

            {!isLoggedIn && <Link className="sm:hidden" href='/login'>
                <FaRegUser  size={20} className="cursor-pointer  text-gray-900" />
            </Link>}


            {/* Show Cart */}
            <div
                className="relative mr-1 md:mr-0 cursor-pointer"
                onClick={() => {
                    setShowCart((prev) => !prev);
                    setShowSideNav(false);
                }}
            >
                <IoBagHandleOutline
                    size={22}
                    className="text-gray-900"
                />
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
