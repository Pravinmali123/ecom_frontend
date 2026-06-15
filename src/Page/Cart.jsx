// Cart.jsx


import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from '../Components/Layout.'

const Cart = () => {
  const [cart, setCart] = useState([]);
const navigate = useNavigate();


  const updateQuantity = async (id, quantity) => {
  try {

    if (quantity < 1) return;

    await axios.patch(
      `https://ecom-backend-4mkw.onrender.com/cart/updatecart/${id}`,
      { quantity }
    );

    getCart();

  } catch (error) {
    console.log(error);
  }
};

  const getCart = async () => {

    try {

      const res = await axios.get(
        "https://ecom-backend-4mkw.onrender.com/cart"
      );

      console.log(res.data);

      setCart(res.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getCart();

  }, []);


  const removeCart = async (id) => {

    try {

      await axios.delete(
        `https://ecom-backend-4mkw.onrender.com/cart/deletecart/${id}`
      );

      alert("Product Removed From Cart");

      getCart();

    } catch (error) {

      console.log(error);

    }

  };

const totalPrice = cart.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
);

const totalItems = cart.reduce(
  (total, item) => total + item.quantity,
  0
);
  return (
<Layout>

    <div className="min-h-screen bg-gray-100 p-5">


      <h1 className="text-4xl font-bold text-center mb-10">

        Shopping Cart

      </h1>


      {cart.length === 0 ? (

        <div className="text-center mt-20">

          <h1 className="text-3xl font-bold text-gray-500">

            Cart Is Empty

          </h1>

        </div>

      ) : (

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

     

          <div className="lg:col-span-2 space-y-5">

            {cart.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md p-2 flex flex-col md:flex-row gap-5 items-center"
              >

             

                <img
                  src={`https://ecom-backend-4mkw.onrender.com/images/${item.Image}`}
                  alt=""
                  className="w-20 h-20 object-cover rounded-xl"
                />

            

                <div className="flex justify-center items-center gap-3 flex-wrap">

                  <h2 className="text-2xl font-bold">

                    {item.product_name}

                  </h2>
                
               <button
  className="text-red-700 text-3xl"
  onClick={() =>
    updateQuantity(item._id, item.quantity - 1)
  }
>
  -
</button>

[{item.quantity}]

<button
  className="text-green-700 text-2xl"
  onClick={() =>
    updateQuantity(item._id, item.quantity + 1)
  }
>
  +
</button>
                 
                  <p className="text-gray-500 mt-2">

                    {item.description}

                  </p>

                  <h3 className="text-pink-500 text-2xl font-bold mt-3">

                    ₹ {item.price}

                  </h3>

                </div>

               

                <button
                  onClick={() => removeCart(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                >

                  Remove

                </button>

                      {/* <button
                  // onClick={() => BuyCart(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
                >

                  Buy

                </button> */}

              </div>

            ))}

          </div>

       

          <div className="bg-white rounded-2xl shadow-md p-6 h-fit">

            <h1 className="text-3xl font-bold mb-6">

              Order Summary

            </h1>

            <div className="flex justify-between text-lg mb-4">

              <span>Total Items</span>

             <span>{totalItems}</span>

            </div>

            <div className="flex justify-between text-lg mb-6">

              <span>Total Price</span>

         <span className="font-bold text-pink-500">
  ₹ {totalPrice}
</span>

            </div>

            <button    onClick={() =>
    navigate("/Buy", {
      state: cart
    })
  }
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl text-lg font-semibold"
            >

              By now

            </button>

          </div>

        </div>

      )}

    </div>
</Layout>

  );

};

export default Cart;