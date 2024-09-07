'use client'
import { usePathname, useSearchParams, useRouter } from "next/navigation";



const Pagination = ({ currentPage, hasPrevious, hasNext }) => {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageUrl = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    }



    return (
        <div className="px-4 flex justify-between w-full" >
            <button
                className="rounded-lg px-8 py-1 disabled:cursor-not-allowed disabled:bg-blue-200  hover:bg-blue-300 bg-blue-400 transition-colors text-sm md:text-[16px] text-white "
                disabled={!hasPrevious}
                onClick={() => createPageUrl(currentPage - 1)}>
                Prev
            </button>
            <button
                className="rounded-lg px-8 py-1  disabled:cursor-not-allowed disabled:bg-blue-200 hover:bg-blue-300 bg-blue-400 transition-colors  text-sm md:text-[16px]  text-white "
                disabled={!hasNext}
                onClick={() => createPageUrl(currentPage + 1)} >
                Next
            </button>
        </div>
    )
}

export default Pagination
