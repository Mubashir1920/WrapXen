import Image from "next/image";
import Logo from '@/public/images/Logo.png'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";



const Footer = () => {
  const Year = new Date().getFullYear()
  return (
    <footer className="bg-blue-100 border border-gray-100 mt-10 mx-4 mb-5 rounded-3xl  shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-teal-600">
            <Image
              className="h-[35px] w-auto"
              height={0}
              width={0}
              priority='true'
              alt="WarpXenLogo"
              sizes="33%"
              src={Logo}
            />
          </div>

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <FaFacebook size={22} className="hover:text-blue-500 transition-colors" />
            <FaInstagram size={22} className="hover:text-pink-500 transition-colors" />
          </ul>
        </div>

        <div
          className="grid justify-items-center md:justify-items-start text-center md:text-left grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16"
        >
          <div>
            <p className="font-medium text-gray-900">Info</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">About </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">Blog </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">Careers </a>
              </li>

            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Policies</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">Return & Refund Policy </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">Shipping Policy</a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">Privacy Policy </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">Terms Of Services </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Helpful Links</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link href="/" className="text-gray-700 transition hover:opacity-75"> Home </Link>
              </li>
              <li>
                <Link href="/store" className="text-gray-700 transition hover:opacity-75">Shop</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 transition hover:opacity-75"> Contact </Link>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> FAQs </a>
              </li>


            </ul>
          </div>

          <div className="select-none" >
            <p className="font-medium text-gray-900">Our Mission</p>

            <ul className="mt-6 space-y-4 text-sm ">
              <li className="text-gray-700 transition hover:opacity-75">
                Our mission is to empower creativity and self-expression by offering premium, full-body laptop skins that combine protection with personalized style. We strive to deliver exceptional quality and design, ensuring each customer finds a perfect match for their unique taste and lifestyle.
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-2" >
          <p className="text-xs text-gray-500 text-center">&copy; {Year}. WrapXen. All rights reserved.</p>
          <p className="text-xs text-gray-500 text-center">Designed And Developed by <a href="https://mubashirdev.netlify.app" target="_blank" className="font-semibold hover:text-black" >Mubashir</a> </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
