'use client'
import { useEffect, useState } from 'react';
import AddToCart from './AddtoCart';
import { FaStar } from "react-icons/fa";
import SizeChart from './SizeChart';

const ProductOptions = ({ product, variants, ProductOptions }) => {



    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({})
    const [selectedVariant, setSelectedVariant] = useState('')

    const handleOptionSelect = (optionType, choice) => {
        setSelectedOptions((prevOptions) => ({ ...prevOptions, [optionType]: choice }))
    }

    const isVariantInStock = (choices) => {
        return variants.some((variant => {
            const variantChoices = variant.choices
            if (!variantChoices) return false;
            return Object.entries(choices).every(
                ([key, value]) => variantChoices[key] === value
            ) && variant.stock?.inStock && variant.stock?.quantity > 0
        }))

    }
    useEffect(() => {
        if (ProductOptions?.length > 0) {
            const defaultSelectedOptions = {};
            ProductOptions.forEach(option => {
                defaultSelectedOptions[option.name] = option.choices[0].description;
            });
            setSelectedOptions(defaultSelectedOptions);
        }
    }, [ProductOptions]);

    useEffect(() => {
        const variant = variants.find(v => {
            const variantChoices = v.choices;
            if (!variantChoices) return false;
            return Object.entries(selectedOptions).every(([key, value]) => variantChoices[key] === value)
        })
        setSelectedVariant(variant)

    }, [selectedOptions, variants])

    return (
        <div className="py-4">
            {/* <!-- Title --> */}
            <h1 className="text-2xl font-semibold tracking-tight text-gray-800"> {product.name} </h1>

            {/* <!-- Price Section --> */}
            <div>
                {product.priceRange.minValue !== product.priceRange.maxValue ? (
                    <div className='text-md text-gray-800  mt-4' >
                        Rs {product.priceRange.minValue} - Rs {product.priceRange.maxValue}
                    </div>

                ) : ''}
            </div>
            <div className="flex items-center space-x-2 mt-1">
                {selectedVariant && (selectedVariant.variant.priceData.discountedPrice && selectedVariant.variant.priceData.price) && (selectedVariant.variant.priceData.discountedPrice !== selectedVariant.variant.priceData.price) ? (<div>
                    <span className="text-md line-through text-gray-500 ">Rs {selectedVariant.variant.priceData.price} </span>
                    <span className="text-xl tracking-tighter  font-bold text-red-600">Rs {selectedVariant.variant.priceData.discountedPrice.toFixed()} /- </span>
                    <div className="mt-4 text-sm text-gray-500">
                        <p>Standard Size Skin.Refer to Our Size Guide</p>
                    </div>
                </div>
                ) : (
                    <span className="text-xl tracking-tighter font-bold text-gray-900 ">
                        {product.priceRange.minValue !== product.priceRange.maxValue ? (
                            <div>
                                Rs {product.priceRange.minValue} - Rs {product.priceRange.maxValue}
                            </div>

                        ) : (
                            <div>
                                Rs {product.priceData.price} /-
                            </div>
                        )}
                    </span>
                )}
            </div>


            
            <div className="mb-4">
                {ProductOptions.map(option => (
                    <div key={option.name} >

                        <h3 className="text-md  tracking-tight font-semibold my-3"> Select :  {option.name} {option.name === 'Size' ? (<div className='inline-block' > <SizeChart isOpen={isOpen} setIsOpen={setIsOpen} /></div>) : null}  </h3>

                        <div className="flex space-x-2">
                            {option.choices.map((choice) => {

                                const disabled = !isVariantInStock({ ...selectedOptions, [option.name]: choice.description })
                                const selected = selectedOptions[option.name] === choice.description

                                return (
                                    <button key={choice.value}
                                        disabled={disabled}
                                        onClick={() => handleOptionSelect(option.name, choice.description)}
                                        style={{
                                            cursor: disabled ? 'not-allowed' : 'pointer',
                                            opacity: disabled ? 0.3 : 1
                                        }}
                                        className={` ${selected ? 'bg-black text-white' : 'bg-white'} px-4 py-1.5 rounded-xl duration-300 transition-colors text-sm border text-white'  hover:bg-black hover:text-white text-black border-gray-300`}>
                                        {choice.description}
                                    </button>
                                )
                            })}

                        </div>
                    </div>

                ))}
            </div>
            <AddToCart
                productId={product._id}
                variantId={selectedVariant._id || "00000-0000000-000000"}
                stockNumber={selectedVariant?.stock?.quantity || 0}
            />

        </div>
    );
};

export default ProductOptions;
