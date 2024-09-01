import '@/assets/styles/global.css'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Poppins } from "next/font/google";
import { WixClientProvider } from '@/context/wixContext';

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
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${poppins.className} mt-20`}>
        <WixClientProvider>
          <Navbar />
          {children}
          <Footer />
        </WixClientProvider>
      </body>
    </html>
  );
}
