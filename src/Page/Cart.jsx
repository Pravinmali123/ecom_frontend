
import React,{
useEffect,
useState
}
from "react";

import axios
from "axios";

import {
useNavigate
}
from "react-router-dom";

import Layout
from "../Components/Layout.";

const Cart = ()=>{

const [
cart,
setCart
]=
useState([]);

const navigate =
useNavigate();

const getCart =
async()=>{

try{

const token =
localStorage.getItem(
"token"
);

if(!token){

navigate(
"/login"
);

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

const token =
localStorage.getItem(
"token"
);

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

const token =
localStorage.getItem(
"token"
);

await axios.delete(

`https://ecom-backend-4mkw.onrender.com/cart/deletecart/${id}`,

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

<div className="min-h-screen bg-gray-100 p-4 md:p-8">

<h1
className="text-3xl md:text-5xl font-bold text-center mb-10"
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
className="text-2xl md:text-4xl text-gray-500"
>

Cart Is Empty

</h1>

</div>

)

:

(

<div
className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
>

<div
className="lg:col-span-2 space-y-5"
>

{

cart.map(
(item)=>(

<div

key={item._id}

className="bg-white rounded-3xl shadow p-4 flex flex-col md:flex-row gap-5"

>

<img

src={`https://ecom-backend-4mkw.onrender.com/images/${item.Image}`}

alt=""

className="w-full md:w-40 h-40 object-cover rounded-2xl"

/>

<div
className="flex-1"
>

<h1
className="text-xl md:text-2xl font-bold"
>

{
item.product_name
}

</h1>

<p
className="text-gray-500 mt-2"
>

{
item.description
}

</p>

<h2
className="text-pink-600 text-2xl font-bold mt-3"
>

₹
{
item.price
}

</h2>

<div
className="flex items-center gap-5 mt-5"
>

<button

className="bg-red-500 text-white w-10 h-10 rounded-full"

onClick={()=>{

updateQuantity(

item._id,

item.quantity-1

)

}}

>

-

</button>

<span
className="text-xl"
>

{
item.quantity
}

</span>

<button

className="bg-green-500 text-white w-10 h-10 rounded-full"

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

className="
bg-red-500
hover:bg-red-600
text-white
px-3
py-2
md:px-4
md:py-2
text-sm
rounded-lg
h-fit
self-start
"

onClick={()=>{

removeCart(
item._id
)

}}

>

Remove

</button>

</div>

)

)

}

</div>

<div
className="bg-white rounded-3xl shadow p-6 h-fit sticky top-28"
>

<h1
className="text-3xl font-bold mb-6"
>

Order Summary

</h1>

<div
className="flex justify-between mb-4"
>

<span>

Items

</span>

<span>

{
totalItems
}

</span>

</div>

<div
className="flex justify-between mb-6"
>

<span>

Total

</span>

<span
className="text-pink-600 text-2xl font-bold"
>

₹
{
totalPrice
}

</span>

</div>

<button

className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl"

onClick={()=>{

const token =
localStorage.getItem(
"token"
);

if(!token){

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