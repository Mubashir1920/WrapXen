import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { media as wixMedia } from '@wix/sdk';
import { useWixClient } from '@/hooks/useWixClient';
import { useCartStore } from '@/hooks/useCartStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CartItem = ({ item }) => {


    const [variant, setVariant] = useState({});
    const wixClient = useWixClient();
    const { removeItem, updateQuantity } = useCartStore();
    const [quantity, setQuantity] = useState(item.quantity);

    const maxStock = item.availability.quantityAvailable; // Assuming item has stockNumber



    const handleIncrease = () => {
        if (quantity < maxStock) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        } else {
            removeItem(wixClient, item._id);
        }
    };

    // Update cart with new quantity (debounced)
    useEffect(() => {
        const updateCartQuantity = async () => {
            if (quantity !== item.quantity) {
                await updateQuantity(wixClient, item, quantity);
            }
        };

        const timeout = setTimeout(updateCartQuantity, 500); // 500ms debounce
        return () => clearTimeout(timeout); // Clear timeout if quantity changes before the delay
    }, [quantity, wixClient, item, updateQuantity]);

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
        <div className="flex items-center border-b pb-4 mb-4">
            <div className='pr-2'>
                <Image
                    src={wixMedia.getScaledToFitImageUrl(item.image, 72, 96, {})}
                    alt="Mobile Skin Wrap"
                    className="object-cover mr-4"
                    width='80'
                    height='80'
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
                    <div className="flex items-center space-x-2">
                        {quantity > 1 ? (
                            <span className="text-red-500 text-sm font-semibold">
                                {quantity} * Rs. {parseInt(item.priceBeforeDiscounts.amount)}
                            </span>
                        ) : (
                            <span className="text-red-500 text-sm font-semibold">Rs. {parseInt(item.price.amount)} /-</span>
                        )}
                    </div>
                    <div className='items-center py-2 w-full flex justify-between'>
                        {/* Quantity and Delete Icons */}
                        <div className="flex items-center">
                            <div className="flex items-center border text-sm border-gray-400 px-4 rounded-full justify-between py-2 w-full">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={handleDecrease}
                                        className="text-gray-600 hover:text-black transition"
                                    >
                                        {quantity > 1 ? <FaMinus /> : <FaTrashAlt />}
                                    </button>
                                    <span className="text-gray-600">Qty: {quantity}</span>
                                    <button
                                        onClick={handleIncrease}
                                        disabled={quantity >= maxStock}
                                        className={`text-gray-600 hover:text-black transition ${quantity >= maxStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => removeItem(wixClient, item._id)} className="text-gray-600 hover:text-black transition">
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
