import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Back = ({ destination = "/" }) => {
  return (
    <div className="flex ">
      <Link
        className="flex text-white justify-center my-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        to={destination}
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default Back;
