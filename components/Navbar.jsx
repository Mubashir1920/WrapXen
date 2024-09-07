'use client'

import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SideBarNav from "./SideBarNav";
import { FaChevronDown } from "react-icons/fa";
import Logo from '@/public/images/Logo.png'
import MobileLogo from '@/public/images/Mobilelogo.png'
import { usePathname } from "next/navigation";
import NavIcons from "./NavIcons";
import dynamic from "next/dynamic";

// const NavIcons = dynamic(()=> import('./NavIcons'), {ssr:false})


const Navbar = () => {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(true)

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
              <Link className={`group-hover:text-gray-500 ${pathname === "/" ? "active" : ""} `} href="/">Home</Link>
            </li>
            <li>
              <Link className={`group-hover:text-gray-500 ${pathname === "/store" ? "active" : ""} `} href="/store">Store</Link>
            </li>
            <li className="group " >
              <Link className={`group-hover:text-gray-500`} href='#' >Skins <FaChevronDown size={12} className="inline-block group-hover:text-gray-500  text-gray-900" /> </Link>
              <div className="hidden group-hover:block hover:block z-10 fixed top-11 left-48 md:left-48  bg-white divide-y divide-gray-100 rounded-lg shadow w-36" >
                <div className="px-2 py-6 text-sm text-center  flex flex-col gap-4 text-black">
                  <Link className={`group-hover:text-gray-500 `} href='/store?type=laptopSkins'>Laptop Skins  </Link>
                  <Link className={`group-hover:text-gray-500 `} href='/store?type=mobileSkins'>Mobile Skins</Link>
                </div>

              </div>
            </li>
          </ul>
        </div>


        {/* Site Icon */}
        <div className="select-none" >
          <Link href='/' >
            <Image
              className="h-[40px] hidden lg:inline-block w-auto"
              height={0}
              width={0}
              priority='true'
              alt="WarpXenLogo"
              sizes="33%"
              src={Logo}
            />
            <Image
              className="lg:hidden h-[35px] w-auto"
              height={0}
              width={0}
              priority='true'
              alt="WarpXenLogo"
              sizes="33%"
              src={MobileLogo}
            />
          </Link>
        </div>

        {/* Icons */}
        <NavIcons setShowSideNav={setShowSideNav} />


      </nav>
    </header>
  )
}

export default Navbar
