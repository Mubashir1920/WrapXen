
import Link from "next/link"

const Button = ({ link, text }) => {
    return (
        <div className="w-full mx-auto flex justify-center" >

            <Link href={link} className="py-1 px-10 rounded-full text-black border border-black bg-transparent relative font-semibold text-[15px] transition-all duration-500 overflow-hidden hover:border-blue-300 hover:text-white before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:rounded-full before:bg-blue-300 before:border-blue-300 before:z-[-1] before:transition-all before:duration-500 hover:before:w-full hover:bg-transparent before:hover:opacity-100 before:opacity-0">
                {text}
            </Link>
        </div>


    )
}

export default Button
