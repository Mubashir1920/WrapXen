import Image from "next/image";
import Logo from '@/public/images/Logo.png'
import { FaFacebook, FaInstagram } from "react-icons/fa";



const Footer = () => {
  const Year = new Date().getFullYear()
  return (
    <footer className="bg-white border border-gray-100 mt-10 rounded-tl-3xl rounded-tr-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-teal-600">
           <Image src={Logo} width={160} alt="WrapXen" height={100} />
          </div>

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
           <FaFacebook size={22} className="hover:text-blue-500 transition-colors" />
           <FaInstagram size={22} className="hover:text-pink-500 transition-colors"  />
          </ul>
        </div>

        <div
          className="grid justify-items-center md:justify-items-start text-center md:text-left grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16"
        >
          <div>
            <p className="font-medium text-gray-900">Services</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> 1on1 Coaching </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Company Review </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> HR Consulting </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> SEO Optimisation </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Company</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> About </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Meet the Team </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Helpful Links</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Contact </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> FAQs </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Live Chat </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Legal</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Accessibility </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Returns Policy </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Refund Policy </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Hiring Statistics </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">&copy; {Year}. WrapXen. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
