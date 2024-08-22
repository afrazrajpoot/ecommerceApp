"use client";
import React, { useEffect, useState } from "react";
import { cardData, articleInfo, articleInfo2, articleInfo3 } from "@/data/data";
import Footer from "@/app/components/Common/Footer/Footer";
import { useGlobalContext } from "@/context/globalState";
import Link from "next/link";
import { toast } from "sonner";
import Slider from "react-slick";
import { extractContent } from "@/app/utils/extractContent";

const Page = ({ params: { slug } }) => {
  // console.log(slug, "my slug");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const { fetchWooCommerceData } = useGlobalContext();
  const fetchProducts = async () => {
    try {
      const data = await fetchWooCommerceData(`wc/v3/products?slug=${slug}`);
      const product = data?.data[0];

      setProductDetails(product);
      fetchRelatedProducts(product?.related_ids);
    } catch (error) {
      toast.error("Network error please try again later", {
        position: "top-right",
      });
    }
  };

  const fetchRelatedProducts = async (relatedIds) => {
    try {
      const relatedProductsData = await Promise.all(
        relatedIds.map((id) => fetchWooCommerceData(`wc/v3/products/${id}`))
      );
      setRelatedProducts(relatedProductsData);
    } catch (error) {
      toast.error("Network error please try again later", {
        position: "top-right",
      });
    }
  };
  // const desc = extractContent(productDetails?.description);
  const extractedContent = extractContent(productDetails?.description || "");

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(extractedContent?.lists[0], "my desc");
  return (
    <main className="flex flex-col w-full lg:pb-[10vw] overflow-y-hidden pb-[30vw] overflow-x-hidden">
      <section className="lg:translate-y-[6vw]  sm:translate-y-[8vw] translate-y-[20vw] w-full  max-w-[95vw] lg:max-w-[80vw] flex flex-col gap-[1.2vw] p-[2vw] m-auto ">
        <button className="border-[1px] flex  items-center border-[#E5E5E5] rounded-md text-[#525252] p-[0.5vw] w-full lg:max-w-[5vw] max-w-[20vw] sm:max-w-[10vw] justify-center">
          <figure className="w-full lg:max-w-[1.5vw] max-w-[5vw] sm:max-w-[3vw]">
            <img src={`/img/backIcon.png`} alt="" className="w-full" />
          </figure>
          <p>back</p>
        </button>
        <img
          src={productDetails ? productDetails?.images?.[0].src : ""}
          alt="home"
          className="hidden lg:block w-[70vw] sm:block"
        />
        <img
          src={productDetails ? productDetails?.images?.[0].src : ""}
          alt="home"
          className="block lg:hidden sm:hidden mt-[3vw]"
        />
        <p className="text-[#525252] font-bold text-[2.5vw] sm:text-[2vw] lg:text-[0.8vw]">
          {new Date(productDetails?.date_created).toLocaleDateString()}
        </p>
        <h1 className="lg:text-[2vw] text-[6.5vw] font-bold w-full lg:max-w-[35vw] sm:text-[3vw]">
          {productDetails?.name}
        </h1>
        <p className="font-bold lg:text-[1vw] text-[3.5vw] sm:text-[2.5vw]">
          {slug} is a way to protect yourself financially from unforeseen templates. It can help you
          pay for medical expenses, repair your car after an accident, or replace your home if it's
          destroyed by a fire. But with so many different types of Motion Graphic available, it can
          be tough to know where to start. Here are some tips on how to choose the right Motion
          Graphic for you:
        </p>

        <div className="flex flex-col gap-[0.2vw]">
          {extractedContent?.lists[0]?.map((elem, ind) => (
            <ul key={ind} className={``}>
              <li
                className={`text-[#171717] text-[3.5vw]   lg:text-[0.9vw] ml-[2vw] lg:ml-[0vw] sm:text-[2vw]`}
                style={{ listStyleType: "number" }}
              >
                {elem}
              </li>
            </ul>
          ))}
          {/* <ul>
            <li>{productDetails.description}</li>
          </ul> */}
        </div>
        <h2 className="font-bold text-[4vw]  w-[90vw] lg:text-[1.5vw] sm:text-[3vw]">
          Here are some additional tips for choosing the right {slug}:
        </h2>
        <div className="flex flex-col gap-[0.2vw]">
          {extractedContent?.lists[1]?.map((elem, ind) => (
            <ul key={ind} className="list-disc pl-5 flex flex-col gap-[0.2vw]">
              <li className="text-[#171717] text-[3.5vw] lg:text-[0.9vw] sm:text-[2vw]">{elem}</li>
            </ul>
          ))}
        </div>
        <h2 className="font-bold text-[4vw]  w-[90vw] lg:text-[1.5vw] sm:text-[3vw]">
          Here are some additional tips for choosing the right {slug}:
        </h2>
        <div className="flex flex-col gap-[0.2vw]">
          {articleInfo3?.map((elem, ind) => (
            <ul key={ind} className="list-disc pl-5 flex flex-col gap-[0.2vw]">
              <li className="text-[#171717]  text-[3.5vw] lg:text-[0.9vw] sm:text-[2vw]">
                {elem.desc}
              </li>
            </ul>
          ))}
        </div>
        <p className="lg:text-[0.9vw] text-[3.5vw] sm:text-[2vw]">
          These are just a few of the many different types of Motion Graphic available. The right
          type of Motion Graphic for you will depend on your individual needs and circumstances. By
          following the tips above, you can choose the right Motion Graphic for you and your family.
        </p>
        <h1 className="lg:text-[2vw] text-[4vw] font-bold w-full max-w-[35vw] mt-[5vw] sm:text-[3vw]">
          Related Products
        </h1>
        <section className="flex lg:gap-[5vw] sm:grid sm:grid-cols-2 lg:flex  lg:flex-row flex-col gap-[4vw]">
          {relatedProducts?.map((elem, ind) => (
            <Link href={`/detailarticles/${elem?.data?.slug}`}>
              <main key={ind} className="mt-[5vw] lg:mt-[1vw]">
                <figure className="w-full lg:mx-w-[10vw] max-w-[80vw] ml-[5vw] lg:ml-[0vw]">
                  <img src={elem?.data?.images?.[0].src} alt={elem.title} />
                </figure>
                <p className="text-[#171717] text-center  lg:block lg:text-[0.8vw] font-bold mt-[1vw] w-full lg:max-w-[15vw]">
                  {" "}
                  {elem?.data?.name}
                </p>
                {/* <div className=" block lg:hiddenflex flex-col gap-[3vw]">
                  <p className="mt-[2vw] font-bold text-[4.5vw] lg:hidden sm:text-[2vw]">
                    {" "}
                    1500+ Transitions Premiere Pro{" "}
                  </p>
                  <div className="flex gap-[1vw] lg:hidden">
                    <p className="text-[#FF689A] lg:hidden">$48</p>
                    <p>$80</p>
                  </div>
                </div> */}
                <p className=" font-medium hidden lg:block text-[0.8vw] text-[#525252] mt-[0.5vw] ">
                  {elem.date}
                </p>
              </main>
            </Link>
          ))}
        </section>
      </section>
      <footer className="translate-y-[35vw] sm:translate-y-[30vw] lg:translate-y-[10vw]">
        <Footer />
      </footer>
    </main>
  );
};

export default Page;
