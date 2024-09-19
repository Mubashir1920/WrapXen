'use client'
import { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { useWixClient } from '@/hooks/useWixClient';
import { VscLoading } from "react-icons/vsc";
import { useCartStore } from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';


const AddToCart = ({ productId, variantId, stockNumber }) => {

    const [count, setCount] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const router = useRouter()
    const { addItem } = useCartStore()

    const wixClient = useWixClient()

    const incrementCount = () => setCount(count + 1);
    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };


    const addtoCart = async () => {
        setIsAddingToCart(true);
        try {
            await addItem(wixClient, productId, variantId, count);
        } catch (error) {
            console.error("Error adding to cart:", error);
        } finally {
            setIsAddingToCart(false);
        }
    };
    const BuyItNow = async () => {
        setIsAddingToCart(true);
        try {
            addtoCart()
        } catch (error) {
            console.error("Error adding to cart:", error);
        } finally {
            setIsAddingToCart(false)
        }
        router.push('/checkout')
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Prevent rendering on the server
    }

    return (

        <div className='flex flex-col gap-4'>
            <div className='text-black text-xs' >
                {stockNumber === 0 &&
                    <div>
                        <span className='text-orange-700' >Out Of Stock</span>
                    </div>
                }
            </div>
            <div className="flex items-center space-x-4">
                {/* Counter */}
                <div className="flex items-center border border-gray-400 rounded-full py-2 px-2">
                    <button
                        onClick={decrementCount}
                        className="text-lg font-semibold px-2"
                    >
                        -
                    </button>
                    <span className="px-4 text-md">{count}</span>
                    <button
                        onClick={incrementCount}
                        className="text-lg font-semibold px-2"
                    >
                        +
                    </button>
                </div>

                {/* Add to Cart Button */}
                {isAddingToCart ?
                    (< button className="flex items-center space-x-2 bg-blue-400 text-white rounded-full px-16 py-2 font-semibold text-sm  hover:bg-blue-500 hover:shadow-sm">
                        <VscLoading className='animate-spin' size={22} />
                    </button>)
                    :
                    (
                        < button
                            onClick={addtoCart}
                            className="flex items-center space-x-2 bg-blue-400 text-white rounded-full px-6 py-2 font-semibold text-sm hover:bg-blue-500 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-25"
                            disabled={stockNumber === 0}
                        >
                            <FaShoppingCart size={16} />
                            <span>ADD TO CART</span>
                        </button>
                    )
                }

                {/* Favorite Button */}
                <button className="flex items-center transition-colors duration-300 justify-center border border-gray-400 rounded-full p-2">
                    <FiHeart size={20} />
                </button>


            </div>
            {/* Buy It Now Button */}
            {isAddingToCart ?
                (
                    < button
                        className="bg-black hover:bg-gray-900 flex justify-center transition-colors disabled:opacity-15  duration-300 text-white rounded-2xl  md:w-[60%] px-8 py-2 font-semibold text-sm"
                        disabled={isAddingToCart}>
                        <VscLoading className='animate-spin' size={22} />
                    </button>
                )
                :
                (
                    <button
                        className="bg-black hover:bg-gray-900 transition-colors disabled:opacity-15  duration-300 text-white rounded-2xl  md:w-[60%] px-8 py-2 font-semibold text-sm"
                        onClick={BuyItNow}
                        disabled={stockNumber === 0 || isAddingToCart}
                    >
                        BUY IT NOW
                    </button>
                )
            }

        </div >
    );
};

export default AddToCart;
