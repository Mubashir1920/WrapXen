'use client'

import { useEffect, useRef } from 'react';
import styles from './cart.module.css'
import { IoMdClose } from "react-icons/io";

const Cart = ({ active, setactive }) => {
    const cartRef = useRef(null);

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
    return (
        (
            <div ref={cartRef} className={`flex flex-col  border  border-black  ${styles.cart} ${active ? styles.active : styles.notactive} fixed top-0 right-0 h-[100dvh] pr-2  pl-10 bg-white rounded-tl-2xl rounded-bl-2xl w-[80vw] md:w-[30vw]`} >
                <div onClick={(e) => e.stopPropagation()} className='h-100px flex relative mt-6'>
                    <IoMdClose onClick={() => setactive(prev => !prev)} size={22} className='mt-3 mr-4  hover:rotate-180 transition-all duration-300 cursor-pointer font-light' />
                    <h3 className=' text-2xl text-left mt-2'>Cart</h3>
                </div>
                <div className={` ${active ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-500 rounded-bl-2xl delay-200  absolute bottom-0 left-0 pt-2 pb-10 w-full border-t-[1px] px-4   shadow-black`} >
                    <h1 className=' font-bold text-lg py-2' >Subtotal : <span className='font-semibold' >16000 Rs</span> </h1>
                    <button className='border border-gray-300 hover:border-gray-400 transition-colors duration-300  w-full font-bold text-md py-2 mb-2 text-gray-800   rounded-md'>
                        View Cart
                    </button>
                    <button className='bg-blue-400 hover:bg-blue-500 w-full transition-colors duration-300 font-bold text-md py-2 text-gray-800   rounded-md'>
                        Checkout
                    </button>

                </div>
            </div>
        )
    );
};

export default Cart;
