import Logo from '@/public/images/Mobilelogo.png'
import Image from 'next/image'

const LoadingLogo = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image src={Logo} alt='WrapXen' sizes='20vw' className='object-contain w-[100px] h-[100px] animate-pulse' />
        </div>
    )
}

export default LoadingLogo
