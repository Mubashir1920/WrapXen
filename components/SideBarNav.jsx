'use client'

import { useEffect, useRef } from "react"
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";


const SideBarNav = ({ active, setActive }) => {
    const sideNavRef = useRef(null);
    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [active]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
                setActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div ref={sideNavRef}
            className={`z-10 transform  transition-transform duration-500 ease-in-out fixed top-0 left-0 h-[100vh] pl-10 bg-white border border-black rounded-tr-2xl rounded-br-2xl w-[80vw] md:w-[30vw] ${active ? 'translate-x-0' : '-translate-x-full'
                }`}>
            <div className='h-full relative '>
                <FiArrowLeft onClick={() => setActive(false)} size={25} className='top-2 cursor-pointer absolute right-10 ' />
                <h3 className='text-2xl text-left mt-20 tracking-tighter font-bold'>WRAPXEN</h3>
                <div className="  bg-white items-center   ">
                    <ul className="flex flex-col gap-2 mt-10">
                        <li>
                            <Link onClick={() => setActive(false)} className="hover:text-gray-500 text-lg" href="/">Home</Link>
                        </li>
                        <li>
                            <Link onClick={() => setActive(false)} className="hover:text-gray-500 text-lg" href="/store">Store</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBarNav
