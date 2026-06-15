import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";

import MyContext from "../context/MyContext";
const Category = () => {
  const { setSelectedCategory } = useContext(MyContext);

  const [categories, setCategories] = useState([]);

  // Get Category
  const getCategory = async () => {

    try {

      const res = await axios.get(
        "https://ecom-backend-4mkw.onrender.com/cat"
      );

      setCategories(res.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getCategory();

  }, []);

  return (

    <div className="py-5 px-3 bg-gray-100 text-center">

      <h1 className="text-4xl font-bold mb-10">

        Product Categories

      </h1>

      <div className="flex flex-wrap justify-center gap-6">

        {categories.map((item) => (

          <div
            key={item._id}
            onClick={() => setSelectedCategory(item.categary)}
            className="flex flex-col items-center cursor-pointer"
          >

            <img
              src={`https://ecom-backend-4mkw.onrender.com/images/${item.image}`}
              alt={item.categary}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-pink-400"
            />

            <h2 className="text-xs sm:text-sm md:text-lg font-semibold mt-2">

              {item.categary}

            </h2>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Category;