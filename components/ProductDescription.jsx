'use client'
import { useState } from "react"


const ProductDescription = ({ productType, description }) => {


    const tabs = ['Description', 'Additional Information']
    const [selectedTab, setSelectedTab] = useState(tabs[0])


    return (
        <div className="px-10 mt-10 py-8 rounded-lg bg-gray-100">
            {/* <!-- Tabs --> */}
            <ul className="flex border-b">
                {tabs.map((tab, index) => (

                    <li key={index} className="mr-1">
                        <span onClick={() => setSelectedTab(tab)} className={`inline-block cursor-default py-2 px-4 ${tab === selectedTab ? 'text-black font-semibold border-b-2 border-black' : 'text-gray-500 font-normal'}    hover:text-black text-[15px] mb-8 hover:border-b-2 hover:border-gray-800 `}>{tab}</span>
                    </li>
                ))}
            </ul>
            {/* <!-- Tab Content --> */}
            <div className="mt-4">
                {selectedTab === 'Description' &&
                    <div>
                        <div
                            className="mt-6 text-[15px] text-gray-500"
                            dangerouslySetInnerHTML={{ __html: description }}
                        ></div>
                        {productType === 'Laptop' &&
                            (
                                <table className="min-w-full border  mt-5">
                                    <tbody className="bg-gray-200">
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
                            )
                        }
                    </div>
                }
                {selectedTab === 'Additional Information' &&
                    <div>
                        <p className="text-gray-500 text-[15px] mb-8 ">
                            At Wrapxen, we're all about helping you make a statement with your devices. Our laptop and mobile skins are designed to not only protect your gadgets but also reflect your unique personality. With a vast range of designs, materials, and finishes to choose from, you're spoiled for choice when it comes to giving your device a fresh new look. Whether you're a fan of bold graphics, subtle textures, or sleek metallic finishes, we've got you covered.
                        </p>

                        <p className="text-gray-500 text-[15px] mb-8 ">
                            Our laptop skins, in particular, are a game-changer for anyone who wants to add some personality to their laptop. Made from high-quality vinyl, these skins are incredibly durable and can withstand the rigors of daily use. They're also surprisingly easy to apply, with a simple peel-and-stick process that won't leave any residue or bubbles. Plus, they're removable, so you can switch up your design whenever you feel like it. With sizes available for all major laptop brands, from Apple to Dell to HP, you can trust that our skins will fit your device like a glove.
                        </p>

                        <p className="text-gray-500 text-[15px] mb-8 ">
                            But it's not just laptops that get all the fun. Our mobile skins are designed to give your phone a fresh new look that's both stylish and protective. With precision-cut designs that fit snugly around your phone's curves, these skins provide excellent protection against scratches and drops. Plus, they're made from a special scratch-resistant material that helps keep your phone looking like new for longer. And with a range of designs that cater to different tastes and styles, you're sure to find a skin that matches your unique vibe.
                        </p>

                        <p className="text-gray-500 text-[15px] mb-8 ">
                            One of the things that sets our skins apart is the attention to detail we bring to every design. From the intricate patterns to the bold graphics, every element is carefully crafted to ensure that your device looks and feels amazing. We work with a team of talented designers who are passionate about creating unique and eye-catching designs that will make your device stand out from the crowd. Whether you're into minimalist chic or bold statements, we've got a design that's sure to resonate with you.
                        </p>

                        <p className="text-gray-500 text-[15px] mb-8 ">
                            Of course, it's not just about looks – our skins are also built to last. Made from high-quality materials that are designed to withstand the rigors of daily use, these skins are incredibly durable and can withstand scratches, drops, and even the occasional coffee spill. And with a special coating that helps repel fingerprints and smudges, your device will stay looking clean and fresh for longer.
                        </p>

                        <p className="text-gray-500 text-[15px] mb-8 ">
                            At Wrapxen, we're committed to providing our customers with the best possible shopping experience. That's why we offer a range of convenient shipping options, including fast and free shipping on all orders over a certain amount. We also have a dedicated customer service team that's always happy to help with any questions or concerns you may have. And with a 30-day money-back guarantee, you can shop with confidence knowing that you're protected in case anything goes wrong.
                        </p>

                        <p className="text-gray-500 text-[15px] mb-8 ">
                            But don't just take our word for it – our customers rave about our skins, with many reporting that they've received countless compliments on their device's new look. Whether you're looking to give your device a fresh new look, protect it from scratches and drops, or simply express your unique personality, our laptop and mobile skins are the perfect solution.
                        </p>

                        <p className="text-gray-500 text-[15px] mb-8 ">
                            So why settle for a boring, plain device when you can make it truly one-of-a-kind with a Wrapxen skin? Browse our collection today and discover the perfect way to give your device a fresh new look that's all about you. With new designs being added all the time, you're sure to find the perfect skin to match your unique style and personality.
                        </p>

                    </div>
                }
            </div>
        </div>
    )
}

export default ProductDescription
