import Image from "next/image"
import ShopBg from '@/public/images/Shopbg.jpg'

const HeroBanner = ({ image, text }) => {
    return (
        <div className="w-full h-[150px] overflow-hidden relative " >
            <div className="z-[1] absolute top-0 left-0 w-full h-full bg-[#00000077]" ></div>
            <Image
                alt="Wrapxen-Banner"
                src={ShopBg || image}
                className="w-full h-full object-cover bg-center"
                fill
                sizes="100vw"
                priority
            />
            <div className="absolute top-16 left-0 w-full h-full flex justify-center items
            -center text-white text-4xl font-bold " >
                <h1 className="z-[2] text-4xl uppercase tracking-wider font-bold"> {text || 'Shop'} </h1>

            </div>
        </div>
    )
}

export default HeroBanner
