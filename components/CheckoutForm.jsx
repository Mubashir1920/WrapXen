'use client'

import { useState, useEffect } from 'react';
import CartItem from '@/components/CartItem';
import LoadingLogo from '@/components/LoadingLogo';
import { useCartStore } from '@/hooks/useCartStore';
import { useWixClient } from '@/hooks/useWixClient';
import { FaChevronRight, FaShoppingBag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai';
import OrderPlaced from './Order-Placed';
import { MdOutlinePayment } from 'react-icons/md';
import { useLogin } from '@/hooks/useLogin';
import Link from 'next/link';


const CheckoutForm = () => {

    const wixClient = useWixClient();
    const { cart, getCart, isLoading } = useCartStore();
    const { isLoggedIn, getUser } = useLogin()
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false)

    const [billingAddress, setBillingAddress] = useState({
        userId: '',
        fullName: '',
        phoneNumber: '',
        Email: '',
        address: '',
        country: 'Pakistan',
        state: '',
        city: '',
        postalCode: '',
        deliveryAddress: 'Home',
        subtotal: 0 || cart?.subtotal?.amount,
        date: new Date().toLocaleDateString(),
        status: 'PENDING'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress((prev) => ({ ...prev, [name]: value }));
    };



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsPlacingOrder(true);

        const user = await getUser(wixClient);
        billingAddress.userId = user.member._id;
        billingAddress.subtotal = cart.subtotal.amount;
        const lineItemIds = cart.lineItems.map((item) => item._id);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/orders.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order: cart.lineItems,
                    billingAddress: billingAddress,
                }),
            });

            if (res.ok) {
                // Remove items from Wix cart
                const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(lineItemIds);

                if (response.cart.lineItems.length === 0) {
                    setOrderPlaced(true);
                    toast.success("Order placed successfully");

                    // Update the cart state by fetching the latest empty cart
                    await getCart(wixClient);  // Refresh the cart from the API after clearing it
                } else {
                    throw new Error("Failed to clear cart after placing order");
                }
            } else {
                throw new Error("Failed to place order");
            }
        } catch (error) {
            console.error("Error placing order: ", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setIsPlacingOrder(false);
        }
    };




    useEffect(() => {
        getCart(wixClient);
        setMounted(true);
    }, [wixClient, getCart]);

    if (!mounted) return null;
    return (
        <div>
            {!orderPlaced ? (
                <div>
                    <h1 className='text-3xl font-extrabold  text-center  block mt-32 tracking-tighter'>Checkout</h1>
                    <div className="container mx-auto p-4 lg:flex lg:space-x-6">
                        {/* Left Section - Billing Address */}
                        <form onSubmit={handleFormSubmit} className="w-full lg:w-2/3  space-y-6">
                            <div className="p-6 rounded-lg shadow-md bg-gray-50  space-y-6">
                                <h2 className="text-lg font-semibold">Billing Address</h2>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        className="w-full  focus:border-b-black border-b-transparent   focus:outline-none focus:border-b-2 bg-slate-50    px-4 py-3 text-sm"
                                        placeholder="Full Name"
                                        name="fullName"
                                        value={billingAddress.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="w-full  focus:border-b-black border-b-transparent   focus:outline-none focus:border-b-2 bg-slate-50    px-4 py-3 text-sm"
                                        placeholder="Phone Number"
                                        name="phoneNumber"
                                        value={billingAddress.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        type="email"
                                        className="w-full  focus:border-b-black border-b-transparent   focus:outline-none focus:border-b-2 bg-slate-50    px-4 py-3 text-sm"
                                        placeholder="Email"
                                        name="Email"
                                        value={billingAddress.Email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="w-full  focus:border-b-black border-b-transparent   focus:outline-none focus:border-b-2 bg-slate-50    px-4 py-3 text-sm"
                                        placeholder="Address"
                                        name="address"
                                        value={billingAddress.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="flex space-x-4">
                                        <input
                                            type="text"
                                            className="w-1/2  focus:border-b-black border-b-transparent   focus:outline-none focus:border-b-2 bg-slate-50    px-4 py-3 text-sm"
                                            placeholder="Country"
                                            value={billingAddress.country}
                                            readOnly
                                        />
                                        <input
                                            type="text"
                                            className="w-1/2  focus:border-b-black border-b-transparent   focus:outline-none focus:border-b-2 bg-slate-50    px-4 py-3 text-sm"
                                            placeholder="State"
                                            name="state"
                                            value={billingAddress.state}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex space-x-4">
                                        <input
                                            type="text"
                                            className="w-1/2  focus:border-b-black border-b-transparent   focus:outline-none focus:border-b-2 bg-slate-50    px-4 py-3 text-sm"
                                            placeholder="City"
                                            name="city"
                                            value={billingAddress.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            className="w-1/2  focus:border-b-black border-b-transparent   focus:outline-none focus:border-b-2 bg-slate-50    px-4 py-3 text-sm"
                                            placeholder="Zip / Postal Code"
                                            name="postalCode"
                                            value={billingAddress.postalCode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="deliveryAddress"
                                                value="Home"
                                                checked={billingAddress.deliveryAddress === 'Home'}
                                                onChange={handleInputChange}
                                            />
                                            <span className="ml-2">Home</span>
                                        </label>
                                        <label className="flex  text-sm items-center">
                                            <input
                                                className='text-sm '
                                                type="radio"
                                                name="deliveryAddress"
                                                value="Office"
                                                onChange={handleInputChange}
                                            />
                                            <span className="ml-2">Office</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                                <div className="relative">

                                    <label htmlFor="option2-checkbox" className="inline-flex items-center justify-between w-full px-5 py-2 bg-white rounded-lg cursor-pointer group border-[1px] border-gray-600 ">
                                        <div className="flex items-center space-x-5">
                                            <div className="flex flex-col justify-start">

                                                <div className="w-full text-lg font-normal"><MdOutlinePayment size={26} className='inline-block text-gray-700 mr-5' />Cash On Delivery</div>

                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            {isLoggedIn ?
                                <button
                                    disabled={!cart || !cart.lineItems || cart.lineItems.length === 0 || isPlacingOrder}
                                    type="submit"
                                    className="disabled:cursor-not-allowed disabled:opacity-70 w-full bg-black text-white font-medium py-2 rounded-lg">
                                    {isPlacingOrder ? (<AiOutlineLoading size={22} className='inline-block text-center animate-spin ' />) : ('Place Order')}
                                </button> :
                                <button className="bg-black text-[16px] text-white  font-normal  w-full py-2 px-4 rounded-lg  transition-all duration-300" >
                                    <Link
                                        href="/login"
                                    >
                                        Login to Complete Your Order <FaChevronRight className='inline-block ml-2' />
                                    </Link>
                                </button>

                            }
                        </form>

                        {/* Right Section - Order Summary */}
                        <div className="w-full lg:w-1/3 space-y-6 mt-6 lg:mt-0">
                            <div className="sticky top-14 p-6 rounded-lg shadow-md space-y-4">
                                <h2 className="text-lg text-center font-semibold"> <FaShoppingBag className='inline-block text-gray-900' /> Order Summary</h2>
                                {cart && cart.lineItems && cart.lineItems.length > 0 ? (
                                    <div className="h-[40vh] overflow-y-auto">
                                        {isLoading ? (
                                            <div className="h-[30%]">
                                                <LoadingLogo />
                                            </div>
                                        ) : (
                                            cart.lineItems.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    <div className="py-4 ml-2 md:ml-10 px-4 flex items-center space-x-4">
                                                        <CartItem item={item} />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-700 text-sm pt-5 pb-2">

                                        Your cart is empty.
                                    </div>
                                )}

                                <div className={`${cart && cart.lineItems && cart.lineItems.length > 0 ? 'block' : 'hidden'} space-y-2 py-10`}>
                                    <div className="space-y-1 text-md">
                                        <div className="flex justify-between">
                                            <span>Subtotal:</span>
                                            <span>Rs {0 || cart?.subtotal?.amount && parseInt(cart.subtotal.amount)} /-</span>
                                        </div>
                                        <div className="flex justify-between text-md">
                                            <span>Delivery:</span>
                                            <span>Rs 200 /-</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-md">
                                            <span>Total:</span>
                                            <span> Rs {0 || cart?.subtotal?.amount && parseInt(cart.subtotal.amount) + 200} /-</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >) : (
                <OrderPlaced />
            )}
        </div>
    )
}

export default CheckoutForm
