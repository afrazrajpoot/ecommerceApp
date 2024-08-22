"use client";
import React, { useEffect, useState } from "react";
import { articleInfo3 } from "@/data/data";
import Footer from "@/app/components/Common/Footer/Footer";
import { useGlobalContext } from "@/context/globalState";
import Link from "next/link";
import { toast } from "sonner";
import { extractContent } from "@/app/utils/extractContent";
import Pack from "../../../components/Cards/Pack";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loading from "@/app/components/Common/Loading";

const Page = ({ params: { slug } }) => {
  // console.log(slug, "my slug");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productDetails, setProducts] = useState([]);

  const { fetchWooCommerceData, fetchTutorials } = useGlobalContext();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
      },
      { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  const fetchProducts = async (categorySlug, page = 1) => {
    try {
      let params = { per_page: itemsPerPage, page };

      if (categorySlug) {
        const categoriesResponse = await fetchTutorials("wp/v2/categories", {
          params: { per_page: 100 },
        });
        const categories = await categoriesResponse.data;
        const category = categories?.find((cat) => cat.slug === categorySlug);
        if (category) {
          params = { ...params, category: category.id };
        } else {
          // toast.commentError("Category not found");
          return;
        }
      }

      if (searchQuery) {
        params = { ...params, search: searchQuery };
      }

      const response = await fetchTutorials(`wp/v2/posts?slug=${slug}`, { params });
      const totalProducts = response.totalProducts;
      const data = response.data;
      setTotalPages(Math.ceil(totalProducts / itemsPerPage));
      setProducts(data);
    } catch (error) {
      if (error.message === "socket hung up") {
        window.location.reload();
      } else {
        console.warn(error);
      }
    }
  };
  const fetchRelatedProducts = async (relatedIds) => {
    try {
      const relatedProductsData = await fetchTutorials(`wp/v2/posts?categories=${relatedIds}`);
      setRelatedProducts(relatedProductsData);
    } catch (error) {
      console.warn(error);
    }
  };
  const extractedContent = extractContent(productDetails[0]?.description || "");

  useEffect(() => {
    fetchProducts();
    const loginUser = JSON.parse(localStorage.getItem("user"));
    setAuthor(loginUser);
    fetchRelatedProducts(77);
  }, []);
  // const desc = extractContent(productDetails?.description);

  //   useEffect(() => {
  //     fetchProducts();
  //   }, []);
  // console.log(extractedContent?.lists[0], "my desc");
  return (
    <>
      {productDetails.length === 0 ? (
        <main className="w-full flex items-center justify-center h-[30vw]">
          <Loading />
        </main>
      ) : (
        <main className="flex flex-col w-full lg:pb-[10vw] overflow-y-hidden pb-[30vw] overflow-x-hidden">
          <section className="lg:translate-y-[6vw]  sm:translate-y-[8vw] translate-y-[20vw] w-full  max-w-[95vw] lg:max-w-[80vw] flex flex-col gap-[1.2vw] p-[2vw] m-auto ">
            <Link href={"/latestarticle"}>
              <Button
                href="/latestarticle"
                variant="outlined"
                className="border-[1px] border-[#E5E5E5] sm:text-[1.5vw] rounded-lg p-[0.5vw] lg:text-[1vw] text-[#525252] flex items-center w-fit"
                endIcon={<ArrowForwardIosIcon />}
              >
                Back
              </Button>
            </Link>
            <figure className="lg:w-full mt-[8vw] lg:max-w-[100vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  md:mt-0 gap-[10vw] md:gap-[2vw] items-start">
              <iframe
                className="rounded-[0.8vw] mt-[8vw] ml-[1.5vw] w-full lg:mt-0 lg:w-[70vw] h-[60vw] lg:h-[40vw]"
                src={extractedContent?.iframeSrc}
                alt="store details"
                allowFullScreen
              />
            </figure>
            <p className="text-[#525252] font-bold text-[2.5vw] sm:text-[2vw] lg:text-[0.8vw]">
              {new Date(productDetails[0]?.date_created).toLocaleDateString()}
            </p>
            <h1 className="lg:text-[2vw] text-[6.5vw] font-bold w-full lg:max-w-[35vw] sm:text-[3vw]">
              {productDetails[0]?.name}
            </h1>
            <p className="font-bold lg:text-[1vw] text-[3.5vw] sm:text-[2.5vw]">
              {slug} is a way to protect yourself financially from unforeseen templates. It can help
              you pay for medical expenses, repair your car after an accident, or replace your home
              if it's destroyed by a fire. But with so many different types of Motion Graphic
              available, it can be tough to know where to start. Here are some tips on how to choose
              the right Motion Graphic for you:
            </p>

            <div className="flex flex-col gap-[0.2vw]">
              {extractedContent?.lists?.[0]?.map((elem, ind) => (
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
              {extractedContent?.lists?.[1]?.map((elem, ind) => (
                <ul key={ind} className="list-disc pl-5 flex flex-col gap-[0.2vw]">
                  <li className="text-[#171717] text-[3.5vw] lg:text-[0.9vw] sm:text-[2vw]">
                    {elem}
                  </li>
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
              These are just a few of the many different types of Motion Graphic available. The
              right type of Motion Graphic for you will depend on your individual needs and
              circumstances. By following the tips above, you can choose the right Motion Graphic
              for you and your family.
            </p>
            <h1 className="lg:text-[2vw] text-[4vw] font-bold w-full max-w-[35vw] mt-[5vw] sm:text-[3vw]">
              Related Products
            </h1>
            <div className="grid grid-cols-1  lg:grid-cols-1 gap-[4vw] ml-[1vw] w-full mt-[2vw]">
              <Slider {...settings}>
                {relatedProducts?.data?.map((elem, index) => (
                  <Link href={`/tutorialsDetail/${elem?.slug}`} key={index}>
                    <figure className="w-full lg:max-w-[28vw]">
                      <img src={elem?.jetpack_featured_media_url} className="w-full" alt="images" />
                    </figure>
                    <p className="mt-[3vw] lg:mt-[1vw] text-[#FF689A] text-[4vw] lg:text-[1.3vw]">
                      {elem?.title?.rendered}
                    </p>
                  </Link>
                ))}
              </Slider>
            </div>
          </section>
          <footer className="translate-y-[35vw] sm:translate-y-[30vw] lg:translate-y-[10vw]">
            <Footer />
          </footer>
        </main>
      )}
    </>
  );
};

export default Page;
