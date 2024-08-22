"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Footer from "../../components/Common/Footer/Footer";
import { useGlobalContext } from "@/context/globalState";
import Loading from "../../components/Common/Loading";
import { useSearchParams } from "next/navigation";
import Bundles from "@/app/components/pagesComponents/landingpage/Bundles";

const TutorialsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { fetchTutorials } = useGlobalContext();
  const itemsPerPage = 9;
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);

  const searchQuery = params.get("query");

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true); // Set loading state to true
      let params = { per_page: itemsPerPage, page, _embed: "author" };

      if (searchQuery) {
        params = { ...params, search: searchQuery };
      }

      const response = await fetchTutorials("wp/v2/posts", { params });
      // console.log(response, "API Response");

      const totalProducts = response.totalProducts;
      const data = response.data;

      setTotalPages(Math.ceil(totalProducts / itemsPerPage));
      setProducts((prevProducts) => [...prevProducts, ...data]);
    } catch (error) {
      if (error.message === "socket hung up") {
        window.location.reload();
      } else {
        console.warn(error);
      }
    } finally {
      setLoading(false); // Set loading state to false after the operation
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch initial products (All Products)
  }, []); // Empty dependency array to run once on mount
  // console.log(products, "tutorials");
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        fetchProducts(newPage);
        return newPage;
      });
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-full mt-[10vw]">
        <section className="w-full max-w-[90vw] ml-[4vw] mx-auto mt-[9vw] md:mt-[2vw]">
          {products.length === 0 ? (
            <main className="w-full flex items-center justify-center h-[30vw]">
              <Loading />
            </main>
          ) : (
            <>
              <figure className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-[5vw] md:mt-0 gap-[10vw] md:gap-[2vw] items-start">
                {products.map((elem, index) => {
                  const author = elem._embedded?.author?.[0]?.name || "By Joshua Noel ";
                  const date = new Date(elem.date).toLocaleDateString();
                  return (
                    <Link href={`/tutorialsDetail/${elem?.slug}`} key={index}>
                      <figure>
                        <img src={elem?.jetpack_featured_media_url} alt="images" />
                      </figure>
                      <p className="mt-[3vw] lg:mt-[1vw] text-red-400 font-bold text-[4vw] lg:text-[1.5vw]">
                        {elem?.title?.rendered}
                      </p>
                      <p className="text-red-400 text-[2vw] lg:text-[1vw] mt-[1vw] ">{author}</p>
                      <p className="text-gray-400 text-[1.5vw] lg:text-[0.9vw]">{date}</p>
                    </Link>
                  );
                })}
              </figure>
              {currentPage < totalPages && (
                <button
                  onClick={handleLoadMore}
                  className="mt-[4vw] md:mt-[2vw] bg-red-600 text-white w-full px-4 py-2 rounded-lg"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? <Loading /> : "Load More"}
                </button>
              )}
            </>
          )}
        </section>

        <section className="w-full mt-[10vw] md:mt-[2vw] bg-[#F8F8F8]">
          <Bundles />
        </section>
        <Footer />
      </main>
    </Suspense>
  );
};

export default TutorialsPage;
