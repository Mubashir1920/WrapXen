'use client'
import { useEffect, useState } from 'react';
import AddToCart from './AddtoCart';

const ProductOptions = ({ productId, variants, ProductOptions }) => {


    const [selectedOptions, setSelectedOptions] = useState({})
    const [selectedVariant, setSelectedVariant] = useState()

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
        const variant = variants.find(v => {
            const variantChoices = v.choices;
            if (!variantChoices) return false;
            return Object.entries(selectedOptions).every(([key, value]) => variantChoices[key] === value)
        })
        setSelectedVariant(variant)

    }, [selectedOptions, variants])




    return (
        <div className="py-4">
            <div className="mb-4">
                {ProductOptions.map(option => (
                    <div key={option.name} >

                        <h3 className="text-md  tracking-tight font-semibold my-3"> Select  {option.name} {option.name === 'Size' ? (<span className='ml-2  font-light text-gray-500 hover:text-black transition-colors duration-300 text-xs  cursor-pointer underline' >Size Chart</span>) : null}  </h3>
                        
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
            <AddToCart productId={productId} variantsId={selectedVariant?._id || "00000-0000000-000000"} stockNumber={selectedVariant?.stock?.quantity || 0} />

        </div>
    );
};

export default ProductOptions;
