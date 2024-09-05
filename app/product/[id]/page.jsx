import { WixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { FaFacebook, FaStar } from "react-icons/fa";
import ProductImages from "@/components/ProductImages";
import ProductDescription from "@/components/ProductDescription";
import ProductOptions from "@/components/ProductOptions";
import AddToCart from "@/components/AddtoCart";
import Link from "next/link";



const page = async ({ params }) => {

  const wixClient = await WixClientServer()
  const products = await wixClient.products.queryProducts().eq("slug", params.id).find();

  if (!products.items[0]) {
    return notFound()
  }

  const product = products.items[0]



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col justify-center py-8 w-full  items-start">
        <p className="text-gray-600 italic text-sm" >  <Link className="hover:text-gray-800 font-normal" href='/'>Home</Link> {' > '} {product.name}  </p>
      </div>
      {/* <!-- Product Images Section --> */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages items={product.media?.items} />
        </div>

        {/* <!-- Product Details Section --> */}
        <div className=" w-full md:w-1/2 pl-4 md:pl-8">
          {/* <!-- Title --> */}
          <h1 className="text-2xl font-semibold tracking-tight text-gray-800"> {product.name} </h1>

          {/* <!-- Price Section --> */}
          <div className="flex items-center space-x-2 mt-4">
            {product.priceData.discountedPrice !== product.priceData.price ? (<div>
              <span className="text-xl tracking-tighter font-bold text-gray-900">Rs {product.priceData.discountedPrice.toFixed()} </span>
              <span className="text-sm line-through text-gray-500"> {product.priceData.price} </span>
            </div>) : (

              <span className="text-xl tracking-tighter font-bold text-gray-900 "> Rs {product.priceData.price}/-  </span>
            )}
          </div>


          {/* <!-- Rating --> */}
          <div className="flex items-center mt-2">
            <div className="flex space-x-1 text-yellow-500">
              <FaStar className="text-yellow-400" size={16} />
              <FaStar className="text-yellow-400" size={16} />
              <FaStar className="text-yellow-400" size={16} />
              <FaStar className="text-yellow-400" size={16} />
              <FaStar className="text-yellow-400" size={16} />

            </div>
            <span className="text-sm text-gray-600 ml-2">(1 review)</span>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Standard Size Laptop Skin.Refer to Our Size Guide to select the ideal size and Skin coverage for your Laptop </p>
          </div>
          {product.variants && product.productOptions ? (

            <ProductOptions
              productId={product._id}
              variants={product.variants}
              ProductOptions={product.productOptions}
            />
          ) : (
            <AddToCart productId={product._id} variantsId="00000-0000000-000000" stockNumber={product.stock?.quantity || 0} />
          )}


          {/* <!-- Additional Information --> */}
          <div className="mt-4 text-sm text-gray-500">
            <p>8 people are viewing this right now</p>
          </div>

          {/* <!-- Social Icons --> */}
          <div className="mt-6 flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-600">
              <FaFacebook size={19} className="text-blue-500" />
            </a>
            {/* <!-- Repeat for other social icons --> */}
          </div>

          {/* <!-- Vendor Information --> */}
          <div className="mt-6 text-sm text-gray-600">
            <p><strong>Vendor:</strong> Techfit</p>
            <p><strong>Type:</strong> Laptop Skin</p>
            <p><strong>Availability:</strong> In Stock</p>
          </div>

          {/* <!-- Tags --> */}
          <div className="mt-6 text-sm text-gray-500">
            <p><strong>Tags:</strong> Anime Laptop Skin, Full Body Laptop Skin, Full Panel Laptop Skin, Laptop Skin</p>
          </div>
          {/* Product Description */}
          <div
            className="mt-6 text-sm text-gray-500"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
      </div>

      <ProductDescription />
    </div>

  )
}

export default page
