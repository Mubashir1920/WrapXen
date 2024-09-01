

const ProductDescription = () => {
    return (
        <div className="w-full mx-auto mt-10 p-6 rounded-lg bg-gray-100">
            {/* <!-- Tabs --> */}
            <ul className="flex border-b">
                <li className="mr-1">
                    <a href="#" className="inline-block py-2 px-4 text-gray-500 hover:text-gray-700">Description</a>
                </li>
                <li className="-mb-px mr-1">
                    <a href="#" className="inline-block py-2 px-4 text-black font-semibold border-b-2 border-black">Additional Information</a>
                </li>
                <li className="mr-1">
                    <a href="#" className="inline-block py-2 px-4 text-gray-500 hover:text-gray-700">Reviews</a>
                </li>
            </ul>
            {/* <!-- Tab Content --> */}
            <div className="mt-4">
                <table className="min-w-full border border-gray-200">
                    <tbody className="bg-white">
                        <tr>
                            <td className="px-6 py-4 border border-gray-200 font-medium text-gray-500">Size</td>
                            <td className="px-6 py-4 border border-gray-200 text-gray-700">15"-15.6", 14", 13"-13.3", 17"-17.3"</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 border border-gray-200 font-medium text-gray-500">Skin Coverage</td>
                            <td className="px-6 py-4 border border-gray-200 text-gray-700">Top Skin Only, Full Panel, Full Body</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductDescription
