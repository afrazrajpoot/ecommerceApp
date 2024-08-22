"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/context/globalState";
import { useSearchParams } from "next/navigation";
import Footer from "@/app/components/Common/Footer/Footer";
import Loading from "@/app/components/Common/Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { extractContent, extractSpecificContent } from "@/app/utils/extractContent";
import { toast } from "sonner";
import { useGetCommentsQuery, usePostCommentMutation } from "@/store/storeApi";
import CommentSection from "@/app/components/Cards/CommentSection";

// Custom arrow component

const Page = ({ params: { slug } }) => {
  const ref = useRef(null);

  const [postComment, { isError, isLoading }] = usePostCommentMutation();

  const [author, setAuthor] = useState({});
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { fetchTutorials, customerDetails } = useGlobalContext();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const itemsPerPage = 100;
  const params = useSearchParams();
  const searchQuery = params.get("query");
  const [user, setUser] = useState();
  const { data: commentData } = useGetCommentsQuery(products[0]?.id, {
    skip: !products[0]?.id,
  });
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

  useEffect(() => {
    fetchProducts();
    const loginUser = JSON.parse(localStorage.getItem("user"));
    setAuthor(loginUser);
    fetchRelatedProducts(77);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
      },
      { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const extractedContent = extractSpecificContent(products[0]?.content?.rendered || "");
  // console.log(extractedContent, "download link");
  const allExtractedComments = [];
  let extractComment;
  commentData?.data.forEach((elem) => {
    extractComment = extractContent(elem.content?.rendered || "");
    allExtractedComments.push(extractComment);
  });

  async function leaveComment(e) {
    e.preventDefault();

    if (!user && !customerDetails.email) {
      toast.error("Please login to leave a comment", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        cancelable: true,
        theme: "light",
        style: { marginTop: 40 },
      });
      ref.current.value = "";
      return;
    }
    try {
      postComment({
        post: products[0].id,
        user: user,
        content: ref.current.value || "",
      });
    } catch (err) {
      toast.error("Failed to leave comment", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      ref.current.value = "";
    }
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser({ name: user?.fullName, email: user?.email, img: user?.img?.img });
    }
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-full">
        <nav className=" hidden lg:flex mt-[20vw]   sm:mt-[8vw] lg:mt-[5vw] w-[90vw] mx-auto items-center justify-between p-[3vw]"></nav>
        <section className="w-full max-w-[90vw] ml-[4vw] mx-auto ">
          {products?.length === 0 ? (
            <main className="w-full flex items-center justify-center h-[30vw]">
              <Loading />
            </main>
          ) : (
            <>
              <figure className="lg:w-full mt-[8vw] lg:max-w-[100vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  md:mt-0 gap-[10vw] md:gap-[2vw] items-start">
                <iframe
                  className="rounded-[0.8vw] mt-[8vw] ml-[1.5vw] w-full lg:mt-0 lg:w-[70vw] h-[60vw] lg:h-[40vw]"
                  src={extractedContent?.iframeSrc}
                  alt="store details"
                  allowFullScreen
                />
              </figure>
            </>
          )}
          <article className="mt-[4vw] flex flex-col lg:flex-row items-center gap-[2vw] text-[3vw] lg:text-[1.5vw] font-medium">
            <button className="bg-[#FF689A] px-[2vw] py-[1vw] lg:py-[0.7vw] font-bold text-white">
              Subscribe!
            </button>
            <p className="w-full lg:max-w-[60vw]">
              Please SUBSCRIBE to my YouTube Channel, SonduckFilm. It’s free and I will continue to
              give out free downloads!
            </p>
          </article>
          {extractedContent?.downloadLink ? (
            <a
              href={extractedContent.downloadLink}
              className="bg-[#FF689A] mt-[3vw] px-6 py-2 text-[1.5vw] font-bold text-white rounded-lg flex items-center"
            >
              <img
                src={extractedContent?.svgImageUrl}
                alt="Download Icon"
                className="w-full max-w-[5vw] mr-2"
              />
              <p className="hover:underline">Download</p>
            </a>
          ) : (
            <p className="text-gray-500">No download link available</p>
          )}
          <article className="mt-[3vw]">
            <h1 className="text-[#FF689A] font-medium text-[5vw] lg:text-[1.5vw]">Related Posts</h1>
          </article>

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
          <article>
            <CommentSection
              allExtractedComments={allExtractedComments}
              commentData={commentData?.data}
              post={products[0]?.id}
              name={author?.user?.name || author?.fullName}
              email={author?.user?.email || author?.email}
            />
          </article>
          <form
            onSubmit={leaveComment}
            action=""
            className="w-full max-w-[110vw] mt-[5vw] text-[4vw] lg:text-[1.5vw]"
          >
            <p className="text-[#FF689A]">Leave a Comment</p>
            <textarea
              ref={ref}
              name="comment"
              id=""
              className="w-full mt-[2vw] md:mt-[1vw] text-[4vw] lg:text-[1vw] rounded-[0.8vw] focus:outline-none text p-[3vw]"
              rows="5"
            ></textarea>
            <button
              type="submit"
              className="bg-[#FF689A] hover:bg-[#f05f8f] p-[1vw] text-[3vw] md:text-[1vw] md:p-[0.8vw] mt-[3vw] rounded-[0.7vw] md:mt-[2vw] font-medium text-white"
            >
              {isLoading ? <Loading /> : "Comment"}
            </button>
          </form>
        </section>

        <section className="mt-[5vw]">
          <Footer />
        </section>
      </main>
    </Suspense>
  );
};

export default Page;
