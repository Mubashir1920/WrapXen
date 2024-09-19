
import { useCartStore } from "@/hooks/useCartStore"
import { useEffect } from "react"

const CartItemCount = ({ setShowCart }) => {

    const { counter } = useCartStore()
    // useEffect(() => {



    // }, [counter])

    return (
        <div className={`${counter > 0 ? 'block' : 'hidden'} cursor-pointer`} onClick={() => setShowCart(true)} >
            <span
                className=" absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-blue-300  rounded-full"
            >
                {counter > 0 ? counter : ''}

            </span>
        </div>
    )
}

export default CartItemCount
