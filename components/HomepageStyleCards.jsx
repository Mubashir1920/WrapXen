

const HomepageStyleCards = () => {
    return (
        <div className="mt-20 container mx-auto" >
            <div className="flex  flex-col lg:flex-row justify-left gap-16 lg:gap-2 items-center mt-10">

                {/* <!-- Laptop Skin Card --> */}
                <div className="relative bg-sky-200 p-6 rounded-xl w-[80%] lg:w-auto  h-48 overflow-visible flex-grow ">
                    <div className="w-[50%]" >
                        <img src="/ProductImages/1.webp" alt="Laptop Skins" className="absolute -right-7 md:right-2 -top-8 w-56 h-56 md:w-64 md:h-64 " />
                    </div>
                    <div className="w-[50%]">
                        <h2 className="text-lg font-bold text-gray-900">Signature Laptop Skins</h2>
                        <p className="text-sm font-medium text-gray-600 mt-1">
                            Custom-fit skins that add both flair and protection.
                        </p>
                        <p className="text-sm hidden md:block font-medium text-gray-600 mt-1">
                            Choose from a wide range of colors, textures
                        </p>
                    </div>
                </div>

                {/* <!-- Mobile Skin Card --> */}
                <div className="relative bg-indigo-200 p-6 rounded-xl   w-[80%] lg:w-auto h-48 overflow-visible flex-grow">
                    <div className="w-[50%]" >
                        <img src="/ProductImages/2.png" alt="Mobile Skins" className="absolute -right-7 md:right-2 -top-6 w-60 h-60 md:w-64 md:h-64" />
                    </div>
                    <div className="w-[50%]">
                        <h2 className="text-lg font-bold text-gray-900">Distinct Mobile Wraps</h2>
                        <p className="text-sm font-medium text-gray-600 mt-1">
                            Sleek, high-quality skins designed for everyday durability.
                        </p>
                        <p className="text-sm hidden md:block font-medium text-gray-600 mt-1">
                            Skins tailored to fit your laptop and mobile
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomepageStyleCards
