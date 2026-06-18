import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import Layout from "../Components/Layout.";

const Cart = () => {

const [cart,setCart] =
useState([]);

const navigate =
useNavigate();

const token =
localStorage.getItem(
"token"
);

const getCart =
async()=>{

try{

if(!token){

navigate("/login");

return;

}

const res =
await axios.get(

"https://ecom-backend-4mkw.onrender.com/cart",

{

headers:{

authorization:
token

}

}

);

setCart(
res.data.data
);

}

catch(error){

console.log(
error
);

navigate(
"/login"
);

}

};

useEffect(()=>{

getCart();

},[]);

const updateQuantity =
async(
id,
quantity
)=>{

try{

if(
quantity<1
)return;

await axios.patch(

`https://ecom-backend-4mkw.onrender.com/cart/updatecart/${id}`,

{

quantity

},

{

headers:{

authorization:
token

}

}

);

getCart();

}

catch(error){

console.log(
error
);

}

};

const removeCart =
async(id)=>{

try{

await axios.delete(

`https://ecom-backend-4mkw.onrender.com/cart/deletecart/${id}`,

{

headers:{

authorization:
token

}

}

);

alert(
"Product Removed"
);

getCart();

}

catch(error){

console.log(
error
);

}

};

const totalPrice =
cart.reduce(

(total,item)=>

total+
item.price*
item.quantity,

0

);

const totalItems =
cart.reduce(

(total,item)=>

total+
item.quantity,

0

);

return(

<Layout>

<div className="min-h-screen bg-gray-100 p-5">

<h1
className="text-4xl font-bold text-center mb-10"
>

Shopping Cart

</h1>

{

cart.length===0

?

(

<div
className="text-center mt-20"
>

<h1
className="text-3xl font-bold"
>

Cart Is Empty

</h1>

</div>

)

:

(

<div
className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8"
>

<div
className="lg:col-span-2 space-y-5"
>

{

cart.map(
(item)=>(

<div

key={
item._id
}

className="bg-white rounded-xl p-4 shadow flex gap-5 items-center"

>

<img

src={`https://ecom-backend-4mkw.onrender.com/images/${item.Image}`}

className="w-24 h-24 rounded"

alt=""

/>

<div>

<h1
className="text-xl font-bold"
>

{
item.product_name
}

</h1>

<p>

{
item.description
}

</p>

<h2>

₹
{
item.price
}

</h2>

<div
className="flex gap-4 mt-3"
>

<button

onClick={()=>{

updateQuantity(

item._id,

item.quantity-1

)

}}

>

-

</button>

<span>

{
item.quantity
}

</span>

<button

onClick={()=>{

updateQuantity(

item._id,

item.quantity+1

)

}}

>

+

</button>

</div>

</div>

<button

onClick={()=>{

removeCart(
item._id
)

}}

className="bg-red-500 text-white px-4 py-2"

>

Remove

</button>

</div>

)

)

}

</div>

<div
className="bg-white p-6 rounded-xl"
>

<h1
className="text-3xl"
>

Order Summary

</h1>

<p>

Items :

{
totalItems
}

</p>

<p>

Price :

₹
{
totalPrice
}

</p>

<button

className="w-full bg-pink-500 text-white py-4 rounded mt-5"

onClick={()=>{

if(!token){

alert(
"Please Login First"
);

navigate(
"/login"
);

return;

}

navigate(

"/Buy",

{

state:cart

}

);

}}

>

Buy Now

</button>

</div>

</div>

)

}

</div>

</Layout>

);

};

export default Cart;