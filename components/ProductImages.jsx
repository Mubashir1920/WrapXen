'use client'
import Image from "next/image"
import { useState } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { Gallery, Item } from 'react-photoswipe-gallery'


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
        <Gallery>
            <div>
                <div className="h-[400px] relative" >
                    <Item
                        original={items[index].image?.url}
                        thumbnail={items[index].image?.url}
                        width='600'
                        height='600'
                    >
                        {({ ref, open }) => (
                            <Image
                                ref={ref}
                                onClick={open}
                                src={items[index].image?.url}
                                alt='thumbnail'
                                className="rounded-lg object-contain shadow-sm"
                                placeholder="blur"
                                blurDataURL="/images/Mobilelogo.png"
                                sizes="50vw"
                                fill
                            />
                        )}
                    </Item>

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
                        <div key={item._id} className="w-1/4 md:w-1/5 h-24 relative mt-2 cursor-pointer">
                            <Image
                                onClick={() => setIndex(i)}
                                key={item._id}
                                src={item.image?.url}
                                alt='thumbnail'
                                className="rounded-lg object-contain shadow-sm"
                                priority={false}
                                sizes="30vw"
                                fill
                            />
                        </div>
                    ))
                    }

                </div>
            </div>
        </Gallery >
    )
}

export default ProductImages
