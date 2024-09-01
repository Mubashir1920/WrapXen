'use client'
import Image from "next/image"
import { useState } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';


const ProductImages = ({ items }) => {
    const [index, setIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = index === 0;
        const newIndex = isFirstSlide ? items.length - 1 : index - 1;
        setIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = index === items.length - 1;
        const newIndex = isLastSlide ? 0 : index + 1;
        setIndex(newIndex);
    };
    return (
        <div>
            <div className="h-[500px] relative" >
                <div
                    style={{ backgroundImage: `url(${items[index].image?.url})` }}
                    className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:block w-full h-full rounded-2xl bg-center bg-contain bg-no-repeat duration-500 relative'
                >
                </div>
                {/* Left Arrow */}
                <div className='hidden md:block hover:bg-blue-300 hover:text-white hover:border-white transition-colors duration-300 absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-lg rounded-full p-2 border border-black  text-black cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={16} />
                </div>

                {/* Right Arrow */}
                <div className='hidden md:block absolute hover:bg-blue-300 hover:text-white hover:border-white transition-colors duration-300 top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 border border-black  text-black cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={16} />
                </div>
                
            </div>
            <div className="flex justify-left gap-4 my-4" >
                {items.map((item, i) => (
                    <div key={i} className="w-1/6 h-24 relative mt-2">
                        <Image
                            onClick={() => setIndex(i)}
                            src={item.image?.url}
                            alt='thumbnail'
                            className="rounded-lg shadow-sm"
                            priority='true'
                            sizes="30vw"
                            fill
                        />
                    </div>
                ))
                }

            </div>
        </div>
    )
}

export default ProductImages
