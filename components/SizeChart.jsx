'use client'
import { IoMdClose } from 'react-icons/io';
import { FaRulerCombined, FaLaptop, FaPuzzlePiece, FaTools } from 'react-icons/fa';
import Image from 'next/image'
import HowtoLaptop from '@/public/images/laptophowto.jpg'
import Size from '@/public/images/size.png'
import Size2 from '@/public/images/size2.png'

const SizeChart = ({ isOpen, setIsOpen }) => {

    return (
        <div className="relative">
            {/* Button to open the Size Guide */}
            <button
                onClick={() => setIsOpen(true)}
                className="tracking-wide text-gray-600 font-light underline  text-sm"
            >
                SizeGuide
            </button>

            {/* Overlay for pop-up */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative bg-white rounded-xl  w-full max-w-3xl p-6 overflow-y-auto max-h-[80vh] shadow-lg">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-black transition-all"
                        >
                            <IoMdClose size={24} />
                        </button>

                        {/* Guide Content */}
                        <div className='font-normal' >
                            <h2 className= "mx-2  text-sm text-center font-semibold mb-4">
                                Laptop Skin Sizing Guide 
                            </h2>

                            <h3 className="text-xl font-semibold mb-2">Factors to Consider for Laptop Skin Sizing </h3>
                            <p className="mb-4 text-gray-700">
                                When it comes to laptop skin sizing, several factors need to be taken into account to ensure a proper fit and functionality. Let's explore these factors in detail:
                            </p>

                            {/* Section 1 */}
                            <h4 className="md:text-lg text-sm  mb-2 flex items-center">
                                 Laptop Model and Size
                            </h4>
                            <p className="mb-4 text-gray-600">
                                The first consideration is to determine the exact model and size of your laptop. Different laptop manufacturers produce devices in various sizes, such as 13-inch, 14-inch, 15-inch, and 17-inch screens...
                            </p>

                            {/* Section 2 */}
                            <h4 className="md:text-lg text-sm  mb-2 flex items-center">
                                 Cutouts and Alignment
                            </h4>
                            <p className="mb-4 text-gray-600">
                                Another vital aspect of laptop skin sizing is the alignment of cutouts...
                            </p>

                            {/* Section 3 */}
                            <h4 className="md:text-lg text-sm  mb-2 flex items-center">
                                 Customization Options
                            </h4>
                            <p className="mb-4 text-gray-600">
                                While some laptop skins come in standard sizes, others offer customization options...
                            </p>

                            {/* Section 4 */}
                            <h4 className="md:text-lg text-sm  mb-2 flex items-center">
                                Laptop Skin Coverage Options
                            </h4>
                            <p className="text-gray-600">
                                When it comes to laptop skins, there are various coverage options available to suit different preferences...
                            </p>
                            <Image
                                src={HowtoLaptop}
                                priority
                                alt='WrapXen'
                                sizes='100'
                                width={0}
                                height={0}
                                className='object-contain '
                            />
                            <Image
                                src={Size}
                                priority
                                alt='WrapXen'
                                sizes='100'
                                width={0}
                                height={0}
                                className='object-contain '
                            />
                            <Image
                                src={Size2}
                                priority
                                alt='WrapXen'
                                sizes='100'
                                width={0}
                                height={0}
                                className='object-contain '
                            />


                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SizeChart;
