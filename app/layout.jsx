import '@/assets/styles/global.css'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Poppins } from "next/font/google";
import { WixClientProvider } from '@/context/wixContext';
import 'photoswipe/dist/photoswipe.css'
import Favicon from '@/public/favicon.ico'
import ToastProvider from '@/hooks/ToastProvider';
import ScrollToTop from '@/components/ScrollToTop';


const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: {
    default: "WrapXen",
    template: "%s | WrapXen"
  },
  description: "",
  icons: [{ rel: 'icon', url: Favicon.src }]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={`${poppins.className} mt-[65px]`}>
        <WixClientProvider>
          <ToastProvider>
            <Navbar />
            {children}
            <ScrollToTop />
            <Footer />
          </ToastProvider>
        </WixClientProvider>
      </body>
    </html>
  );
}
