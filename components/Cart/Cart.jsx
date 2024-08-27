'use client'

import styles from './cart.module.css'
import { FiArrowRight } from "react-icons/fi";

const Cart = ({ active, setactive }) => {
    return (
        (
            <div className={`flex flex-col shadow-md shadow-gray-200 border  border-black  ${styles.cart} ${active ? styles.active : styles.notactive} fixed top-0 right-0 h-[100vh]  pl-10 bg-white rounded-tl-2xl rounded-bl-2xl w-[80vw] md:w-[30vw]`} >
                <div className='h-full relative mt-6'>
                    <FiArrowRight onClick={() => setactive(prev => !prev)} size={22} className='mt-2 cursor-pointer font-light' />
                    <h3 className='text-2xl text-left mt-2'>Cart</h3>
                </div>
            </div>
        )
    );
};

export default Cart;
