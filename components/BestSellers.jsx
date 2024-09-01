
import ProductCard from "./ProductCard";
import { WixClientServer } from "@/lib/wixClientServer";

const PRODUCT_PER_PAGE = 20
const BestSellers = async ({ categoryId, limit = PRODUCT_PER_PAGE }) => {

    const wixClient = await WixClientServer()
    const res = await wixClient.products.queryProducts().eq("collectionIds", categoryId).limit(limit).find();


    return (
        <div className="container mx-auto py-16 px-2" >
            <div className="flex gap-2 items-center px-2 md:hidden">
                <span className="w-2 h-5 rounded-sm bg-black" ></span>
                <h2 className="text-lg font-medium text-left text-gray-800 capitalize" >Lastest</h2>
            </div>
            <div className="flex justify-center items-center">
                <hr className="hidden md:block w-[35%] bg-black h-0.5" />
                <h2 className="text-center  md:text-3xl text-2xl font-bold md:font-medium  text-gray-800  capitalize mx-2" >Our Best Sellers</h2>
                <hr className="hidden md:block w-[35%] bg-black h-0.5" />
            </div>
            <p className="text-center   px-2  text-gray-700 italic text-sm font-normal capitalize " > laptop skins that offer a perfect mix of style and protection for your device.</p>
            <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-4  py-12">
                {res.items.map(product => (
                    <ProductCard product={product} key={product._id} />
                ))}
            </div>

        </div>
    )
}

export default BestSellers
