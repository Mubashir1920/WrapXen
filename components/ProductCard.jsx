import Image from 'next/image';
import { MdFavorite } from 'react-icons/md';
import Link from 'next/link';

const ProductCard = ({ product }) => {

    return (

        <div className="md:w-60 relative w-[80%] bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative  md:h-[250px] hover:scale-105 transition-transform duration-1000 ease-in-out   cursor-pointer ">
                <Link className='' href={`/product/${product.slug}`} >
                    <Image
                        src={product.media?.mainMedia?.image?.url || "/images/Anime.webp"}
                        alt="Product"
                        className="w-full h-full md:h-64 object-cover"
                        height={0}
                        width={0}
                        priority='true'
                        sizes="100%"
                    />
                    {product.media?.items && <Image
                        src={product.media?.items[1]?.image?.url || "/images/Anime.webp"}
                        alt="Product"
                        className="absolute top-0 hover:opacity-0 transition-opacity easy duration-300  w-full h-full md:h-64 object-cover"
                        height={0}
                        width={0}
                        priority='true'
                        sizes="100%"
                    />}
                </Link>
            </div>
            <button className="absolute top-2 right-2 bg-blue-300 text-white p-1 rounded-full">
                <MdFavorite size={18} />
            </button>
            <div className="p-3">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-black font-bold">Rs {product.price.price}/-</span>
                </div>
                <div className="flex flex-wrap justify-start items-start gap-2 mt-3">
                    {product.productOptions[0].choices.map(size => (
                        <span className="text-xs text-gray-600 border hover:border-gray-400 transition-colors hover:bg-gray-200 border-gray-300 rounded-full px-2 py-1">
                            {size.value}
                        </span>
                    ))}
                </div>
                <h3 className="text-[14px] text-left text-gray-700 font-medium mt-1"> {product.name} </h3>
            </div>
        </div>

    );
};

export default ProductCard;
