"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [limit, setLimit] = useState(5);
  const [logedUsername, setLogedUsername] = useState(null);
  const [login, setLogin] = useState(null);
  const [openLoginModel, setLoginModel] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [checkout, setCheckout] = useState(null);
  const router = useRouter(); 
  const pathname = usePathname()
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [productsAddedToCart, setProductsAddedToCart] = useState([]);
  const [openSignupModel, setSignupModel] = useState(false);
  const [openForgetModel, setForgetModel] = useState(false);
  const [openOtpModel, setOtpModel] = useState(false);
  const [openResetModel, setResetModel] = useState(false);
  const [siderbarImage, setSidebarImage] = useState(false);
  const [otpReset, setOtpReset] = useState();
  const [active, setActive] = useState(false);
  const [isActiveSubscription, setIsActiveSubscription] = useState(false);
  const [dataForResetPassword, setDataForResetPassword] = useState({ oldPassword: "", email: "", otp: "", newPassword: "",});
  const [state, setState] = useState(false);
  const [cartDetail, setCartDetail] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    username: "", first_name: "", last_name: "", email: "", date_created: "",
    postcode: "", phone: "", address1: "", city: "", country: "", vatNumber: "",
  });
  const [paymentActive, setPaymentActive] = useState(false);
  const [customerID, setCustomerID] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState({  price: null, features: [],});
  const [cart, showCart] = useState(false);
  const toggleSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };


  
  const fetchWooCommerceData = async (endpoint, config = {}) => {
      const response = await axios.get("/api/woocommerce", {
        params: { endpoint, config: JSON.stringify(config)},
      });
      return response.data;
  };

  const CreateWooCommerceData = async (endpoint, data) => {
    const response = await axios.post("/api/woocommerce", { endpoint, data});
    return response.data;
  };

  const updateWooCommerceData = async (endpoint, itemId, data) => {
    const response = await axios.put("/api/woocommerce", { endpoint, itemId, data});
    return response.data;
  };

  const fetchTutorials = async ( endpoint, config = {}) => {
    // Make the GET request with the Authorization header
    const response = await axios.get("/api/tutorials", {
      params: { endpoint, config: JSON.stringify(config) },
    });
    return response.data;
  };

  function tokenInLocal(data) {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setLogin(true);
      return true;
    }
    return false;
  }

  const logout = ()=> {
    localStorage.removeItem("user");
    setLogin(false);
    setLoginModel(false);
  }
  
  const removeFromCartHandler = (index) => {
    const updatedCart = productsAddedToCart.filter((_, i) => i !== index);
    setCartCount(updatedCart.length);
    setProductsAddedToCart(updatedCart);
    localStorage.setItem("productsAddedToCart", JSON.stringify(updatedCart));
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const customerID = user?.customerId
    if (customerID) {
      setCustomerID(customerID);
      fetchWooCommerceData(`wc/v3/customers/${customerID}`).then((data) => {
        setCustomerDetails({
          username: data?.data?.username || "",
          first_name: data?.data?.first_name || "",
          last_name: data?.data?.last_name || "",
          email: data?.data?.email || "",
          postcode: data?.data?.billing?.postcode || "",
          phone: data?.data?.billing?.phone || "",
          address1: data?.data?.billing?.address_1 || "",
          city: data?.data?.billing?.city || "",
          country: data?.data?.billing?.country || "",
          date_created: data?.data?.date_created || "",
        });
      }).catch((error) => {
        console.warn(error);
        router.push("/accountdetails");
      });
    }
  }, [customerID, router]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLogin(true);
      try {
        const parsedUser = JSON.parse(user);
        const subscriptionId = parsedUser?.subscriptionId;
        setLoggedUser(parsedUser?.user);
        setCustomerDetails((prevDetails) => ({
          ...prevDetails,
          username: parsedUser?.fullName || parsedUser?.name,
          email: parsedUser?.email,
          vatNumber: parsedUser?.vatNumber,
        }));
        const subsPlan = parsedUser?.subscriptionPlan;
        if (subsPlan?.length > 0 || subscriptionId) {
          setIsActiveSubscription(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setLogin(false);
    }

  }, [pathname]);


  useEffect(() => {
    if (!cartCount) {
      const storedProducts =
        JSON.parse(localStorage.getItem("productsAddedToCart")) || [];
      setCartCount(storedProducts?.length);
    }
  }, [cartCount]);

  return (
    <UserContext.Provider
      value={{
        login, setLogin, openLoginModel, setLoginModel, tokenInLocal, logout, mobileSidebarOpen, toggleSidebar,
        setMobileSidebarOpen, fetchWooCommerceData, CreateWooCommerceData, updateWooCommerceData, setCartCount,
        loggedUser, setLoggedUser, checkout, productsAddedToCart, cartCount, setProductsAddedToCart, setCheckout,
        openCartDrawer, setOpenCartDrawer, openSignupModel, setSignupModel, openForgetModel, setForgetModel,
        openOtpModel, setOtpModel,  openResetModel,  setResetModel, otpReset, setOtpReset, customerID, setCustomerID,
        dataForResetPassword, setDataForResetPassword, customerDetails, setCustomerDetails, dataForResetPassword,
        setDataForResetPassword, logedUsername, setLogedUsername, selectedPlan, setSelectedPlan, limit, setLimit,
        state, setState, cartDetail, setCartDetail, siderbarImage, setSidebarImage, active, setActive, fetchTutorials,
        isActiveSubscription, setIsActiveSubscription, cart, showCart,removeFromCartHandler, paymentActive, setPaymentActive,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
