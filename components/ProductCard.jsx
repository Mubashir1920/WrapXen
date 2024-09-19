
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import LoadingLogo from './LoadingLogo';


const ProductCard = ({ product }) => {


    return (

        <div className="md:w-72 px-2 py-2 relative w-[80%] bg-white rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="relative  md:h-[250px] hover:scale-[1.01] transition-transform duration-1000 ease-in-out   cursor-pointer ">
                <Link className='' href={`/product/${product.slug}`} >
                    <Suspense fallback={<LoadingLogo />} >
                        <Image
                            src={product.media?.mainMedia?.image?.url || "/images/Anime.webp"}
                            alt="Product"
                            className="w-full h-full md:h-64 object-cover"
                            height={0}
                            width={0}
                            priority='true'
                            sizes="100%"
                        />
                    </Suspense>
                    <Suspense fallback={<LoadingLogo />} >
                        {product.media?.items && <Image
                            src={product.media?.items[1]?.image?.url || "/images/Anime.webp"}
                            alt="Product"
                            className="absolute top-0 hover:opacity-0 transition-opacity easy duration-300  w-full h-full md:h-64 object-cover"
                            height={0}
                            width={0}
                            priority='true'
                            sizes="100%"
                        />}
                    </Suspense>
                </Link>
            </div>
            {(!product.stock.inStock && product.stock.quantity === 0) && <button className="absolute top-2 right-2 text-white  p-1 rounded-full">
                <span className='w-[30px] text-sm h-[30px] bg-red-600 px-2  ' >Out Of Stock</span>
            </button>}
            <div className="p-3">
                <div className="flex items-center space-x-2 mt-4">
                    {product.priceData.discountedPrice !== product.priceData.price ? (<div>
                        <span className="text-sm tracking-tighter font-bold text-red-500 mr-2">Rs {product.priceData.discountedPrice.toFixed()} /- </span>
                        <span className="text-sm line-through text-gray-500">Rs {product.priceData.price} </span>
                    </div>) : (

                        <span className="text-sm tracking-tighter font-bold text-red-600 "> Rs {product.priceData.price}/-  </span>
                    )}
                </div>

                <div className="flex flex-wrap justify-start items-start gap-2 mt-3">
                    {product.productOptions.length > 0 && product.productOptions[0].choices.map((size, index) => (
                        <span key={index} className="text-xs text-gray-600 border hover:border-gray-400 transition-colors hover:bg-gray-200 border-gray-300 rounded-full px-2 py-1">
                            {size.value}
                        </span>
                    ))}
                </div>
                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-[14px] text-left text-gray-700 font-medium cursor-pointer mt-1"> {product.name} </h3>
                </Link>
            </div>
        </div>

    );
};

export default ProductCard;
