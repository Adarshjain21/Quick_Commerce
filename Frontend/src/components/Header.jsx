import React, { useState } from "react";
import logo from "../assets/Quick_Commerce_logo.png";
import Search from "./Search.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile.jsx";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu.jsx";

const Header = () => {
  const [isMobile] = useMobile();

  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);

  const [openUserMenu, setOpenUserMenu] = useState(false);

  // console.log("user from store", user);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobieUser =() => {
    if(!user._id){
      navigate('/login')
      return
    }

    navigate('/user')
  }

  return (
    <header className="h-[120px] md:h-20 shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-white px-6">
      {!(isSearchPage && isMobile) && (
        <div className="flex justify-between items-center px-5">
          {/* logo */}
          <Link to={"/"} className="h-full flex items-center">
            <img
              src={logo}
              alt="logo"
              width={170}
              className="hidden lg:block"
            />
            <img src={logo} alt="logo" width={140} className="lg:hidden" />
          </Link>

          {/* search */}
          <div className="hidden md:block lg:block">
            <Search />
          </div>

          {/* login and my cart */}
          <div className="">
            <button className="text-neutral-600 lg:hidden" onClick={handleMobieUser}>
              <FaUserCircle size={32} />
            </button>
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex items-center select-none gap-1 cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {
                    openUserMenu && (
                      <div className="absolute right-0 top-12">
                    <div className="bg-white rounded p-4 min-w-52 shadow-lg">
                      <UserMenu close={handleCloseUserMenu}/>
                    </div>
                  </div>
                    )
                  }
                  
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px-2">
                  Login
                </button>
              )}
              <button className="flex items-center gap-2 bg-green-500 px-3 py-3 rounded-lg text-white hover:bg-green-600">
                <div className="animate-bounce">
                  <div>
                    <BsCart4 size={25} />
                  </div>
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 md:hidden lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
