'use client'
import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
// import Image from 'next/image';
// import srcimg from '@/public/images/wrapxen-offer.webp'



export const Carousel = () => {
    const slides = [
        {
            url: '/images/3.png',
        },
        {
            url: '/images/4.png',
        },
        {
            url: '/images/5.png',
        },
        {
            url: '/images/6.png',
        },
    ];
    const mobileSlides = [
        {
            url: '/images/mobileBanner/1.png',
        },
        {
            url: '/images/mobileBanner/2.png',
        },
        {
            url: '/images/mobileBanner/3.png',
        },
        {
            url: '/images/mobileBanner/4.png',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 2000);
        return () => clearInterval(intervalId);

    }, [currentIndex])

    return (
        <>
            <div className='max-w-[1400px] h-[calc(100vh-280px)] md:h-[calc(100vh-80px)] py-2 w-full m-auto md:px-4 px-2 relative group'>
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                    className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] hidden md:block w-full h-full rounded-2xl bg-center bg-contain bg-no-repeat duration-500 relative'
                >

                </div>

                {/* Mobile Slide */}
                <div
                    style={{ backgroundImage: `url(${mobileSlides[currentIndex].url})` }}
                    className='md:hidden block w-full h-full rounded-2xl bg-center bg-contain bg-no-repeat duration-500 relative'
                >
                </div>

                {/* Left Arrow */}
                <div className='hidden md:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2  text-black cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>

                {/* Right Arrow */}
                <div className='hidden md:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2  text-black cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>


            </div>
            <div className='px-2 pt-16' >

                <div className="flex gap-2 items-center px-2 md:hidden">
                    <span className="w-2 h-5 rounded-sm bg-black" ></span>
                    <h2 className="text-lg font-medium text-left text-gray-800 capitalize" >Lastest</h2>
                </div>
                <div className="flex md:justify-center justify-start items-center mt-3 md:mt-1">
                    <hr className="hidden md:block w-[35%] bg-black h-0.5" />
                    <h2 className="text-center   md:text-3xl text-2xl font-bold md:font-bold tracking-tighter text-black  capitalize mx-2" >Our Best Sellers</h2>
                    <hr className="hidden md:block w-[35%] bg-black h-0.5" />
                </div>
                <p className="md:text-center mt-3 md:mt-1 text-left px-2  text-gray-700 italic text-sm font-normal capitalize " > laptop skins that offer a perfect mix of style and protection for your device.</p>
            </div>
            {/* <div className="w-full mx-auto px-2  container">
                <Image alt='WrapXenOffer' src={srcimg} />
            </div> */}
        </>
    );
};

export default Carousel;
