import { Formik, Form, Field } from "formik";

import axios from "axios";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import { useRazorpay }
from "react-razorpay";

const Buy = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const { error, isLoading, Razorpay }
    = useRazorpay();

  const products = location.state || [];

  const totalPrice = products.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const ini = {

    name: "",

    email: "",

    mo_no: "",

    address: ""

  };

  // MAIN SUBMIT
  const handlesubmit = async (
    values,
    { resetForm }
  ) => {

    try {

      const options = {

        key: "rzp_test_S5iwtFr5Ws0PGC",

        amount: totalPrice * 100,

        currency: "INR",

        name: "ecommerce web",

        description: "Order Payment",

        handler: async function (response) {

          console.log(response);

          // FINAL ORDER DATA
          const finalData = {

            payment_id:
              response.razorpay_payment_id,

            name: values.name,

            email: values.email,

            mo_no: values.mo_no,

            address: values.address,

            total_price: totalPrice,

            delivery_status:
              "Processing",

            products:
              products.map((item) => ({

                productid: item._id,

                product_name:
                  item.product_name,

                quantity:
                  item.quantity,

                price:
                  item.price

              }))

          };

          // SAVE ORDER
          const res = await axios.post(
            "https://ecom-backend-4mkw.onrender.com/order/postorder",
            finalData
          );

          console.log(res.data);

          alert("Payment Successful");

          resetForm();

          navigate("/order");

        },

        theme: {
          color: "#F37254",
        },

      };

      const razorpayInstance =
        new Razorpay(options);

      razorpayInstance.open();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-5">

          Buy Details

        </h2>

        {
          products.map((item) => (

            <div
              key={item._id}
              className="border rounded-lg p-3 mb-4"
            >

              <div className="mt-3">

                <h1 className="text-2xl font-bold text-black">

                  {item.product_name}

                </h1>

                <p className="text-gray-500 mt-1">

                  Quantity :
                  {item.quantity}

                </p>

                <h2 className="text-pink-500 text-2xl font-bold mt-2">

                  ₹ {item.price}

                </h2>

              </div>

            </div>
          ))
        }

        <div className="text-center mb-5">

          <h1 className="text-3xl font-bold text-green-600">

            Total : ₹ {totalPrice}

          </h1>

        </div>

        <Formik
          initialValues={ini}
          onSubmit={handlesubmit}
        >

          <Form className="flex flex-col gap-4">

            <Field
              name="name"
              placeholder="Enter Name"
              className="border p-3 rounded"
              required
            />

            <Field
              name="email"
              type="email"
              placeholder="Enter Email"
              className="border p-3 rounded"
              required
            />

            <Field
              name="mo_no"
              placeholder="Enter Mobile Number"
              className="border p-3 rounded"
              required
            />

            <Field
              name="address"
              as="textarea"
              placeholder="Enter Address"
              className="border p-3 rounded"
              required
            />

            <div>

              {
                isLoading
              }

              {
                error &&
                <p>
                  Error :
                  {error}
                </p>
              }

              <button
                type="submit"
                className="bg-pink-500 text-white p-3 rounded-lg text-lg font-bold"
              >

                Pay Now

              </button>

            </div>

          </Form>

        </Formik>

      </div>

    </div>
  );
};

export default Buy;