import ProductListings from "@/components/ProductListings"
import Filters from "@/components/Filters"
import HeroBanner from "@/components/HeroBanner"
import Spinner from "@/components/Spinner";
import { Suspense } from "react";


export const metadata = {
    title: "Store"
}


const StorePage = async ({searchParams}) => {
    return (
        <div>
            <HeroBanner />
            <div className="mx-auto container">
                <Filters />
            </div>
            <div className=" mt-8 container mx-auto">
                <Suspense fallback={<Spinner />}  >
                    <ProductListings searchParams={searchParams} categoryId={process.env.ALLPRODUCTS_CATEGORY_ID} needPagination={true} />
                </Suspense>
            </div>
        </div>
    )
}

export default StorePage
