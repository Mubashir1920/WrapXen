'use client'
import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Image from 'next/image';
import srcimg from '@/public/images/wrapxen-offer.webp'



export const Carousel = () => {
    const slides = [
        {
            url: '/images/1.png',
            text: 'Transform Your Laptop with Custom Full Skins',
            subtext: 'Express your style with our premium full-coverage skins. Perfect fit, easy application, and endless designs',
            buttonText: 'Shop Now',
        },
        {
            url: '/images/2.png',
            text: 'Protect & Personalize',
            subtext: 'Durable protection with a touch of your personality. Choose from our curated collection or create your own',
            buttonText: 'Explore Designs',
        },
    ];
    const mobileSlides = [
        {
            url: '/images/MG.png',
            text: 'Transform Your Laptop with Custom Full Skins',
            subtext: 'Express your style with our premium full-coverage skins. Perfect fit, easy application, and endless designs',
            buttonText: 'Shop Now',
        },
        {
            url: '/images/MG2.png',
            text: 'Protect & Personalize',
            subtext: 'Durable protection with a touch of your personality. Choose from our curated collection or create your own',
            buttonText: 'Explore Designs',
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

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         nextSlide();
    //     }, 2000);
    //     return () => clearInterval(intervalId);

    // }, [currentIndex])

    return (
        <>
            <div className=' max-w-[1400px] h-[calc(100vh-280px)] md:h-[calc(100vh-80px)] py-2 w-full m-auto md:px-4 px-2 relative group'>
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
            <div className="w-full mx-auto px-2  container">
                <Image alt='WrapXenOffer' src={srcimg} />
            </div>
        </>
    );
};

export default Carousel;
