'use client'

import { useEffect, useRef, useState } from "react"
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";



const SideBarNav = ({ active, setActive }) => {

    const pathname = usePathname()
    const sideNavRef = useRef(null);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };
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
                    <ul className="flex flex-col gap-10 mt-20">
                        <li>
                            <Link onClick={() => setActive(false)} className={`group-hover:text-gray-500 ${pathname === "/" ? "active" : ""} `} href="/">Home</Link>
                        </li>
                        <li>
                            <Link onClick={() => setActive(false)} className={`group-hover:text-gray-500 ${pathname === "/store" ? "active" : ""} `} href="/store">Store</Link>
                        </li>
                        <li onClick={toggleSubMenu}>
                            <a
                                className={`group-hover:text-gray-500`}
                                href="#"

                            >
                                Skins <FaChevronDown className={`inline-block ml-2 transition-transform duration-300 ${isSubMenuOpen ? 'rotate-180' : ''}`} size={13} />
                            </a>
                            <div
                                className={`px-2 pt-6 pb-2 text-[15px] flex flex-col gap-6 text-black transition-all duration-300 ease-in-out overflow-hidden ${isSubMenuOpen ? 'block translate-y-0 opacity-100 ' : '  opacity-0 hidden translate-y-14 '}`}
                            >
                                <Link onClick={() => setActive(false)} className={`group-hover:text-gray-500 ${pathname === "/store?type=laptopSkins" ? "active" : ""}`} href={`/store?type=laptopSkins`}>Laptop Skins</Link>
                                <Link onClick={() => setActive(false)} className={`group-hover:text-gray-500 ${pathname === "//store?type=mobileSkins" ? "active" : ""}`} href={`/store?type=mobileSkins`}>Mobile Skins</Link>
                            </div>
                        </li>
                        <li>
                            <Link onClick={() => setActive(false)} className={`group-hover:text-gray-500 ${pathname === "/checkout" ? "active" : ""} `} href="/checkout">Checkout</Link>
                        </li>
                        <li>
                            <Link onClick={() => setActive(false)} className={`group-hover:text-gray-500 ${pathname === "/contact" ? "active" : ""} `} href="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBarNav
