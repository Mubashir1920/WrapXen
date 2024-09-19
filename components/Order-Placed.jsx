import Link from "next/link"
import { GoArrowLeft } from "react-icons/go";

const OrderPlaced = () => {

    return (
        <section className="py-24 relative container mx-auto">
            <div className="w-full flex flex-col justify-center items-center text-center max-w-7xl px-4 md:px-5 lg-6 mx-auto">

                <h2 className=" font-bold border border-black border-dashed p-7 text-lg   text-black mb-11">
                    We have Recieved Your Order
                </h2>

                <p className="font-normal text-lg leading-8 text-gray-500 ">Your order has been Placed it will be shipped to you in 5 Working Days After Confirmation</p>
                <div className="data ">
                    <p className="font-normal text-lg leading-8 text-gray-500 mb-11">We'll be sending a shipping
                        confirmation email when the items shipped successfully.</p>
                    <h6 className=" font-semibold text-lg leading-9 text-black mb-3">Thank you for shopping
                        with us!</h6>
                </div>
                <Link className="my-3" href='/store' ><GoArrowLeft className="inline-block text-black" size={22} />Continue Shopping</Link>
            </div>
        </section>

    )
}

export default OrderPlaced
