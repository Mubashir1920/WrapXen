
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { WixClientServer } from "@/lib/wixClientServer";
import { RiErrorWarningFill } from "react-icons/ri";

const PRODUCT_PER_PAGE = 12
const ProductListings = async ({ categoryId, limit = PRODUCT_PER_PAGE, searchParams, needPagination }) => {

    if (searchParams) {
        if (searchParams.type === 'laptopSkins') {
            categoryId = process.env.LAPTOPSKINS_CATEGORY_ID
        } else if (searchParams.type === 'mobileSkins') {
            categoryId = process.env.MOBILESKINS_CATEGORY_ID
        }
    }
    let productQuery;
    const wixClient = await WixClientServer()
    productQuery = wixClient.products
        .queryProducts()
        .eq("collectionIds", categoryId)
        .gt('priceData.price', searchParams?.min || 0)
        .lt('priceData.price', searchParams?.max || 999999)
        .descending('lastUpdated')
        .limit(limit)
        .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE) : 0)


    let res;
    try {
        res = await productQuery.find()
    } catch (error) {
        console.log(error);
    }

    // if (searchParams?.sort) {
    //     const [sortType, sortBy] = searchParams.sort.split(" ")

    //     if (sortType === "asc") {
    //         productQuery.ascending(sortBy)
    //     }
    //     if (sortType === "desc") {
    //         productQuery.descending(sortBy)
    //     }
    // }




    return (
        <div className="container mx-auto  px-2" >
            <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 md:gap-4  py-12">
                {res ? res.items.map(product => (
                    <ProductCard product={product} key={product._id} />
                )) : (
                    <div className="flex  flex-col items-center" >
                        <h1 className="text-sm font-normal  text-gray-600"><RiErrorWarningFill className="mr-2 inline-block" />Failed to Fetch</h1>
                    </div>
                )}
            </div>
            {needPagination &&
                <Pagination
                    currentPage={res.currentPage || 0}
                    hasPrevious={res.hasPrev()}
                    hasNext={res.hasNext()}
                />
            }
        </div>
    )
}

export default ProductListings
