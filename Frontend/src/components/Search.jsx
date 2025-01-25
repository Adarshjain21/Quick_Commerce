import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { FaArrowLeft } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation()
  const searchText = params.search.slice(3)  

  useEffect(() => {
    const page = location.pathname === "/search";
    setIsSearchPage(page);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value
    const url = `/search?q=${value}`
    navigate(url)
  }

  return (
    <div className="w-full min-w-[300px] md:min-w-[420px] lg:min-w-[500px] h-10 lg:h-12 rounded-lg border border-gray-300 overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
      <div>
        {isSearchPage && isMobile ? (
          <Link to={"/"} className="flex justify-center items-center h-full p-1 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-4 group-focus-within:text-primary-200">
            <IoSearch size={20} />
          </button>
        )}
      </div>
      <div className="w-full h-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="h-full w-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "bread"',
                1000,
                'Search "cheese"',
                1000,
                'Search "sugar"',
                1000,
                'Search "rice"',
                1000,
                'Search "Eggs"',
                1000,
                'Search "chips"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for dal chawal and more"
              className="bg-transparent w-full h-full outline-none"
              autoFocus
              onChange={handleOnChange}
              defaultValue={searchText}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
