import Logo from '@/public/images/Mobilelogo.png'
import Image from 'next/image'
const loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image src={Logo}
                priority
                alt='WrapXen'
                sizes='20vw'
                width={0}
                height={0}
                className='object-contain w-[100px] h-[100px] animate-pulse' />
        </div>
    )
}

export default loading
