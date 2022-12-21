import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
      <div className="flex gap-3 flex-1 justify-start items-center w-full px-2 border-none outline-none ">
        <IoMdSearch
          fontSize={25}
          onClick={(e) => setSearchTerm(e.target.value)}
          className="ml-1 cursor-pointer"
        />
        <input
          type="text"
          placeholder="Search"
          className=" w-full border-2 border-gray-300 p-3 outline-none focus:border-gray-400 transition-all duration-150 ease-in-out  focus-within:shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => navigate("/search")}
        />
      </div>

      <div className="flex gap-3">
        <Link to={`/user-profile/${user?._id}`} className="hidden md:block">
          <img
            src={user.image}
            alt={user.userName}
            className="w-12 h-12 rounded-sm"
          />
        </Link>
        <Link
          to="create-pin"
          className="bg-black text-white rounded-sm w-12 h-12 md:w-13 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd fontSize={25} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
