// import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const ini = {
      email : "",
      password : ""
    }
  const navigate = useNavigate();

  const handlesubmit = async (values, { resetForm }) => {

    console.log("values ==> ",values);
    
  if (!values.email || !values.password) {
    alert("Fill up data");
    return;
  }

  try {
    const res = await axios.post("https://ecom-backend-4mkw.onrender.com/login/postlogin", values);  
    console.log("res ==> ",res)

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.data));

    alert("Login Successful ");


    // Admin Check
    if (
      values.email === "pravinmali24899@gmail.com" &&
      values.password === "123456"
    ) {

      navigate("/dashbord");

    } else {

      navigate("/");
    }

    resetForm();
  

  } catch (error) {
    console.log(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Server error");
    }
  }
};



  return (
     <div className="flex justify-center items-center h-screen">
      <div className="w-80 border p-5 rounded shadow">

      <h2 className="text-xl mb-4">Login</h2>

      <Formik initialValues={ini} onSubmit={handlesubmit}>
        <Form className="flex flex-col gap-3">
          <Field name="email" placeholder="Enter your email"
              className="border p-2" />
          {/* <br /><br /> */}

          <Field name="password" type="password" placeholder="Enter Password"
              className="border p-2" />
          {/* <br /><br /> */}

          <button type="submit"  className="bg-pink-500 text-white p-2">Submit</button>
          <p className="text-sm">Don't have an account?<Link to="/register"  className="text-blue-600">Signup</Link></p>
        </Form>
        
      </Formik>
    </div>
    </div>
  );
};

export default Login;
