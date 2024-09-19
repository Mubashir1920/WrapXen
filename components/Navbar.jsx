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

const Navbar = () => {
  const pathname = usePathname()
  const [showSideNav, setShowSideNav] = useState(false)



  return (
    <header className="bg-white shadow-sm z-50 fixed top-0 left-0 w-full shadow-gray-200 py-1">
      <nav className="flex items-center justify-between w-[95%] py-5  mx-auto relative">
        {/* Left Side (Menu) */}
        <div className="flex items-center w-1/3">
          {/* Mobile Nav Menu Btn */}
          <RxHamburgerMenu
            onClick={() => {
              setShowSideNav(prev => !prev);
            }}
            className="text-3xl cursor-pointer md:hidden text-gray-900"
          />
          {/* Mobile Nav */}
          <SideBarNav active={showSideNav} setActive={setShowSideNav} />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center px-5">
            <ul className="flex gap-6">
              <li>
                <Link className={`group-hover:text-gray-500 ${pathname === "/" ? "active" : ""}`} href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={`group-hover:text-gray-500 ${pathname === "/store" ? "active" : ""}`} href="/store">
                  Store
                </Link>
              </li>
              <li className="group hidden  xl:block">
                <Link className={`group-hover:text-gray-500`} href="#">
                  Skins
                  <FaChevronDown size={12} className="inline-block group-hover:text-gray-500 text-gray-900 ml-1" />
                </Link>
                <div className="hidden group-hover:block hover:block z-10 absolute top-11 left-48 bg-white divide-y divide-gray-100 rounded-lg shadow w-36">
                  <div className="px-2 py-6 text-sm text-center flex flex-col gap-4 text-black">
                    <Link className={`group-hover:text-gray-500`} href="/store?type=laptopSkins">
                      Laptop Skins
                    </Link>
                    <Link className={`group-hover:text-gray-500`} href="/store?type=mobileSkins">
                      Mobile Skins
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link className={`group-hover:text-gray-500 ${pathname === "/checkout" ? "active" : ""}`} href="/checkout">
                  Checkout
                </Link>
              </li>
              <li>
                <Link className={`group-hover:text-gray-500 ${pathname === "/contact" ? "active" : ""}`} href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Center (Logo) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <Image
              className="h-[40px] hidden lg:inline-block w-auto"
              height={0}
              width={0}
              priority="true"
              alt="WarpXenLogo"
              sizes="33%"
              src={Logo}
            />
            <Image
              className="lg:hidden h-[35px] w-auto"
              priority={true}
              alt="WrapXenLogo"
              sizes="33%"
              src={MobileLogo}
            />
          </Link>
        </div>

        {/* Right Side (Icons) */}
        <div className="flex justify-end w-1/3">
          <NavIcons setShowSideNav={setShowSideNav} />
        </div>
      </nav>
    </header>

  )
}

export default Navbar
