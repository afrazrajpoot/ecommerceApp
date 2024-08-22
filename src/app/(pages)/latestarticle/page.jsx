"use client";
// import Footer from "@/components/Footer";
// import { categoriesData, latestArticledata } from "@/data/data";
import { TextField } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Common/Paggination";
import Footer from "../../components/Common/Footer/Footer";
import { useGlobalContext } from "@/context/globalState";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import Loading from "@/app/components/Common/Loading";
import InputField from "@/app/components/InputField";
import TutorialSearch from "@/app/components/TutorialSearch";
import { useGetCategoriesQuery } from "@/store/storeApi";

const Page = () => {
  const { fetchWooCommerceData, fetchTutorials } = useGlobalContext();
  const [products, setProducts] = useState([]);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterTutorial, setFilterTutrial] = useState([]);
  const { data: categoriesData, isLoading } = useGetCategoriesQuery();
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      let params = { per_page: itemsPerPage, page };
      const response = await fetchTutorials("wp/v2/posts", { params });
      const data = response.data;
      const totalProducts = response.totalProducts;

      setTotalPages(Math.ceil(totalProducts / itemsPerPage));

      // Append new products to the existing list
      setProducts(data);
      // setProducts(data);
      setFilterTutrial(
        data?.map((elem) => {
          return elem.slug;
        })
      );
    } catch (error) {
      toast.error("Network error please try again", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const recentPosts = [
    {
      date: "22/06/2023",
      title: "The 10 Most Popular Title Animations in After Effects",
    },
    { date: "22/06/2023", title: "Create Cinematic Visuals in After Effects" },
    { date: "22/06/2023", title: "Bounce Expression" },
  ];

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  // console.log(categoriesData, "categorie");
  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchProducts(nextPage);
    }
  };
  // console.log(products, "products");
  return (
    <>
      {products.length === 0 ? (
        <main className="w-full flex items-center justify-center h-[30vw]">
          <Loading />
        </main>
      ) : (
        <main className="bg-[#FAFAFA] pb-[2vw]">
          <section className="lg:translate-y-[5vw] translate-y-[20vw] sm:translate-y-[10vw]">
            <section className="w-full max-w-[75vw] m-auto">
              <Link href="/latestarticle">
                <button className="border-[1px] ml-[-8vw] lg:ml-[0vw]  border-[#FF689A] hover:bg-[#FF689A] hover:text-white p-[0.6vw] rounded-lg text-[#FF689A] mt-[1vw]">
                  Tutorials
                </button>
              </Link>
              <h1 className="lg:text-[2vw] ml-[-8vw] lg:ml-[0vw]  text-[5vw] font-bold lg:mt-[1vw] sm:mt-[3vw] mt-[5vw] sm:text-[3vw]">
                Latest Articles
              </h1>
              <p className="lg:mt-[1vw] text-[3.5vw] lg:ml-[0vw] ml-[-9vw]  lg:text-[1vw] sm:text-[2vw]  mt-[3vw]">
                We understand that you may have some questions about sunduckfilm. We have compiled a
                list of frequently asked questions to help you get the information you need. If you
                have any other questions, please do not hesitate to contact us.
              </p>
              <article className="lg:hidden w-[93vw] ml-[-9vw]">
                <form className="border-[1px] mt-[9.5vw] border-[#D4D4D4] bg-[#F5F5F5] flex gap-[1vw]  p-[2vw] rounded-lg ">
                  <img src="/img/blackSearch.png" alt="search" />
                  <input
                    type="text"
                    placeholder="search"
                    className="bg-[#F5F5F5] focus:outline-none"
                    name=""
                    id=""
                  />
                </form>
                <h2 className="text-[5vw] font-bold mt-[6.5vw] ml-[0.4vw] sm:text-[3vw]">
                  Categories
                </h2>
                <div className="border-[0.7px] border-b-[#E5E5E5] mt-[5vw]"></div>
                {categoriesData?.data?.data?.map((elem, ind) => (
                  <div key={ind}>
                    <div className="flex justify-between">
                      <h3 className="mt-[3vw] ml-[0.4vw] text-[4vw] font-medium sm:text-[2.5vw]">
                        {elem?.name}
                      </h3>
                      <p className="mt-[3vw] text-[#FF689A] text-[3.5vw] sm:text-[1.9vw]">
                        {`(${elem?.count})`}
                      </p>
                    </div>
                    <div className="border-[0.7px] border-b-[#E5E5E5] mt-[3vw]"></div>
                  </div>
                ))}
              </article>
              <article className="flex  mt-[8vw] sm:mt-[5vw]">
                <section className="">
                  <article className="flex flex-col gap-[6vw]">
                    {products?.map((item, index) => (
                      <Link href={`/tutorialsDetail/${item?.slug}`} key={index} className="w-full">
                        <div key={index} className="flex   lg:flex-row flex-col gap-[1vw]">
                          {/* <img src={item.images[0]?.src} alt={item.title} className="w-full" /> */}
                          <img
                            src={item?.jetpack_featured_media_url}
                            alt="images"
                            className=" ml-[1vw] w-full max-w-[120vw] rounded-md shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 lg:w-[30vw]  lg:ml-[0vw] "
                          />

                          <div className="mt-[0.8vw] sm:ml-[15vw] lg:ml-[0vw]">
                            <p className="mt-[3vw] lg:mt-[1vw] text-red-400 font-bold text-[4vw] lg:text-[1.5vw]">
                              {item?.title?.rendered}
                            </p>
                            <p className="text-red-400 text-[2vw] lg:text-[1vw] mt-[1vw] ">
                              {item?._embedded?.author?.[0]?.name}
                            </p>
                            <p className="text-gray-400  text-[2.5vw] lg:text-[0.9vw]">
                              {new Date(item?.date).toLocaleDateString()}
                            </p>
                            {/* <p className="lg:text-[0.9vw] text-[3.5vw] w-full sm:text-[2vw] max-w-[75vw] lg:ml-[0vw] ml-[-6vw] lg:max-w-[25vw] mt-[0.6vw] text-[#171717] ">
                        {item.description}
                      </p> */}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </article>
                </section>
                <section className="ml-[10vw] hidden lg:block">
                  <article>
                    <TutorialSearch suggestions={filterTutorial} />
                    <h2 className="text-[1.5vw] font-bold mt-[2vw] ml-[0.4vw]">Recent Posts</h2>
                    {recentPosts?.map((post, index) => (
                      <main key={index}>
                        <div className="mt-[1vw] ml-[0.4vw]">
                          <p className="text-[#525252] text-[1vw]">{post?.date}</p>
                          <p className="text-[1vw] mt-2 font-medium">{post?.title}</p>
                        </div>
                        <div className="border-[0.7px] border-b-[#E5E5E5] mt-[1vw]"></div>
                      </main>
                    ))}
                    <h2 className="text-[1.5vw] font-bold mt-[2vw] ml-[0.4vw]">Categories</h2>
                    <div className="border-[0.7px] border-b-[#E5E5E5] mt-[1vw]"></div>
                    {categoriesData?.data?.map((elem, ind) => (
                      <div key={ind}>
                        <div className="flex justify-between">
                          <h3 className="mt-[1vw] ml-[0.4vw] text-[1vw] font-medium">
                            {elem?.name}
                          </h3>
                          <p className="mt-[1vw] text-[#FF689A]"> {`(${elem?.count})`}</p>
                        </div>
                        <div className="border-[0.7px] border-b-[#E5E5E5] mt-[1vw]"></div>
                      </div>
                    ))}
                  </article>
                </section>
              </article>
            </section>
          </section>
          <article className="lg:hidden">
            <h2 className="text-[5vw] font-medium mt-[9vw] ml-[4.5vw] sm:text-[3vw]">
              Recent Posts
            </h2>
            {recentPosts?.map((post, index) => (
              <main className="" key={index}>
                <div className="mt-[1vw] ml-[5.5vw]">
                  <p className="text-[#525252] text-[3vw] mt-[4vw] sm:text-[2vw]"> {post?.date} </p>
                  <p className="text-[4vw] font-medium w-[75vw] mt-[3vw] sm:text-[2.5vw]">
                    {" "}
                    {post?.title}{" "}
                  </p>
                </div>
                <div className="border-[0.7px] border-b-[#E5E5E5] mt-[3vw] w-[88vw] m-auto"></div>
              </main>
            ))}
          </article>
          <article className="mt-[5vw] w-full max-w-[50vw] ml-[12vw]">
            {currentPage < totalPages && (
              <button
                onClick={handleLoadMore}
                className="mt-[4vw] md:mt-[2vw]  bg-red-600 text-white w-full px-4 py-[1vw] rounded-lg"
                disabled={loading} // Disable button while loading
              >
                {loading ? <Loading /> : "Load More"}
              </button>
            )}
          </article>
          <footer className="translate-y-[10vw]">
            <Footer />
          </footer>
        </main>
      )}
    </>
  );
};

export default Page;
