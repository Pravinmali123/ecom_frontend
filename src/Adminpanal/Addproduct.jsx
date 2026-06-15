import React, { useEffect, useState } from "react";
import axios from "axios";

const Addproduct = () => {

  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [product, setProduct] = useState({

    product_name: "",
    price: "",
    category: "",
    stock: "",
    Image: "",
    // rating: "",
    description: ""

  });

  // ================= GET PRODUCTS =================

  const getProducts = async () => {

    try {

      const res = await axios.get(
        "https://ecom-backend-4mkw.onrender.com/product"
      );

      setProducts(res.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getProducts();

  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    if (e.target.type === "file") {

      setProduct({
        ...product,
        [e.target.name]: e.target.files[0]
      });

    } else {

      setProduct({
        ...product,
        [e.target.name]: e.target.value
      });

    }

  };

  // ================= ADD & UPDATE =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("product_name", product.product_name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("stock", product.stock);
      // formData.append("rating", product.rating);
      formData.append("description", product.description);

     
      if (product.Image) {

        formData.append("Image", product.Image);

      }

      // ================= UPDATE =================

      if (editId) {

        await axios.patch(
          `https://ecom-backend-4mkw.onrender.com/product/editproduct/${editId}`,
          formData
        );

        alert("Product Updated Successfully");

      }

      // ================= ADD =================

      else {

        await axios.post(
          "https://ecom-backend-4mkw.onrender.com/product/postproduct",
          formData
        );

        alert("Product Added Successfully");

      }
      getProducts();
      setProduct({

        product_name: "",
        price: "",
        category: "",
        stock: "",
        Image: "",
        // rating: "",
        description: ""

      });

      setEditId(null);

    } catch (error) {

      console.log(error);

      alert("Something Went Wrong");

    }

  };

  // ================= DELETE =================

  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `https://ecom-backend-4mkw.onrender.com/product/deleteproduct/${id}`
      );

      alert("Product Deleted");

      getProducts();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= EDIT =================

  const editProduct = (item) => {

    setProduct({

      product_name: item.product_name,
      price: item.price,
      category: item.category,
      stock: item.stock,
      Image: "",
      // rating: item.rating,
      description: item.description

    });

    setEditId(item._id);

  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* ================= FORM ================= */}

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-8 text-center">

          {editId ? "Update Product" : "Add Product"}

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Product Name */}

          <div>

            <label className="block mb-2 font-semibold">

              Product Name

            </label>

            <input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border p-3 rounded-lg"
              required
            />

          </div>

          {/* Price */}

          <div>

            <label className="block mb-2 font-semibold">

              Price

            </label>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full border p-3 rounded-lg"
              required
            />

          </div>

          {/* Category */}

          <div>

            <label className="block mb-2 font-semibold">

              Category

            </label>

            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full border p-3 rounded-lg"
              required
            />

          </div>

          {/* Stock */}

          <div>

            <label className="block mb-2 font-semibold">

              Stock

            </label>

            <input
              type="text"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Enter stock"
              className="w-full border p-3 rounded-lg"
              required
            />

          </div>

          {/* Image */}

          <div>

            <label className="block mb-2 font-semibold">

              Product Image

            </label>

            <input
              type="file"
              name="Image"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

          </div>

          {/* Rating */}

          {/* <div>

            <label className="block mb-2 font-semibold">

              Rating

            </label>

            <input
              type="text"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              placeholder="Enter rating"
              className="w-full border p-3 rounded-lg"
              required
            />

          </div> */}

          {/* Description */}

          <div>

            <label className="block mb-2 font-semibold">

              Description

            </label>

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="5"
              className="w-full border p-3 rounded-lg"
              required
            ></textarea>

          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold duration-300"
          >

            {editId ? "Update Product" : "Add Product"}

          </button>

        </form>

      </div>

      {/* ================= PRODUCT TABLE ================= */}

      <div className="mt-12 overflow-x-auto">

        <h1 className="text-3xl font-bold text-center mb-6">

          Product Table

        </h1>

        <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">

          <thead className="bg-pink-500 text-white">

            <tr>

              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
              {/* <th className="p-4">Rating</th> */}
              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {products.map((item) => (

              <tr
                key={item._id}
                className="border-b text-center hover:bg-gray-100"
              >

                {/* Image */}

                <td className="p-4">

                  <img
                    src={`https://ecom-backend-4mkw.onrender.com/images/${item.Image}`}
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg mx-auto"
                  />

                </td>

                {/* Name */}

                <td className="p-4 font-semibold">

                  {item.product_name}

                </td>

                {/* Price */}

                <td className="p-4 text-pink-500 font-bold">

                  ₹ {item.price}

                </td>

                {/* Category */}

                <td className="p-4">

                  {item.category}

                </td>

                {/* Stock */}

                <td className="p-4">

                  {item.stock}

                </td>

                {/* Rating */}

                <td className="p-4">

                  ⭐ {item.rating}

                </td>

                {/* Buttons */}

                <td className="p-4 flex justify-center gap-3">

                  <button
                    onClick={() => editProduct(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Addproduct;