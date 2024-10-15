'use client'
import { useEffect, useRef, useState } from 'react'
import { BsEnvelope } from 'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'
import { IoMdClose } from "react-icons/io";


const Popup = () => {

    const [mounted, setMounted] = useState(false)
    const closeRef = useRef()


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (closeRef.current && !closeRef.current.contains(event.target)) {
                setMounted(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    useEffect(() => {

        setTimeout(() => {
            setMounted(true)
        }, 6000);
    }, [])

    
    return mounted && (
        <div className='fixed top-0 left-0 w-full h-full bg-[#00000091] z-[100] flex justify-center items-center' >
            <div ref={closeRef} className='bg-white p-10 rounded-md shadow-md w-[80%]  sm:w-[500px] relative h
            [300px] flex flex-col gap-2 '>
                <IoMdClose onClick={() => setMounted(false)} size={26} className='hover:text-gray-800 cursor-pointer  absolute right-4 top-4' />
                <p>Website Designed and Developed By <a href="https://mubashirdev.netlify.app" className='font-semibold ' target='_blank' >Mubashir</a> </p>
                <p >Looking For A Customized Site ? Let's Connects</p>
                <div className='flex gap-2' >
                    <a href="https://www.linkedin.com/in/mohammad-mubashir-060923234/" target='_blank' >
                        <FaLinkedinIn className='inline-block bg-blue-800 text-white p-1 rounded-lg' size={25} />
                    </a>
                    <a href="mailto:mubashir417@outlook.com">
                        <BsEnvelope className='inline-block bg-black text-white p-1 rounded-lg' size={26} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Popup
