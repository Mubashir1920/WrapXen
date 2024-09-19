'use client'
import OrderItem from "./OrderItem";


const OrderCard = ({ order, index }) => {
    return (
        <div className="flex max-lg:flex-col transition-colors bg-gray-50 hover:bg-gray-100 rounded-xl items-center gap-8 py-5 lg:gap-24 px-3 md:px-11 mb-5">
            <h1 className="text-sm font-bold uppercase" >Order #  {order.billingAddress.userId.slice(0, 7) + index} </h1>
            <div className="grid grid-cols-1  w-full">

                {order.order.map((item, index) => (
                    <OrderItem key={index} item={item} />

                ))}
            </div>
            <div className="flex items-center  text-sm justify-around w-full  sm:pl-28 lg:pl-0">
                <div>

                </div>
                <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal  text-gray-500  mb-2 text-left ">
                        Status</p>
                    <p className={`font-semibold ${order.billingAddress.status === 'PENDING' ? 'text-orange-500' : 'text-green-400'}  text-left `}>
                        {order.billingAddress.status} </p>
                </div>
                <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal  text-gray-500  mb-2 text-left ">
                        Subtotal</p>
                    <p className="font-semibold   text-red-600 text-left ">
                        Rs {parseInt(order.billingAddress.subtotal)}  </p>
                </div>
                <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal  text-gray-500  mb-2 text-left ">
                        Ordered On</p>
                    <p className="font-semibold   text-black text-left "> {order.billingAddress.date} </p>
                </div>
            </div>

        </div>
    )
}

export default OrderCard
