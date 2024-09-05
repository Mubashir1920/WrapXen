

import ProductListings from "@/components/ProductListings";
import Carousel from "@/components/Carousel";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

const Home = async () => {




  return (
    <div className="mx-auto font-extrabold text-2xl text-center" >
      <Carousel />
      <Suspense fallback={<Spinner />} >
        <ProductListings limit={5} categoryId={process.env.BESTSELLERS_PRODUCTS_CATEGORY_ID} />
      </Suspense>
    </div>
  );
}


export default Home