

const HeadLine = ({ text, desc }) => {
    return (
        <div className='px-2 pt-16 container mx-auto' >

            <div className="flex gap-2 items-center px-2 md:hidden">
                <span className="w-2 h-5 rounded-sm bg-black" ></span>
                <h2 className="text-lg font-medium text-left text-gray-800 capitalize" >  </h2>
            </div>
            <div className="flex md:justify-center justify-start items-center mt-3 md:mt-1">
                <hr className="hidden md:block w-[35%] bg-black h-0.5" />
                <h2 className="text-center   md:text-3xl text-2xl font-bold md:font-bold tracking-tighter text-black  capitalize mx-2" >{text}</h2>
                <hr className="hidden md:block w-[35%] bg-black h-0.5" />
            </div>
            <p className="md:text-center mt-3 md:mt-1 text-left px-2  text-gray-700 italic text-sm font-normal capitalize " > {desc} </p>
        </div>
    )
}

export default HeadLine
