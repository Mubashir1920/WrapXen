
import ProductCard from "./ProductCard";
import { WixClientServer } from "@/lib/wixClientServer";

const PRODUCT_PER_PAGE = 20
const ProductListings = async ({ categoryId, limit = PRODUCT_PER_PAGE }) => {

    const wixClient = await WixClientServer()
    const res = await wixClient.products.queryProducts().eq("collectionIds", categoryId).limit(limit).find();


    return (
        <div className="container mx-auto  px-2" >
            <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-4  py-12">
                {res.items.map(product => (
                    <ProductCard product={product} key={product._id} />
                ))}
            </div>

        </div>
    )
}

export default ProductListings
