'use client'

import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import SideBarNav from "./SideBarNav";
import Logo from '@/public/images/Logo.png'
import NavIcons from "./NavIcons";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [showSideNav, setShowSideNav] = useState(false)



  return (
    <header className="bg-white shadow-sm shadow-gray-200 py-1">
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
          </ul>
        </div>


        {/* Site Icon */}
        <div className="select-none" >
          <Link href='/' >
            <Image height={100} width={150} priority='true' alt="WarpXenLogo" src={Logo} />
          </Link>
        </div>

        {/* Icons */}
        <NavIcons  setShowSideNav={setShowSideNav} />


      </nav>
    </header>
  )
}

export default Navbar
