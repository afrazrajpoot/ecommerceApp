"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "@/app/components/Common/Footer/Footer";
import { useGlobalContext } from "@/context/globalState";
import { extractContent } from "@/app/utils/extractContent";
import Loading from "@/app/components/Common/Loading";
import { toast } from "sonner";
import {
  useDeleteSubscriptionMutation,
  useGetDataByIdMutation,
  useUpdateSubscriptionMutation,
} from "@/store/storeApi";
import { useRouter } from "next/navigation";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Link from "next/link";
import { IoLayersSharp } from "react-icons/io5";
import { IoIosArrowRoundForward, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { features } from "@/data/data";
import Pack from "@/app/components/Cards/Pack";

const ProductDetails = ({ params: { slug } }) => {
  const router = useRouter();

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    fetchWooCommerceData,
    setCartCount,
    productsAddedToCart,
    setProductsAddedToCart,
    customerDetails,
    CreateWooCommerceData,
    customerID,
    login,
    showCart,
    setCartDetail,
    isActiveSubscription,
  } = useGlobalContext();

  const [getSubscriptionData] = useGetDataByIdMutation();
  const [updateLimit] = useUpdateSubscriptionMutation();
  const [deleteSubscription] = useDeleteSubscriptionMutation();

  const addToCartHandler = (product) => {
    const updatedCart = [...productsAddedToCart, product];
    setCartCount(updatedCart?.length);
    setProductsAddedToCart(updatedCart);
    localStorage.setItem("productsAddedToCart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const fetchRelatedProducts = async (relatedIds) => {
      try {
        const relatedProductsData = await Promise.all(
          relatedIds.map((id) => fetchWooCommerceData(`wc/v3/products/${id}`))
        );
        setRelatedProducts(relatedProductsData);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await fetchWooCommerceData(`wc/v3/products?slug=${slug}`);
        const product = data?.data[0];
        setProductDetails(product);
        fetchRelatedProducts(product?.related_ids);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug, fetchWooCommerceData]);

  if (!productDetails) {
    return (
      <main className="w-full flex items-center justify-center h-screen">
        <Loading />
      </main>
    );
  }

  const extractedContent = extractContent(productDetails?.description || "");
  const mainVideo = extractContent(productDetails?.short_description || "");

  const handleLoginCheckout = () => {
    if (!login) {
      toast.error("Please login first", {
        position: "top-right",
        style: { marginTop: 40 },
      });
    } else if (!customerDetails) {
      toast.error("Please create your customer account first", {
        position: "top-right",
        style: { marginTop: 40 },
      });
      router.push("/accountdetails");
    } else if (!customerID) {
      toast.error("Please register your account", {
        position: "top-right",
        style: { marginTop: 40 },
      });
      router.push("/accountdetails");
    }
  };

  const handleSubscription = async () => {
    setLoading(true);
    try {
      const userFromLocal = JSON.parse(localStorage.getItem("user"));
      const id = userFromLocal?.subscriptionId;

      if (id !== "null" && id !== undefined) {
        const res = await getSubscriptionData({ id });
        if (!res?.data?.subscription) {
          toast.error("Please get subscription", {
            position: "top-right",
            style: { marginTop: 40 },
          });
          setLoading(false);
          return;
        }
        const limit = res.data?.subscription?.downloadLimit;
        const lastDate = res.data?.subscription?.endDate;
        console.log(lastDate, "lastDate");
        if (limit <= 0) {
          toast.error("No more downloads available, please get a subscription pack", {
            position: "top-right",
            style: { marginTop: 40 },
          });
          setLoading(false);
          return;
        }
        if (new Date(lastDate) < new Date()) {
          await deleteSubscription(id);
          toast.error("Your subscription has expired", {
            position: "top-right",
            style: { marginTop: 40 },
          });
          setLoading(false);
          return;
        }
        await updateLimit(id);
        createSubscriptionOrder();
        toast.success("Order created successfully", {
          position: "top-right",
          style: { marginTop: 40 },
        });
        setLoading(false);
        router.push("/downloads");
      }
    } catch (error) {
      toast.error("Please try again later", {
        position: "top-right",
        style: { marginTop: 40 },
      });
      setLoading(false);
    }
  };

  const createSubscriptionOrder = async () => {
    const lineItems = [
      {
        product_id: productDetails?.id,
        name: `${productDetails.categories[0]?.name} && ${productDetails.categories[1]?.name}`,
        quantity: 1,
        price: "0",
        subtotal: "0",
        total: "0",
        taxes: [],
        meta_data: [],
        sku: productDetails?.[0]?.sku || "",
        image: { src: productDetails?.images?.[0]?.src || "" },
      },
    ];

    try {
      await CreateWooCommerceData(`wc/v3/orders`, {
        payment_method: "paypal",
        payment_method_title: "PayPal",
        set_paid: true,
        customer_id: customerID,
        billing: {
          first_name: customerDetails?.first_name,
          last_name: customerDetails?.last_name,
          address_1: customerDetails?.address1,
          address_2: productDetails?.downloads[0].id,
          city: customerDetails?.city,
          state: customerDetails?.country,
          postcode: customerDetails?.postcode,
          country: customerDetails?.country,
          email: customerDetails?.email,
          phone: customerDetails?.phone,
        },
        shipping: {
          first_name: customerDetails?.first_name,
          last_name: customerDetails?.last_name,
          address_1: customerDetails?.address1,
          address_2: productDetails?.downloads[0].id,
          city: customerDetails?.city,
          state: customerDetails?.country,
          postcode: customerDetails?.postcode,
          country: customerDetails?.country,
        },
        line_items: lineItems,
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: "10.00",
          },
        ],
      });
    } catch (error) {
      toast.error("Failed to create order", {
        position: "top-right",
        style: { marginTop: 40 },
      });
    }
  };

  const CustomPrevArrow = ({ style, onClick }) => (
    <span
      style={{ ...style }}
      onClick={onClick}
      className="text-vw text-black my-10 absolute top-[100%] cursor-pointer left-0 z-50"
    >
      <ArrowRightAltIcon className="text-black text-[12vw] md:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-[#171717] hover:text-white hover:rounded-full hover:text-center rotate-180" />
    </span>
  );

  const CustomNextArrow = ({ style, onClick }) => (
    <span
      style={{ ...style }}
      onClick={onClick}
      className="text-vw text-black my-10 absolute top-[100%] cursor-pointer left-[100px]"
    >
      <ArrowRightAltIcon className="text-[#000000] text-[12vw] md:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-[#171717] hover:text-white hover:rounded-full hover:text-center" />
    </span>
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomPrevArrow />,
    prevArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
      },
      { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      <main className="w-full relative overflow-x-hidden">
        <nav className="w-full max-w-[90vw] mx-auto mt-[20vw] sm:mt-[8vw] lg:mt-[4vw] p-[2vw] pb-2">
          <p className="text-[32px] lg:text-[40px] text-[#171717] w-full md:max-w-[50vw] font-semibold">
            {productDetails?.name}
          </p>
          <section className="flex items-center gap-1 mt-4 w-full">
            <p className="text-[#525252] text-[14px] sm:text-[16px]">Category: </p>
            <Button
              sx={{ padding: 0 }}
              variant="outlined"
              className="bg-[#FFFF] whitespace-nowrap ml-[0.5vw] border-[1px] border-[#FF387A] text-[12px] hover:text-white hover:shadow-md hover:border-[#ff387af6] hover:bg-[#ff387af6] text-[#FF387A] px-4 py-1 font-semibold rounded-lg text-center capitalize"
            >
              {productDetails?.categories?.[0]?.name}
            </Button>
          </section>
          <section className="w-full flex flex-col lg:flex-row items-start max-w-[90vw] mx-auto mt-[10vw] sm:mt-[5vw] lg:mt-[2vw]">
            {mainVideo?.videos?.[0] || extractedContent?.videos?.[0] ? (
              <iframe
                src={mainVideo?.videos?.[0] || extractedContent?.videos?.[0]}
                className="w-full max-w-[90vw] h-[60vw] sm:h-[50vw] lg:h-[35vw] sm:max-w-[85vw] lg:max-w-[60vw]"
                alt="image"
                allowFullScreen
              />
            ) : (
              <img
                src={extractedContent?.images?.[0]?.src || productDetails.images[0]?.src}
                alt="store details"
                className="w-full max-w-[90vw] h-[60vw] sm:h-[50vw] lg:h-[35vw] sm:max-w-[85vw] lg:max-w-[60vw]"
              />
            )}
            <aside className="w-full mt-[10vw] sm:mt-[8vw] lg:mt-0 sm:max-w-[80vw] lg:max-w-[24vw] lg:ml-[2vw]">
              <section className="w-full shadow-md ml-[2vw] p-[5vw] lg:p-[1vw] rounded-lg">
                <nav className="flex items-center justify-between py-2">
                  <p className="text-[#171717] text-[5.1vw] sm:text-[2.1vw] lg:text-[1.2vw] font-semibold">
                    Price
                  </p>
                  <p className="flex items-center">
                    {productDetails?.sale_price ? (
                      <span className="text-[7vw] sm:text-[2.8vw] lg:text-[1.6vw] text-[#FF387A] font-semibold">
                        ${productDetails?.sale_price}
                      </span>
                    ) : (
                      <span className="text-[7vw] sm:text-[2.8vw] lg:text-[1.6vw] text-[#FF387A] font-semibold">
                        ${productDetails?.regular_price}
                      </span>
                    )}
                    {productDetails?.sale_price && (
                      <strike className="ml-[0.5vw] text-[5vw] sm:text-[2vw] lg:text-[1.2vw] text-gray-500 font-medium">
                        ${productDetails?.regular_price}
                      </strike>
                    )}
                  </p>
                </nav>
                <Button
                  onClick={() => {
                    if (!customerID) {
                      handleLoginCheckout();
                      return;
                    }
                    addToCartHandler(productDetails);
                    setCartDetail(false);
                    showCart(true);
                  }}
                  variant="outlined"
                  className="group capitalize relative font-semibold mt-[1vw] sm:mt-[4vw] lg:mt-[1vw] border-[1px] border-[#FF387A] hover:border-[#FF387A] text-[#FF387A] text-[3.5vw] sm:text-[2vw] lg:text-[1vw] group p-[2.5vw] md:p-[0.5vw] rounded-md w-full text-center"
                >
                  <div className="z-10 group-hover:text-white">Add to cart</div>
                  <div className="absolute bg-[#FF387A] group-hover:w-full w-[0%] transition-all duration-300 h-full rounded-sm left-0 top-0"></div>
                </Button>
                {!customerID || isActiveSubscription === false ? (
                  <Button
                    onClick={() => {
                      if (!login && customerID === null) {
                        handleLoginCheckout();
                      } else {
                        addToCartHandler(productDetails);
                        setCartDetail(false);
                        navigate.push("/checkout");
                      }
                    }}
                    variant="contained"
                    className="bg-[#FF387A] mt-[4vw] lg:mt-[1vw] border-[1px] border-[#FF387A] capitalize font-medium text-[3.5vw] sm:text-[2vw] lg:text-[1vw] text-white hover:shadow-md hover:bg-[#ff387af6] hover:border-[#ff387af6] p-[2.5vw] md:p-[0.5vw] rounded-md w-full text-center"
                  >
                    {loading ? <Loading /> : "Buy Now"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubscription}
                    variant="contained"
                    className="bg-[#FF387A] mt-[4vw] lg:mt-[1vw] border-[1px] border-[#FF387A] capitalize font-medium text-[3.5vw] sm:text-[2vw] lg:text-[1vw] text-white hover:shadow-md hover:bg-[#ff387af6] hover:border-[#ff387af6] p-[2.5vw] md:p-[0.5vw] rounded-md w-full text-center"
                  >
                    {loading ? <Loading /> : "Download Now"}
                  </Button>
                )}
                <section className="flex border-t-[1px] border-[#E5E5E5] pt-5 mt-8 items-center justify-between">
                  <p className="text-[#171717] font-semibold text-[4vw] sm:text-[2vw] lg:text-[1vw]">
                    Compatibility
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8">
                      <Image
                        src={"/img/adobe_pr_2.png"}
                        alt="logo"
                        className="cursor-pointer object-contain"
                        fill
                      />
                    </div>
                    <div className="relative h-8 w-8">
                      <Image
                        src={"/img/adobe_ae_2.png"}
                        alt="logo"
                        className="cursor-pointer object-contain"
                        fill
                      />
                    </div>
                  </div>
                </section>
                <p className="flex text-[4vw] sm:text-[2vw] lg:text-[1vw] text-[#171717] items-center justify-between pb-5 mt-4">
                  <span className="font-semibold">File size</span>
                  <span>65.43 MB</span>
                </p>
              </section>
              <footer className="w-full mt-[10vw] sm:mt-[5vw] lg:mt-[2vw] ml-[2vw] rounded-md p-[5vw] lg:p-[2vw] bg-[#FF689A1A]">
                <nav className="flex items-center">
                  <IoLayersSharp size={25} className="text-[#FF387A]" />
                  <p className="text-[4vw] sm:text-[2vw] lg:text-[1vw] text-[#FF387A] ml-[0.5vw] font-bold">
                    Get Unlimited Access
                  </p>
                </nav>
                <p className="w-full mt-[1vw] lg:max-w-[21vw] text-[4vw] sm:text-[2vw] lg:text-[1vw] text-[#525252] font-light">
                  Unlock this theme and get unlimited access to over 1000+ Premium templates.
                </p>
                <p className="relative group w-fit flex items-center mt-4 lg:max-w-[20vw] text-[4vw] sm:text-[2vw] lg:text-[1vw] text-[#FF387A]">
                  <Link href={"/subscription"}>
                    Go Unlimited Now
                    <span className="absolute top-[-15%] right-[-25%] w-[30px] h-[25px] overflow-hidden">
                      <IoIosArrowRoundForward
                        className="group-hover:animate-arrow-slide"
                        size={30}
                      />
                    </span>
                  </Link>
                </p>
              </footer>
            </aside>
          </section>
        </nav>
        <section className="w-full flex flex-col lg:flex-row items-start max-w-[90vw] mx-auto mt-2  p-[2vw]">
          <article className="w-full">
            <main className="flex gap-5 items-start justify-evenly w-full">
              {extractedContent?.videos?.slice(0, 2).map((video, index) => (
                <main key={index} className="w-full">
                  <iframe
                    className="rounded-[0.8vw] mt-[8vw] lg:mt-0 w-full max-w-[90vw] h-[250px]"
                    key={index}
                    src={video}
                    alt="store details"
                    allowFullScreen
                  />
                </main>
              ))}
            </main>
            <h1 className="text-[#171717] text-[28px] md:text-[32px] mt-8 mb-4 font-semibold">
              {" "}
              Overview{" "}
            </h1>
            <p className="text-[#171717] text-[4.5vw] sm:text-[2.2vw] lg:text-[1vw] w-full md:max-w-[70vw]">
              Boost your video production to the next level Over 3333 dynamic, seamless transitions
              for any video project! Make your video visually interesting and amazing quickly,
              conveniently, and effortlessly! Slideshow, trailer, promo, music clip, broadcast,
              movie, documentary film, or presentation – every your project will be far more
              fascinating, dizzying, and professional!
            </p>
            <h1 className="text-[#171717] text-[26px] mb-4 mt-8 font-medium">Full Customization</h1>
            <p className="text-[#171717] text-[4.5vw] sm:text-[2.2vw] lg:text-[1vw] w-full md:max-w-[70vw] ">
              Full Customization Control every transition with no experience in After Effects. You
              can easily change the color, direction, zoom point, and many other parameters. How?
              Check out this video review.
            </p>
            {extractedContent?.images?.[0] && (
              <Image
                src={extractedContent?.images?.[0]?.src}
                width={1000}
                height={1000}
                alt="store details"
                className="mt-[10vw] sm:mt-[6vw] lg:mt-[3vw]"
              />
            )}
            <p className="text-[#171717] text-[4.5vw] sm:text-[2.2vw] lg:text-[1vw] w-full md:max-w-[70vw] font-medium my-8">
              What resolution projects are supported
            </p>
            <p className="text-[#171717] text-[4.5vw] sm:text-[2.2vw] lg:text-[1vw] w-full md:max-w-[70vw] font-medium">
              Handy Seamless Transitions support any resolution of your project. Starting with the
              minimum and ending with a full 4K! In fact, - these transitions are resizable.
              Moreover, transitions will work with any aspect ratio in the frame, such as portrait
              9:16
            </p>
            {extractedContent.images?.length > 2 ? (
              <>
                {extractedContent.images
                  .slice(1)
                  .map(
                    (image, i) =>
                      image?.src && (
                        <Image
                          key={i}
                          src={image.src}
                          width={1000}
                          height={1000}
                          alt="store details"
                          className="mt-[10vw] sm:mt-[6vw] lg:mt-[3vw]"
                        />
                      )
                  )}
              </>
            ) : (
              <>
                {extractedContent?.videos?.slice(2, 9).map((video, index) => (
                  <main key={index}>
                    <iframe
                      className="rounded-[0.8vw] mt-[10vw] sm:mt-[6vw] lg:mt-[3vw] w-full max-w-[90vw] h-[60vw] sm:h-[50vw] lg:h-[50vw] sm:max-w-[85vw] lg:max-w-[100%]"
                      key={index}
                      src={video}
                      width={1000}
                      height={1000}
                      alt="store details"
                      allowFullScreen
                    />
                  </main>
                ))}
              </>
            )}
          </article>
          <div className="w-full lg:max-w-[24vw] mt-[10vw] sm:mt-[5vw] lg:mt-0 lg:ml-[2vw] pl-8">
            <aside className="w-full  p-[2vw] border-[1px] border-[525252] rounded-lg ">
              <h1 className="text-[5.5vw] sm:text-[2.5vw] lg:text-[1.5vw] text-[#171717] font-semibold">
                Features
              </h1>
              {features?.map((item, index) => (
                <section
                  key={index}
                  className="flex items-center mt-[5vw] sm:mt-[3vw] lg:mt-[1vw] gap-2"
                >
                  <IoIosCheckmarkCircleOutline
                    size={20}
                    className="text-[#FF387A] flex-shrink-0 self-start mt-[2px]"
                  />
                  <p className=" text-[4vw] sm:text-[2vw] lg:text-[1vw] text-[#171717] font-semibold">
                    {item}
                  </p>
                </section>
              ))}
              <footer className="w-full px-4 py-2 mt-[10vw] sm:mt-[4vw] lg:mt-[2vw] flex items-center rounded-lg border-[1px] border-[#D4D4D4] bg-[#FAFAFA]">
                <Image src={"/img/people.png"} width={85} height={85} className="" />
                <p className="text-[#171717] ml-[0.5vw] text-[3.5vw] sm:text-[1.8vw] lg:text-[1vw] font-medium">
                  <span className="font-semibold">{productDetails?.total_sales}</span> Sales
                </p>
              </footer>
            </aside>
          </div>
        </section>
        <section className="w-full flex flex-col items-start max-w-[90vw] mx-auto my-[10vw] sm:mt-[5vw] lg:mt-[2vw]">
          <h1 className="text-[7vw] sm:text-[2.8vw] lg:text-[2vw] text-[#171717] font-semibold my-10">
            Related Products
          </h1>
          <div className="relative w-full grid grid-cols-1 pb-20">
            <Slider {...sliderSettings}>
              {relatedProducts?.map((product, index) => {
                return (
                  <Link href={`/product/${product?.data?.slug}`} key={index}>
                    <Pack
                      discountedPrice={product?.data?.sale_price}
                      actualPrice={product?.data?.regular_price}
                      image={product?.data?.images?.[0]?.src}
                      title={product?.data?.name}
                    />
                  </Link>
                );
              })}
            </Slider>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default ProductDetails;
