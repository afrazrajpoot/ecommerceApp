"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { headerData } from "@/data/data";
import { useGlobalContext } from "@/context/globalState";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const suggestions = ["Bundle", "Single Pack", "Premiere Pro", "After Effects"];

const Header = () => {
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const { data: session } = useSession();
  const {
    login,
    setLoginModel,
    toggleSidebar,
    cartCount,
    setSignupModel,
    showCart,
    logedUsername,
    customerDetails,
    cartDetail,
  } = useGlobalContext();
  const [userName, setUserName] = useState("Guest");
  const path = usePathname();
  const CustomButton = styled(Button)({
    color: "white",
    borderColor: "white",
    borderWidth: "1px",
    textTransform: "capitalize",
  });

  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const filteredHeaderData =
    !login && (path === "/" || path === "/subscription")
      ? headerData.filter((item, index) => index !== 3)
      : headerData;

  useEffect(() => {
    if (customerDetails) {
      setUserName(customerDetails?.username);
    }
    if (session?.user?.name) {
      setUserName(session?.user?.name);
      localStorage.setItem("user", JSON.stringify(session));
    }
  }, [session, router]);

  useEffect(() => {
    if (path === "/" || path === "/subscription") {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScroll(true);
    }
  }, [path]);

  const navigateToAccount = () => {
    if (session || login) {
      router.push("/accountdetails");
    } else {
      setLoginModel(true);
    }
  };

  const navigateToCart = () => {
    if (session || login) {
      showCart(true);
    } else {
      setLoginModel(true);
    }
  };

  const handleSearchInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    const filtered = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(input.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setShowSuggestions(false);
    router.push(`/store?query=${encodeURIComponent(suggestion)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/store?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <nav
      className={`${
        scroll ? "bg-[#171717]" : "bg-[#090909] md:bg-transparent"
      } top-0 w-full p-[1.8vw] lg:p-[0.5vw] sm:p-[1.25vw] fixed z-50`}
    >
      <div
        className="flex items-center mx-auto justify-between max-w-screen-xl overflow-hidden"
        style={{ height: "60px" }}
      >
        <Link href={"/"}>
          <Image
            src={"/img/12.svg"}
            className="object-contain"
            width={300}
            height={120}
            alt="sonduck_logo"
          />
        </Link>
        <div className="lg:block hidden  sm:block">
          <div className="lg:flex sm:flex gap-[3vw]  text-[2vw] lg:text-[1vw] md:text-[1.5vw]">
            {filteredHeaderData?.map((item, ind) => (
              <div
                className={`relative ${path === item.link ? "text-[#FF387A]" : "text-[#FFFFFF]"} ${
                  path !== "/" && path !== "/subscription" ? "uppercase" : "capitalize"
                } group`}
                key={ind}
              >
                <Link href={item.link} className="relative z-10">
                  {item.title}
                </Link>
                {path === item.link && (
                  <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-[#FF387A]"></span>
                )}
                <span
                  className={`absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#FF387A] transition-all duration-300 group-hover:w-full`}
                ></span>
              </div>
            ))}
          </div>
        </div>

        {session || login || (path !== "/" && path !== "/subscription") ? (
          <div className="flex items-center gap-[0.3vw]">
            <section className="hidden lg:block relative">
              <form
                onSubmit={handleSearchSubmit}
                className="flex bg-[#262626] group hover:bg-white transition-all p-[0.35vw] lg:p-[0.45vw] rounded-md gap-[1vw] lg:w-[18vw]"
              >
                <IoSearchOutline size={25} className="group-hover:text-black text-white" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="bg-[#262626] group-hover:bg-white transition-all w-full focus:outline-none text-white hover:text-[#262626]"
                  placeholder="Search..."
                />
              </form>
            </section>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute 2xl:top-[3.3vw] 2xl:right-[25.5vw] xl:top-[4.7vw] xl:right-[11.8vw] lg:top-[5.5vw] md:top-[8.5vw] lg:right-[14.5vw] max-h-[4vw] scrollbar overflow-y-auto w-full lg:max-w-[18vw] bg-white rounded-md shadow-lg mt-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
            <div className="bg-[#262626] lg:mr-0 mr-5 relative p-2 rounded-lg cursor-pointer">
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 w-4 md:w-5 h-4 md:h-5 flex justify-center items-center ${
                    !cartDetail && "bg-[#FF387A]"
                  } rounded-full text-[10px] md:text-xs font-medium text-center text-white`}
                >
                  {cartDetail ? "" : cartCount}
                </span>
              )}
              <MdOutlineShoppingCart
                className="w-5 h-5 text-white hover:text-[#FF387A]"
                onClick={navigateToCart}
              />
            </div>
            <span className="lg:hidden" onClick={toggleSidebar}>
              <img src="/img/burger.png" alt="burger" />
            </span>
            <button
              onClick={navigateToAccount}
              className="relative px-4 py-2 w-fit rounded-lg hidden lg:flex items-center text-white gap-2 overflow-hidden group"
            >
              <div className="flex items-center gap-2 relative z-10">
                <FaUserCircle alt="profile icon" className=" text-white" size={25} />
                <span className="text-sm">
                  {login || session
                    ? logedUsername?.split(" ")[0] || userName?.split(" ")[0] || "Guest"
                    : "JOIN US"}
                </span>
              </div>
              <div className="absolute bg-[#262626] w-full h-full rounded-lg left-0 top-0"></div>
              <div className="absolute bg-[#FF387A] group-hover:w-full w-[0%] transition-all h-full rounded-lg left-0 top-0"></div>
            </button>
          </div>
        ) : (
          <div className="flex gap-[2vw]">
            <Button
              onClick={() => setLoginModel(true)}
              variant="text"
              style={{ textTransform: "capitalize" }}
              className="text-white text-sm md:text-base whitespace-nowrap"
            >
              Log <span className="ml-[0.3vw]">in</span>
            </Button>
            <CustomButton
              variant="outlined"
              className=" text-sm md:text-base px-6 py-2 rounded-md whitespace-nowrap hover:border-white"
              onClick={() => setSignupModel(true)}
            >
              Join us
            </CustomButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
