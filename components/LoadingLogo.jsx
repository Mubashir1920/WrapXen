import Logo from '@/public/images/Mobilelogo.png';
import Image from 'next/image';

const LoadingLogo = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image
                src={Logo}
                alt="WrapXen"
                width={100}
                height={100}
                className="object-contain animate-pulse"
            />
        </div>
    );
};

export default LoadingLogo;
