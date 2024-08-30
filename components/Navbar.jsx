'use client'

import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import SideBarNav from "./SideBarNav";
import Logo from '@/public/images/Logo.png'
import NavIcons from "./NavIcons";
import { FaChevronDown } from "react-icons/fa";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [showSideNav, setShowSideNav] = useState(false)



  return (
    <header className="bg-white shadow-sm z-50 fixed top-0 left-0 w-full shadow-gray-200 py-1">
      <nav className="flex justify-between  items-center w-[92%] py-3 mx-auto">

        {/*  Mobile Nav Menu Btn*/}
        <RxHamburgerMenu
          onClick={() => {
            setShowSideNav(prev => !prev)
          }}
          className="text-3xl cursor-pointer md:hidden text-gray-900"
        />
        {/* Mobile Nav */}
        <SideBarNav active={showSideNav} setActive={setShowSideNav} />


        {/* Nav */}
        <div className="  bg-white md:flex items-center px-5 hidden ">
          <ul className="flex  gap-8 ">
            <li>
              <Link className="hover:text-gray-500" href="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" href="/store">Store</Link>
            </li>
            <li className="group " >
              <Link className="group-hover:text-gray-500 " href="/store">Skins <FaChevronDown size={12} className="inline-block group-hover:text-gray-500  text-gray-900" /> </Link>
              <div className="hidden group-hover:block hover:block z-10 fixed top-11 left-48 md:left-48  bg-white divide-y divide-gray-100 rounded-lg shadow w-36" >
                <div className="px-2 py-6 text-sm text-center  flex flex-col gap-4 text-black">
                <Link className="hover:text-gray-500" href="/store">Laptop Skins  </Link>
                <Link className="hover:text-gray-500" href="/store">Mobile Skins</Link>
                </div>

              </div>
            </li>
          </ul>
        </div>


        {/* Site Icon */}
        <div className="select-none" >
          <Link href='/' >
            <Image height={100} width={150} priority='true' alt="WarpXenLogo" src={Logo} />
          </Link>
        </div>

        {/* Icons */}
        <NavIcons setShowSideNav={setShowSideNav} />


      </nav>
    </header>
  )
}

export default Navbar
