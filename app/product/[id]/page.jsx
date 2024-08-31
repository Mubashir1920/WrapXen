import { WixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaFacebook, FaHeart, FaStar } from "react-icons/fa";
import { CiZoomIn } from "react-icons/ci";



const page = async ({ params }) => {

  const wixClient = await WixClientServer()
  const products = await wixClient.products.queryProducts().eq("slug", params.id).find();

  if (!products.items[0]) {
    return notFound()
  }

  const product = products.items[0]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <!-- Product Images Section --> */}
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          {/* <!-- Main Image --> */}
          <div className="relative">
            <Image
              src={product.media?.mainMedia?.image?.url}
              alt={product.slug}
              className="w-full rounded-lg shadow-md"
              height={0}
              width={0}
              priority='true'
              sizes="100%"
            />
            {/* <!-- Zoom Icon --> */}
            <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow">
              <CiZoomIn />
            </div>
          </div>

          {/* <!-- Thumbnail Images --> */}
          <div className="flex mt-4 space-x-2">
            {product.media?.items && product.media?.items.map((item, index) => (
              <Image
                key={index}
                height={0}
                width={0}
                priority='true'
                sizes="100%"
                src={item.image?.url}
                alt={product.slug}
                className="w-16 h-16 rounded-lg shadow-md cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* <!-- Product Details Section --> */}
        <div className=" w-full md:w-1/2 pl-8">
          {/* <!-- Title --> */}
          <h1 className="text-2xl font-semibold text-gray-800"> {product.name} </h1>

          {/* <!-- Price Section --> */}
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-xl font-semibold text-red-600">Rs. 299.00</span>
            <span className="text-sm line-through text-gray-500">Rs. 499.00</span>
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

          {/* <!-- Size Selection --> */}
          <div className="mt-4">
            <span className="text-gray-700 font-semibold">SIZE: 14"</span>
            <div className="flex space-x-2 mt-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">15"-15.6"</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-gray-200">14"</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">13"-13.3"</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">17"-17.3"</button>
            </div>
          </div>

          {/* <!-- Skin Coverage Selection --> */}
          <div className="mt-4">
            <span className="text-gray-700 font-semibold">SKIN COVERAGE: CHOOSE AN OPTION</span>
            <div className="flex space-x-2 mt-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">Top Skin Only</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-gray-200">Full Panel</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">Full Body</button>
            </div>
          </div>

          {/* <!-- Quantity and Cart --> */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-1">
              <button className="text-gray-600">-</button>
              <span className="text-gray-800">1</span>
              <button className="text-gray-600">+</button>
            </div>
            <button className="flex-1 bg-black hover:bg-transparent hover:border hover:border-black hover:text-black text-white text-sm py-2 rounded-lg transition-all">
              ADD TO CART
            </button>
            <FaHeart />
          </div>

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
        </div>
      </div>

      <div class="w-full mx-auto mt-10 p-6 rounded-lg bg-gray-100">
        {/* <!-- Tabs --> */}
        <ul class="flex border-b">
          <li class="mr-1">
            <a href="#" class="inline-block py-2 px-4 text-gray-500 hover:text-gray-700">Description</a>
          </li>
          <li class="-mb-px mr-1">
            <a href="#" class="inline-block py-2 px-4 text-black font-semibold border-b-2 border-black">Additional Information</a>
          </li>
          <li class="mr-1">
            <a href="#" class="inline-block py-2 px-4 text-gray-500 hover:text-gray-700">Reviews</a>
          </li>
        </ul>
        {/* <!-- Tab Content --> */}
        <div class="mt-4">
          <table class="min-w-full border border-gray-200">
            <tbody class="bg-white">
              <tr>
                <td class="px-6 py-4 border border-gray-200 font-medium text-gray-500">Size</td>
                <td class="px-6 py-4 border border-gray-200 text-gray-700">15"-15.6", 14", 13"-13.3", 17"-17.3"</td>
              </tr>
              <tr>
                <td class="px-6 py-4 border border-gray-200 font-medium text-gray-500">Skin Coverage</td>
                <td class="px-6 py-4 border border-gray-200 text-gray-700">Top Skin Only, Full Panel, Full Body</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default page
