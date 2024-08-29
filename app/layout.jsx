import '@/assets/styles/global.css'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: "WRAPXEN ",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
