import { WixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { FaFacebook, FaStar } from "react-icons/fa";
import ProductImages from "@/components/ProductImages";
import ProductDescription from "@/components/ProductDescription";
import ProductOptions from "@/components/ProductOptions";
import AddToCart from "@/components/AddtoCart";
import Link from "next/link";
import { toast } from "react-toastify";
import ProductListings from "@/components/ProductListings";

export async function generateMetadata({ params }) {
  try {
    const wixClient = await WixClientServer();
    const products = await wixClient.products.queryProducts().eq("slug", params.id).find();

    if (products.items && products.items.length > 0) {
      const product = products.items[0];
      return {
        title: `${product.name}`,
      };
    } else {
      // Fallback title if product not found
      return {
        title: "Product Not Found",
      };
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
    };
  }
}


const page = async ({ params }) => {

  let product



  try {
    const wixClient = await WixClientServer()
    const products = await wixClient.products.queryProducts().eq("slug", params.id).find();

    if (!products.items[0]) {
      return notFound()
    }

    product = products.items[0]
  } catch (error) {
    console.log(error);
    toast.error('Unable to Load Try Again')
  }

  const type = product.name.split(' ')[0]

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center py-8 w-full  items-start">
          <p className="text-gray-600 italic text-md" >  <Link className="hover:text-gray-800 font-normal" href='/store'>Store</Link> {' > '} {product.name}  </p>
        </div>
        {/* <!-- Product Images Section --> */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
            <ProductImages items={product.media?.items} />
          </div>

          {/* <!-- Product Details Section --> */}
          <div className=" w-full md:w-1/2 px-2 md:pl-8">

            {product.variants && product.productOptions ? (

              <ProductOptions
                product={product}
                variants={product.variants}
                ProductOptions={product.productOptions}
              />
            ) : (
              <div>
                {/* <!-- Title --> */}
                <h1 className="text-2xl font-semibold tracking-tight text-gray-800"> {product.name} </h1>

                {/* <!-- Price Section --> */}
                <div className="flex items-center space-x-2 mt-4">
                  {product.priceData.discountedPrice !== product.priceData.price ? (<div>
                    <span className="text-xl tracking-tighter font-bold text-gray-900">Rs {product.priceData.discountedPrice.toFixed()} </span>
                    <span className="text-sm line-through text-gray-500"> {product.priceData.price} </span>
                  </div>
                  ) : (
                    <span className="text-xl tracking-tighter font-bold text-gray-900 ">
                      Rs {product.priceData.price}/-
                    </span>
                  )}
                </div>

                <AddToCart
                  productId={product._id}
                  variantsId="00000-0000000-000000"
                  stockNumber={product.stock?.quantity || 0}
                />
              </div>
            )}


            {/* <!-- Social Icons --> */}
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-600">
                <FaFacebook size={19} className="text-blue-500" />
              </a>
              {/* <!-- Repeat for other social icons --> */}
            </div>

            {/* <!-- Vendor Information --> */}
            <div className="mt-6 text-sm text-gray-600">
              <p><strong>Vendor:</strong> WrapXen</p>
              <p><strong>Type:</strong> {type} Skin</p>
              <p><strong>Availability:</strong> {product.stock.inventoryStatus === 'IN_STOCK' ? 'In Stock' : 'Out Of Stock'} </p>
            </div>


            {/* Product Description */}
            <div
              className="mt-6 text-sm text-gray-500"
              dangerouslySetInnerHTML={{ __html: product.description.slice(0, 170) }}
            ></div>

          </div>
        </div>

      </div>
      <ProductDescription productType={type} description={product.description} />
      <h1 className="mt-10 px-5 text-lg container mx-auto text-black italic font-bold" >Related Products</h1>
      <h1 className=" text-sm px-5 container mx-auto text-black italic " >Our RockStar Items. Discover more great finds: Explore our handpicked selection of related products!</h1>
      <ProductListings categoryId={process.env.MOSTLIKED_CATEGORY_ID} limit={4} />
    </>
  )
}

export default page
