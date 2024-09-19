'use client'
import { useWixClient } from '@/hooks/useWixClient';
import { media as wixMedia } from '@wix/sdk';
import Image from 'next/image';
import { useEffect, useState } from 'react';



const OrderItem = ({ item }) => {

    const wixClient = useWixClient();
    const [variant, setVariant] = useState({});

    useEffect(() => {
        const getVariant = async () => {
            try {
                const res = await wixClient.products.queryProductVariants(item.catalogReference.catalogItemId, item.catalogReference.options.variantId);
                const isVariant = res.variants.find(variant => variant._id === item.catalogReference.options.variantId);
                if (isVariant) {
                    setVariant({ Size: isVariant.choices.Size, SkinCoverage: isVariant.choices.SkinCoverage });
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (item.catalogReference.options.variantId !== "00000000-0000-0000-0000-000000000000") {
            getVariant();
        }
    }, [item.catalogReference.options.variantId, wixClient]);


    return (
        <div className="flex w-full  items-center border-b pb-4 mb-4">
            <div className='pr-2 '>
                <Image
                    src={wixMedia.getScaledToFitImageUrl(item.image, 72, 96, {})}
                    alt="Mobile Skin Wrap"
                    className="rounded-xl object-cover mr-4"
                    width='90'
                    height='90'
                />
            </div>
            <div className="flex flex-col justify-between flex-grow">
                <div>
                    <h4 className="font-bold text-sm">
                        {item.productName.original}
                    </h4>
                    {item.catalogReference.options.variantId !== "00000000-0000-0000-0000-000000000000" &&
                        <>
                            <p className="text-sm text-gray-600">Size : {variant?.Size} </p>
                            <p className="text-sm text-gray-600">Skin: {variant?.SkinCoverage} </p>
                        </>
                    }
                    <span className="text-gray-600 text-sm mr-2">Qty: {item.quantity}</span>
                    <span className="text-red-500 text-sm font-semibold">Rs. {item.price.amount}</span>

                </div>
            </div>
        </div>
    );
};

export default OrderItem;
