import React, {
  useEffect,
  useState,
  // useContext
} from "react";
// import MyContext from "../context/MyContext";

import axios from "axios";

const Ordermanagemant = () => {
//  const { setSearch } = useContext(MyContext);
  const [input, setInput] = useState("");
  const [orders, setOrders] =
    useState([]);

  // GET ORDERS
const getorder = async () => {
  try {
    const res = await axios.get(
      `https://ecom-backend-4mkw.onrender.com/order?search=${input}`
    );

    setOrders(res.data.data);
  } catch (error) {
    console.log(error);
  }
};

  // DELETE ORDER
  const deleteOrder = async (id) => {

    try {

      await axios.delete(
        `https://ecom-backend-4mkw.onrender.com/order/deleteorder/${id}`
      );

      alert("Order Deleted");

      getorder();

    } catch (error) {

      console.log(error);

    }

  };

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.patch(
        `https://ecom-backend-4mkw.onrender.com/order/editorder/${id}`,
        {
          delivery_status: status
        }
      );

      getorder();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getorder();

  }, []);

  return (

    <div className="p-5">

      <h1 className="text-4xl font-bold text-center mb-10">

        Orders Management

      </h1>

 <div className="mb-5 flex items-center gap-2">

  <input
    type="text"
    name="product_name"
    placeholder="Enter Order Search..."
    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-pink-400"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        getorder();
      }
    }}
  />

  <button
    onClick={getorder}
    className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
  >
    Search
  </button>

</div>

      {
        orders.length === 0 ? (

          <h1 className="text-center text-2xl">

            No Orders Found

          </h1>

        ) : (

          orders.map((item) => (
            

            <div
              key={item._id}
              className="border rounded-xl shadow-lg p-5 mb-8 bg-red-100"
            >

              {/* ORDER DETAILS */}

              <div className="mb-5">

                <h2 className="text-xl font-bold text-green-600">

                  Payment ID :
                  {item.payment_id}

                </h2>

                <h2 className="mt-2">

                  Name :
                  {item.name}

                </h2>

                <h2 className="mt-2">

                  Email :
                  {item.email}

                </h2>

                <h2 className="mt-2">

                  Mobile :
                  {item.mo_no}

                </h2>

                <h2 className="mt-2">

                  Address :
                  {item.address}

                </h2>

                <h2 className="mt-2 font-bold text-pink-600">

                  Total Price :
                  ₹ {item.total_price}

                </h2>

                <div className="mt-3">

                  <h2 className="font-bold mb-2">

                    Delivery Status

                  </h2>

                  <select
                    value={item.delivery_status}
                    onChange={(e) =>
                      updateStatus(
                        item._id,
                        e.target.value
                      )
                    }
                    className="border p-2 rounded"
                  >

                    <option>
                      Processing
                    </option>

                    <option>
                      Shipped
                    </option>

                    <option>
                      Out for Delivery
                    </option>

                    <option>
                      Delivered
                    </option>

                    <option>
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>

              <hr className="mb-5" />

              {/* PRODUCTS */}

              <h1 className="text-2xl font-bold mb-5">

                Products

              </h1>

              {
                item.products?.map(
                  (p, i) => (

                    <div
                      key={i}
                      className="border rounded-lg p-4 mb-4"
                    >

                      <h2 className="text-xl font-bold">

                        Product Name :
                        {p.product_name}

                      </h2>

                      <h2 className="mt-2">

                        Product ID :
                        {p.productid}

                      </h2>

                      <h2 className="mt-2">

                        Quantity :
                        {p.quantity}

                      </h2>

                      <h2 className="mt-2 text-pink-600 font-bold">

                        Price :
                        ₹ {p.price}

                      </h2>

                    </div>

                  )
                )
              }

              {/* ACTION BUTTON */}

              <button
                onClick={() =>
                  deleteOrder(item._id)
                }
                className="bg-red-500 text-white px-5 py-2 rounded mt-3"
              >

                Delete Order

              </button>

            </div>

          ))
        )
      }

    </div>

  );
};

export default Ordermanagemant;