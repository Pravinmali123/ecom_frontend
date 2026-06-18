
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import Layout from "../Components/Layout.";

const Order = () => {

const [orders,setOrders] =
useState([]);

const navigate =
useNavigate();

const getorder =
async()=>{

try{

const token =
localStorage.getItem(
"token"
);

if(!token){

navigate(
"/login");

return;

}

const res =
await axios.get(

"https://ecom-backend-4mkw.onrender.com/order",

{

headers:{

authorization:
token

}

}

);

setOrders(
res.data.data
);

}

catch(error){

console.log(
error
);

if(
error.response?.status===401
){

navigate(
"/login"
);

}

}

};

useEffect(()=>{

getorder();

},[]);

return(

<Layout>

<div className="min-h-screen bg-gray-100 p-4 md:p-8">

<h1
className="text-3xl md:text-5xl font-bold text-center mb-10"
>

My Orders

</h1>

{

orders.length===0

?

(

<div
className="text-center mt-20"
>

<h1
className="text-2xl md:text-4xl text-gray-500 font-bold"
>

No Orders Found

</h1>

</div>

)

:

(

<div
className="max-w-7xl mx-auto space-y-8"
>

{

orders.map(
(item,index)=>(

<div

key={index}

className="bg-white rounded-3xl shadow-lg p-5"

>

<div
className="grid grid-cols-1 md:grid-cols-2 gap-5"
>

<div>

<h2 className="font-bold">

Payment ID

</h2>

<p>

{
item.payment_id
}

</p>

</div>

<div>

<h2 className="font-bold">

Delivery Status

</h2>

<span
className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
>

{
item.delivery_status
}

</span>

</div>

<div>

<h2 className="font-bold">

Name

</h2>

<p>

{
item.name
}

</p>

</div>

<div>

<h2 className="font-bold">

Email

</h2>

<p
className="break-all"
>

{
item.email
}

</p>

</div>

<div>

<h2 className="font-bold">

Mobile

</h2>

<p>

{
item.mo_no
}

</p>

</div>

<div>

<h2 className="font-bold">

Total Price

</h2>

<p
className="text-pink-600 text-2xl font-bold"
>

₹
{
item.total_price
}

</p>

</div>

</div>

<div
className="mt-5"
>

<h2
className="font-bold"
>

Address

</h2>

<p>

{
item.address
}

</p>

</div>

<hr
className="my-6"
/>

<h1
className="text-2xl font-bold mb-5"
>

Products

</h1>

<div
className="grid grid-cols-1 md:grid-cols-2 gap-5"
>

{

item.products?.map(
(p,i)=>(

<div

key={i}

className="border rounded-2xl p-5"

>

<h2
className="text-xl font-bold"
>

{
p.product_name
}

</h2>

<p>

Product ID :
{
p.productid
}

</p>

<p>

Quantity :
{
p.quantity
}

</p>

<p
className="text-pink-600 text-xl font-bold"
>

₹
{
p.price
}

</p>

</div>

)

)

}

</div>

</div>

)

)

}

</div>

)

}

</div>

</Layout>

);

};

export default Order;
