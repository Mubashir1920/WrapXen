'use client'

import { useEffect, useRef } from 'react';
import styles from './cart.module.css'
import { IoMdClose } from "react-icons/io";
import CartItem from '../CartItem';
import { useWixClient } from '@/hooks/useWixClient';
import { useCartStore } from '@/hooks/useCartStore';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Link from 'next/link';
import LoadingLogo from '../LoadingLogo';

const Cart = ({ active, setactive }) => {


    const wixClient = useWixClient()
    const cartRef = useRef(null);
    const { cart, getCart, isLoading } = useCartStore()


    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [active]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setactive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getCart(wixClient)
    }, [wixClient, getCart])




    return (
        (<>

            {/* Bg Shadow */}
            <div className={`fixed z-[9] top-0 left-0 w-[100vw] h-[100dvh] bg-[#0000003a]  ${active ? "block opacity-1" : "hidden opacity-0"}`}>
            </div>

            {/* Cart */}
            <div ref={cartRef}
                className={`flex flex-col  border  border-black  ${styles.cart} ${active ? styles.active : styles.notactive} fixed  top-0 right-0 h-[100dvh] pr-4  pl-10 bg-white rounded-tl-2xl rounded-bl-2xl w-[80vw] md:[50vw] lg:w-[30vw]`} >
                {/* Title */}
                <div className='h-100px mb-4 flex justify-between  relative mt-4'>
                    <h3 className=' text-xl text-left mt-2'>Shopping Cart</h3>
                    <IoMdClose onClick={() => setactive(prev => !prev)} size={22} className='mt-3 mr-4  hover:rotate-180 transition-all duration-300 cursor-pointer font-light' />
                </div>

                <div className=" h-[55vh]  py-2   overflow-y-auto pr-4">
                    {isLoading && cart.lineItems && cart.lineItems.length > 0 ?
                        (
                            <div className='h-[30%]' >
                                <LoadingLogo />
                            </div>
                        ) :
                        (cart.lineItems && cart.lineItems.length > 0 ?
                            (
                                cart.lineItems.map((item, index) => (
                                    <CartItem key={index} item={item} />
                                ))
                            ) : (

                                <div className=' text-gray-500 h-full w-full flex flex-col items-center justify-center gap-2' >
                                    <MdOutlineAddShoppingCart size={50} />
                                    <p>Your Cart is Empty</p>

                                    <Link onClick={() => setactive(false)} className='mt-4' href='/store' >Go To Shop</Link>
                                </div>
                            ))

                    }
                </div>

                {/* Subtotal */}
                <div className={` ${active ? 'translate-y-0' : 'translate-y-full'} bg-white transition-transform duration-300 rounded-bl-2xl delay-100  absolute bottom-0 left-0 pt-2 pb-10 w-full border-t-[1px] px-4   shadow-black`} >
                    {(cart && cart?.subtotal?.amount > 0) && <h1 className=' font-bold text-lg py-2' >
                        Subtotal : <div className='inline-block font-semibold text-md' > Rs {0 || cart?.subtotal?.amount && parseInt(cart.subtotal.amount)} /-</div>
                    </h1>}
                    <button onClick={() => setactive(false)} className='border border-gray-300 hover:border-gray-400 transition-colors duration-300  w-full font-bold text-md  mb-2 text-gray-800   rounded-md' disabled={isLoading}>
                        <Link href='/cart' className='  w-full block  py-2' > View Cart</Link>
                    </button>
                    <button onClick={() => setactive(false)} className='bg-black disabled:cursor-not-allowed disabled:opacity-75  w-full transition-colors duration-300 text-md  text-white   rounded-md' disabled={isLoading} >
                        <Link href='/checkout' className='w-full block  py-2'   > Checkout</Link>
                    </button>
                </div>


            </div>
        </>
        )
    );
};

export default Cart;
