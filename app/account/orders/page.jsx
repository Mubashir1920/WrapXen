'use client'
import LoadingLogo from "@/components/LoadingLogo";
import OrderCard from "@/components/OrderCard";
import { useLogin } from "@/hooks/useLogin";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Orders = () => {
    const wixClient = useWixClient();
    const router = useRouter();
    const { getUser, isLoggedIn } = useLogin();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const loggedIn = wixClient.auth.loggedIn()
        const fetchOrders = async () => {

            if (!loggedIn) {
                router.push('/login');
            } else {
                try {
                    const member = await getUser(wixClient);
                    const res = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/orders.json`);
                    if (res.status === 200) {
                        const data = await res.json();
                        const ordersArray = data ? Object.values(data) : [];
                        const filteredOrders = ordersArray.filter(order => order.billingAddress?.userId === member?.member?._id);
                        setOrders(filteredOrders);
                    }
                } catch (error) {
                    console.log(error);
                    setError('Error Fetching Order! Try Again');
                } finally {
                    setLoading(false);  
                }
            }
        };

        fetchOrders();
    }, [isLoggedIn, router, wixClient, getUser]);

    
    if (loading || isLoggedIn === undefined) return <LoadingLogo />;

    return (
        <div className="mt-20 container mx-auto">
            <section className="py-24 relative">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex sm:flex-col  lg:flex-row sm:items-center justify-center">
                        <h1 className=" text-md  cursor-pointer text-black transition-all duration-500 bg-blue-300 rounded-xl font-bold px-6 py-2">All Orders</h1>
                    </div>
                    <div className="my-7 pt-9">
                        {orders.length > 0 ? orders.map((order, index) => (
                            <OrderCard key={index} index={index} order={order} />
                        )) : <p>No orders found.</p>}
                        {error && <p className="text-red-600 text-center text-sm font-normal">{error}</p>}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Orders;
