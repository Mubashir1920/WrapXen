'use client'

import CartItemCount from "./CartItemCount";
import Cart from "./Cart/Cart";
import { FaRegUser } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { useLogin } from "@/hooks/useLogin";

const NavIcons = ({ setShowSideNav }) => {
    const wixClient = useWixClient()
    const router = useRouter()

    const { isLoggedIn, setIsLoggedIn } = useLogin()
    const [showUser, setShowUser] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [loading, setLoading] = useState(false)

    // This will ensure that client-side rendering is handled correctly
    useEffect(() => {
        const isLogged = wixClient.auth.loggedIn()
        if (isLogged) {
            setIsLoggedIn(true)
        }
    }, [])

    const handleLogout = async () => {
        setLoading(true)
        try {
            Cookies.remove("refreshToken")
            const { logoutUrl } = await wixClient.auth.logout(window.location.href)
            setIsLoggedIn(false)
            router.back()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-4 md:gap-6 mr-2 md:mr-0">
            {isLoggedIn !== undefined ? (
                isLoggedIn ? (
                    <>
                        <FaRegUser onClick={() => setShowUser(prev => !prev)} size={20} className="cursor-pointer text-gray-900" />
                        {showUser && (
                            <div className="z-10 fixed top-[70px] right-4 px-6 md:right-20 width-50 backdrop-blur-xl bg-[#00000081] divide-y divide-gray-100 rounded-lg shadow w-44">
                                <div className="px-2 py-6 text-sm text-left flex flex-col gap-4 text-white">
                                    <Link href='/account/orders' onClick={() => setShowUser(false)} className="text-[15px] text-white"> Dashboard</Link>
                                    <Link onClick={() => setShowUser(false)} href='/cart' className="text-[15px] text-white">Cart</Link>
                                    <Link href='/checkout' onClick={() => setShowUser(false)} className="text-[15px] text-white"> Checkout</Link>
                                    <Link href='/account/orders' onClick={() => setShowUser(false)} className="text-[15px] text-white"> Orders</Link>
                                </div>
                                <div className="py-1">
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm text-white w-full"
                                    >
                                        {loading ? (
                                            <AiOutlineLoading size={22} className='animate-spin inline-block' />
                                        ) : ('Sign Out')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <Link href='/login' className="hidden sm:block text-gray-600 text-md hover:text-gray-800 transition-colors">Login/SignUp</Link>
                        <Link className="sm:hidden" href='/login'>
                            <FaRegUser size={20} className="cursor-pointer text-gray-900" />
                        </Link>
                    </>
                )
            ) : (
                // Show a loader or placeholder while checking the auth state
                <AiOutlineLoading size={22} className="animate-spin text-gray-900" />
            )}

            {/* Show Cart */}
            <div className="relative mr-1  md:mr-0">
                <IoBagHandleOutline
                    size={22}
                    className="text-gray-900 hover:text-blue-400  cursor-pointer"
                    onClick={() => {
                        setShowCart(prev => !prev);
                        setShowSideNav(false);
                    }}
                />
                <Cart active={showCart} setactive={setShowCart} />
                <CartItemCount setShowCart={setShowCart} />
            </div>
        </div>
    )
}

export default NavIcons
