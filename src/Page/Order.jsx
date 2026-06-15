import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Layout from "../Components/Layout.";

const Order = () => {

  const [orders, setOrders] =
    useState([]);

  // GET ORDER DATA
  const getorder = async () => {

    try {

      const res = await axios.get(
        "https://ecom-backend-4mkw.onrender.com/order"
      );

      console.log(res.data);

      setOrders(res.data.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    getorder();

  }, []);

  return (

    <Layout>

      <div className="p-5">

        <h1 className="text-4xl font-bold text-center mb-10">

          My Orders

        </h1>

        {
          orders.length === 0 ? (

            <h1 className="text-center text-2xl">

              No Orders Found

            </h1>

          ) : (

            orders.map((item, index) => (

              <div
                key={index}
                className="border rounded-xl shadow-lg p-5 mb-8 bg-white"
              >

                {/* ORDER DETAILS */}

                <div className="mb-5">

                  <h2 className="text-xl font-bold text-green-600">

                    Payment ID :
                    {item.payment_id}

                  </h2>

                  <h2 className="text-lg mt-2">

                    Name :
                    {item.name}

                  </h2>

                  <h2 className="text-lg mt-2">

                    Email :
                    {item.email}

                  </h2>

                  <h2 className="text-lg mt-2">

                    Mobile :
                    {item.mo_no}

                  </h2>

                  <h2 className="text-lg mt-2">

                    Address :
                    {item.address}

                  </h2>

                  <h2 className="text-lg mt-2 font-bold text-pink-600">

                    Total Price :
                    ₹ {item.total_price}

                  </h2>

                  <h2 className="text-lg mt-2">

                    Delivery Status :

                    <span className="text-blue-600 font-bold">

                      {" "}
                      {item.delivery_status}

                    </span>

                  </h2>

                </div>

                <hr className="mb-5" />

                {/* PRODUCTS */}

                <h1 className="text-2xl font-bold mb-5">

                  Products

                </h1>

                {
                  item.products.map((p, i) => (

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
                  ))
                }

              </div>
            ))
          )
        }

      </div>

    </Layout>
  );
};

export default Order;