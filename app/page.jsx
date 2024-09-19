

import ProductListings from "@/components/ProductListings";
import Carousel from "@/components/Carousel";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
import Button from "@/components/Button";
import HeadLine from "@/components/HeadLine";
import HomepageStyleCards from "@/components/HomepageStyleCards";

const Home = async () => {




  return (
    <div className="mx-auto font-extrabold text-2xl " >
      <Carousel />
      <HeadLine text={'Our Best Sellers'} desc={' laptop skins that offer a perfect mix of style and protection for your device.'} />
      <Suspense fallback={<Spinner />} >
        <ProductListings limit={4} categoryId={process.env.BESTSELLERS_PRODUCTS_CATEGORY_ID} />
      </Suspense>
      <Button link='/store' text='View More' />
      <HomepageStyleCards />
      <HeadLine text={'Featured Mobile Skins'} desc={' Skins that offer a perfect mix of style and protection for your device.'} />
      <Suspense fallback={<Spinner />} >
        <ProductListings limit={4} categoryId={process.env.MOBILESKINS_CATEGORY_ID} />
      </Suspense>
      <Button link='/store?type=mobileSkins' text='View More' />
    </div>
  );
}


export default Home