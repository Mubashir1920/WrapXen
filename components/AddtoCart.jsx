'use client'
import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';

const AddToCart = ({ productId, variantId, stockNumber }) => {

    const [count, setCount] = useState(1);

    const incrementCount = () => setCount(count + 1);
    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    return (

        <div className='flex flex-col gap-4'>
            <p className='text-black text-xs' > Only <span className='text-orange-700' >{stockNumber} items</span> are Left!  </p>
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
                <button className="flex items-center space-x-2 bg-blue-400 text-white rounded-full px-6 py-2 font-semibold text-sm hover:bg-blue-500 hover:shadow-sm">
                    <FaShoppingCart size={16} />
                    <span>ADD TO CART</span>
                </button>

                {/* Favorite Button */}
                <button className="flex items-center transition-colors duration-300 justify-center border border-gray-400 rounded-full p-2">
                    <FiHeart size={20} />
                </button>


            </div>
            {/* Buy It Now Button */}
            <button className="bg-black hover:bg-gray-900 transition-colors  duration-300 text-white rounded-2xl  md:w-[60%] px-8 py-2 font-semibold text-sm">
                BUY IT NOW
            </button>
        </div>
    );
};

export default AddToCart;
