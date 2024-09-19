'use client'


import { useWixClient } from "@/hooks/useWixClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingLogo from "@/components/LoadingLogo";
import { useCartStore } from "@/hooks/useCartStore";
import CartItem from "@/components/CartItem";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";

const CartPageComp = () => {

    const wixClient = useWixClient();
    const { cart, getCart, isLoading } = useCartStore();
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true);
        getCart(wixClient);
    }, [wixClient, getCart]);

    if (!mounted) return null;

    return (
        <div className="container mt-[8%] mx-auto px-4">
            {(cart && cart.lineItems && cart.lineItems.length > 0) ? (
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between ">

                    {/* Cart Items - 60% Width */}
                    <div className="w-full lg:w-[60%]">
                        <table className="table-auto w-full rounded-xl shadow-lg">
                            <thead>
                                <tr className="text-left text-sm font-semibold text-gray-600 border-b">
                                    <th className="py-3 px-4 text-md">Cart Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td className="py-4 px-4">
                                            <LoadingLogo />
                                        </td>
                                    </tr>
                                ) : (
                                    cart.lineItems.map((item, index) => (
                                        <tr
                                            key={index}
                                            className=" text-sm  text-gray-700 hover:bg-gray-50"
                                        >
                                            <td className="py-4 ml-2 md:ml-10 px-4 flex items-center space-x-4">
                                                <CartItem item={item} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>


                    {/* Checkout Summary - 30% Width */}
                    <div className="w-full lg:w-[35%] sticky top-20 self-start p-7  rounded-xl shadow-lg">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Subtotal</span>
                            <span className="text-sm font-medium">Rs {0 || cart?.subtotal?.amount && cart.subtotal.amount} /-</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Delivery Charge (Flat Fee)</span>
                            <span className="text-sm font-medium">Rs 200/-</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold">
                            <span>Total</span>
                            <div className='inline-block font-semibold '>
                                Rs {0 || cart?.subtotal?.amount && parseInt(cart.subtotal.amount) + 200} /-
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-between mt-10">
                            <button className="text-[15px] bg-blue-300 text-black py-2 px-4 font-semibold rounded-xl">
                                <Link href='/store'>
                                    Back to Store
                                </Link>
                            </button>
                            <button className="text-[15px] bg-black text-white  px-6 rounded-xl">
                                <Link  href='/checkout' className='  w-full block  py-2' >Checkout</Link>
                            </button>
                        </div>
                    </div>


                </div>) : (

                <div>
                    <div className=' text-gray-500 py-32  flex flex-col items-center justify-center gap-2' >
                        <MdOutlineAddShoppingCart size={50} />
                        <p>Your Cart is Empty</p>

                        <Link className='mt-4 text-black font-semibold tracking-tight' href='/store' ><GoArrowLeft className="inline-block mr-2 text-black" size={22} />Go To Shop</Link>
                    </div>

                </div>
            )}
        </div>
    );
};

export default CartPageComp;
