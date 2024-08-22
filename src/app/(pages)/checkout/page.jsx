"use client";
import { checkoutFormData, summaryOptions } from "@/data/data";
import { Button } from "@mui/material";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import Steper from "../../components/authModel/register/Steper";
import { useGlobalContext } from "@/context/globalState";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { loadScript } from "@paypal/paypal-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [checkoutDetail, setCheckoutDetail] = useState([]);
  const [paypalButtonRendered, setPaypalButtonRendered] = useState(false);
  const [showPaymentBtn, setShowPaymentBtn] = useState(true);
  const [navigation, setNavigation] = useState(false);

  const {
    productsAddedToCart,
    customerDetails,
    CreateWooCommerceData,
    customerID,
    setState,
    cartDetail,
    setCartDetail,
    active,
    setPaymentActive,
  } = useGlobalContext();

  const navigate = useRouter();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("productsAddedToCart")) || [];
    if (productsAddedToCart?.length > 0) {
      setCheckoutDetail(productsAddedToCart);
    } else {
      setCheckoutDetail(storedProducts);
    }
  }, [productsAddedToCart]);

  const totalPrice = useMemo(() => {
    return checkoutDetail?.reduce((acc, item) => {
      const price = parseFloat(item?.sale_price || item?.regular_price);
      return acc + price;
    }, 0);
  }, [checkoutDetail]);

  const fetchOrder = async (data) => {
    try {
      await CreateWooCommerceData(`wc/v3/orders`, data);
    } catch (err) {
      toast.error("Network fail, please try again later", {
        position: "top-right",
        style: { marginTop: 40 },
      });
    }
  };

  const paymentMethod = useCallback(() => {
    if (paypalButtonRendered) return;

    loadScript({ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }).then((paypal) => {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            const items = checkoutDetail.map((product) => ({
              name: product.name,
              unit_amount: {
                currency_code: "USD",
                value: parseFloat(product.sale_price || product.regular_price).toFixed(2),
              },
              quantity: "1",
            }));

            const itemTotal = items
              .reduce((total, item) => total + parseFloat(item.unit_amount.value), 0)
              .toFixed(2);

            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: itemTotal,
                    breakdown: {
                      item_total: {
                        currency_code: "USD",
                        value: itemTotal,
                      },
                    },
                  },
                  items: items,
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((detail) => {
              const createOrder = (product) => {
                const orderData = {
                  payment_method: "paypal",
                  payment_method_title: "PayPal",
                  set_paid: true,
                  customer_id: customerID,
                  billing: {
                    first_name: detail.payer.name.given_name,
                    last_name: detail.payer.name.surname,
                    address_1: detail.purchase_units[0].shipping.address.address_line_1,
                    address_2: checkoutDetail[0].downloads[0].id,
                    city: detail.purchase_units[0].shipping.address.admin_area_2,
                    state: detail.purchase_units[0].shipping.address.country_code,
                    postcode: detail.purchase_units[0].shipping.address.postal_code,
                    country: detail.purchase_units[0].shipping.address.country_code,
                    email: customerDetails?.email,
                    phone: customerDetails?.phone,
                  },
                  shipping: {
                    first_name: detail.payer.name.given_name,
                    last_name: detail.payer.name.surname,
                    address_1: detail.purchase_units[0].shipping.address.address_line_1,
                    city: detail.purchase_units[0].shipping.address.admin_area_2,
                    state: detail.purchase_units[0].shipping.address.country_code,
                    postcode: detail.purchase_units[0].shipping.address.postal_code,
                    country: detail.purchase_units[0].shipping.address.country_code,
                  },
                  line_items: [
                    {
                      product_id: product.id,
                      name: product.name,
                      quantity: "1",
                      price: parseFloat(product.sale_price || product.regular_price).toFixed(2),
                    },
                  ],
                };

                return fetchOrder(orderData);
              };

              const orderPromises = checkoutDetail.map((product, index) => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(createOrder(product));
                  }, index * 1000); // Delays each order creation by 1 second
                });
              });

              Promise.all(orderPromises).then(() => {
                setPaymentActive(true);
                localStorage.removeItem("productsAddedToCart");
                setNavigation(true);
                setCartDetail(true);
                setState(true);

                toast.success("Orders created", {
                  position: "top-right",
                  autoClose: 3000,
                  style: { marginTop: 40 },
                });

                setTimeout(() => navigate.push("/downloads"), 3000);
              });
            });
          },

          onCancel: () => {
            toast.error("Payment cancelled", {
              position: "top-right",
              autoClose: 3000,
              style: { marginTop: 40 },
            });
          },
          onError: () => {
            toast.error("Payment error", {
              position: "top-right",
              autoClose: 3000,
              style: { marginTop: 40 },
            });
          },
        })
        .render("#paypal-button-container");
      setPaypalButtonRendered(true);
    });
  }, [
    checkoutDetail,
    CreateWooCommerceData,
    customerDetails,
    customerID,
    navigate,
    paypalButtonRendered,
  ]);

  const handlePayment = () => {
    if (customerID) {
      setShowPaymentBtn(false);
      paymentMethod();
    } else {
      toast.error("Please register your account", {
        position: "top-right",
        autoClose: 3000,
        style: { marginTop: 40 },
      });
      navigate.push("/accountdetails");
    }
  };

  useEffect(() => {
    if (navigation) {
      navigate.push("/downloads");
    }
  }, [navigation, navigate]);

  return (
    <main className="bg-[#FAFAFA] overflow-x-hidden overflow-y-hidden">
      <section className="lg:translate-y-[5vw] sm:translate-y-[10vw] translate-y-[20vw] p-[2vw] w-full max-w-[90vw] m-auto">
        <Link href={`/product/${checkoutDetail?.[0]?.slug}`}>
          <Button
            variant="outlined"
            className="capitalize font-medium border-[1px] border-[#E5E5E5] sm:text-[1.5vw] group hover:border-[#FF689A] hover:text-[#ffff] rounded-lg p-[0.5vw] text-[#525252] flex items-center lg:gap-[0.1vw] lg:w-[8vw] w-[20vw] sm:w-[10vw] sm:ml-[-2vw] sm:translate-y-[3vw] lg:translate-y-[0vw] sm:pr-[2vw] ml-[1vw] lg:ml-[0vw] lg:text-[1vw] text-[3vw] lg:py-[0.3vw] sm:py-[1vw] py-[1.55vw]"
            startIcon={<ArrowBackIosIcon />}
          >
            Back
            <div className="absolute bg-[#FF387A] group-hover:w-full w-[0%] transition-all h-full rounded-md right-0 top-0 z-[-1]"></div>
          </Button>
        </Link>
        <section className="flex lg:flex-row flex-col mt-[3vw] ml-[-9.5vw]">
          <article className="w-full max-w-[70vw] flex flex-col gap-[2vw] mt-[5vw] sm:mt-[7vw] lg:mt-[0vw]">
            <Steper active={active} />
            <div className="bg-white border-[1px] border-[#F5F5F5] mt-[8vw] sm:mt-[5vw] lg:w-[50vw] lg:p-[1vw] lg:ml-[10vw] ml-[7vw] p-[4vw] w-[90vw] rounded-[20px] lg:mt-[1vw]">
              <p className="font-semibold lg:text-[1.5vw] text-[5vw] sm:text-[3vw]">Contact Info</p>
              <form
                action=""
                className="flex flex-col mt-[1vw] lg:text-[1vw] text-[4vw] font-medium"
              >
                <label htmlFor="" className="sm:text-[2.5vw] lg:text-[1vw]">
                  Email
                </label>
                <input
                  type="text"
                  className="lg:p-[0.8vw] p-[2vw] bg-[#FAFAFA] lg:text-[1vw] text-[3.5vw] sm:text-[2vw] sm:p-[2vw] font-medium"
                  placeholder="magika@mail.com"
                  value={customerDetails?.email}
                  name="email"
                />
              </form>
            </div>
            <div className="bg-white border-[1px] ml-[7vw] p-[2vw] mt-[8vw] border-[#F5F5F5] sm:mt-[5vw] w-[90vw] lg:w-[50vw] lg:p-[1vw] lg:ml-[10vw] rounded-[20px] lg:mt-[1vw]">
              <p className="lg:text-[1.5vw] text-[5vw] sm:text-[3vw] font-semibold">
                Detail Address
              </p>
              <form action="" className="mt-[1vw] sm:mt-[3vw] font-medium">
                {checkoutFormData?.map((elem, ind) => (
                  <div key={ind} className="flex flex-col gap-[1vw] sm:mb-4">
                    <label
                      htmlFor=""
                      className="font-medium lg:text-[1vw] text-[4vw] sm:text-[2.5vw]"
                    >
                      {elem.label}
                    </label>
                    <input
                      type="text"
                      className="lg:p-[0.8vw] p-[2vw] lg:text-[1vw] text-[3.5vw] bg-[#FAFAFA] mb-4 sm:text-[2vw] sm:p-[2vw] font-medium"
                      value={customerDetails?.[elem?.name]}
                      name={customerDetails?.[elem?.name]}
                    />
                  </div>
                ))}
                <div className="flex lg:gap-[1vw] gap-[2vw]">
                  <div className="flex flex-col">
                    <label
                      htmlFor=""
                      className="font-medium lg:text-[1vw] sm:text-[2.5vw] text-[4vw]"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      value={customerDetails?.city}
                      name="city"
                      className="lg:p-[0.8vw] sm:text-[2vw] sm:mt-[1vw] p-[2vw] lg:text-[1vw] text-[3.5vw] bg-[#FAFAFA] mb-4 lg:w-[23vw] w-[42vw]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor=""
                      className="font-medium lg:text-[1vw] sm:text-[2.5vw] text-[4vw]"
                    >
                      Postal code
                    </label>
                    <input
                      type="text"
                      value={customerDetails?.postcode}
                      name="postcode"
                      className="lg:p-[0.8vw] p-[2vw] sm:mt-[1vw] sm:text-[2vw] lg:text-[1vw] text-[3.5vw] bg-[#FAFAFA] mb-4 lg:w-[24vw] w-[42vw]"
                    />
                  </div>
                </div>
              </form>
            </div>
          </article>
          <section>
            <article className="bg-white border-[1px] mt-[8vw] sm:ml-[7vw] lg:ml-[0vw] sm:mt-[5vw] ml-[8vw] w-[90vw] rounded-[10px] border-[#F5F5F5] lg:w-[25vw] p-[2vw] lg:mt-[0vw]">
              <p className="font-semibold lg:text-[1.5vw] text-[5vw] sm:text-[3vw]">Summary</p>
              <div className="mt-[1vw] flex flex-col lg:gap-[0.8vw] gap-[4vw]">
                {checkoutDetail?.map((product, ind) => (
                  <div className="flex gap-[1vw] justify-between items-center" key={ind}>
                    <p className="font-medium lg:text-[0.9vw] sm:text-[2vw] text-[3.5vw]">
                      {cartDetail ? "" : product?.name}
                    </p>
                    <p className="lg:text-[1vw] text-[2.5vw] font-semibold sm:text-[1.5vw] text-[#FF689A]">
                      ${cartDetail ? "0" : product?.sale_price || product?.regular_price}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-[0.2px] border-b-[#EEEEEE] lg:mt-[1.5vw] mt-[3vw]"></div>
              <div className="flex justify-between mt-[1vw]">
                <p className="lg:text-[0.9vw] text-[3.5vw] lg:mt-[0vw] sm:text-[2vw] mt-[3vw]">
                  Subtotal
                </p>
                <p className="text-[#FF689A] font-semibold lg:text-[1vw] text-[2.5vw] sm:text-[1.5vw] lg:mt-[0vw] mt-[3vw]">
                  ${cartDetail ? "0" : totalPrice.toFixed(2)}
                </p>
              </div>
              {showPaymentBtn && (
                <Button
                  type="submit"
                  size="large"
                  className="capitalize font-medium w-full lg:mt-[1.5vw] mt-[3vw] sm:text-[1.5vw] text-[2.5vw] lg:text-[0.8vw] bg-[#FF387A] hover:bg-[#FF387A] text-white"
                  onClick={handlePayment}
                >
                  Continue to Payment
                </Button>
              )}
              <div id="paypal-button-container" className="lg:mt-[1vw] mt-[3vw]"></div>
              <div className="border-[0.2px] border-b-[#EEEEEE] my-5"></div>
              <div className="flex lg:translate-x-[-4.2vw] w-full lg:ml-[5vw] sm:ml-[4vw] ml-[-1vw] lg:gap-[2vw] gap-[7.5vw]">
                {summaryOptions?.map((elem, ind) => (
                  <div key={ind} className="flex flex-col items-center sm:justify-center">
                    <span className="p-2 border rounded-full border-[#E5E5E5] bg-[#FAFAFA]">
                      <elem.img size={20} />
                    </span>
                    <p
                      className={`lg:text-[0.7vw] w-full sm:text-[2vw] flex justify-center text-[3vw] font-bold text-center mt-[0.5vw] ${
                        ind === 0 && "lg:w-[5vw] w-[12vw]"
                      }`}
                    >
                      {elem.title}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </section>
      </section>
    </main>
  );
};

export default CheckoutPage;
