import React, { useEffect, useState } from "react";
import axios from "axios";

const Categarymanagemant = () => {

  const [categary, setcategary] = useState([]);
  const [editId, setEditId] = useState(null);

  const [category, setCategory] = useState({
    categary: "",
    image: "",
  });

  // ================= GET CATEGORY =================

  const getcategary = async () => {

    try {

      const res = await axios.get(
        "https://ecom-backend-4mkw.onrender.com/cat"
      );

      console.log(res.data);

      setcategary(res.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getcategary();

  }, []);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {

      setCategory({
        ...category,
        image: files[0],
      });

    } else {

      setCategory({
        ...category,
        [name]: value,
      });

    }

  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("categary", category.categary);
      formData.append("image", category.image);

      // EDIT
      if (editId) {

        await axios.patch(
          `https://ecom-backend-4mkw.onrender.com/cat/editcategary/${editId}`,
          formData
        );

        alert("Category Updated Successfully");

      } else {

        // ADD
        await axios.post(
          "https://ecom-backend-4mkw.onrender.com/cat/postcategary",
          formData
        );

        alert("Category Added Successfully");

      }

      // Refresh Data
      getcategary();

      // Reset Form
      setCategory({
        categary: "",
        image: "",
      });

      setEditId(null);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= DELETE =================

  const deletecategary = async (id) => {

    try {

      await axios.delete(
        `https://ecom-backend-4mkw.onrender.com/cat/deletecategary/${id}`
      );

      alert("Category Deleted Successfully");

      getcategary();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= EDIT =================

  const editcategary = (item) => {

    setCategory({

      categary: item.categary,
      image: "",

    });

    setEditId(item._id);

  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* ================= FORM ================= */}

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-8 text-center">

          Category Management

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Category Name */}

          <div>

            <label className="block mb-2 font-semibold">

              Category Name

            </label>

            <input
              type="text"
              name="categary"
              value={category.categary}
              onChange={handleChange}
              placeholder="Enter Category Name"
              className="w-full border p-3 rounded-lg"
              required
            />

          </div>

          {/* Category Image */}

          <div>

            <label className="block mb-2 font-semibold">

              Category Image

            </label>

            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold duration-300"
          >

            {editId ? "Update Category" : "Add Category"}

          </button>

        </form>

      </div>

      {/* ================= TABLE ================= */}

      <div className="mt-12 overflow-x-auto">

        <h1 className="text-3xl font-bold text-center mb-6">

          Category Table

        </h1>

        <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">

          <thead className="bg-pink-500 text-white">

            <tr>

              <th className="p-4">Image</th>

              <th className="p-4">Category</th>

              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {categary.length > 0 ? (

              categary.map((item) => (

                <tr
                  key={item._id}
                  className="border-b text-center hover:bg-gray-100"
                >

                  {/* Image */}

                  <td className="p-4">

                    <img
                      src={`https://ecom-backend-4mkw.onrender.com/images/${item.image}`}
                      alt=""
                      className="w-20 h-20 object-cover rounded-lg mx-auto"
                    />

                  </td>

                  {/* Category */}

                  <td className="p-4 font-semibold">

                    {item.categary}

                  </td>

                  {/* Buttons */}

                  <td className="p-4 flex justify-center gap-3">

                    <button
                      onClick={() => editcategary(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() => deletecategary(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="3"
                  className="text-center py-10 text-gray-500 text-xl"
                >

                  No Category Found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Categarymanagemant;