import React from "react";
import { FaSearchengin } from "react-icons/fa6";

const SearchInput = () => {
  return (
    <>
      <form className="flex items-center gap-2">
        <input
          type="text"
          className="input input-bordered rounded-full bg-gray-200 dark:bg-gray-200 text-black"
          placeholder="Yash Shrestha"
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <FaSearchengin size={20} />
        </button>
      </form>
    </>
  );
};

export default SearchInput;
