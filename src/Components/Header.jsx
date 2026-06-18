import React, {
  useState,
  useEffect,
  useContext
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import logo from "../assets/logo.png";

import MyContext from "../context/MyContext";

const Header = () => {

const {
setSearch
} =
useContext(
MyContext
);

const navigate =
useNavigate();

const [input,setInput] =
useState("");

const [open,setOpen] =
useState(false);

const [cartCount,setCartCount] =
useState(0);

const [token,setToken] =
useState(

localStorage.getItem(
"token"
)

);

const handlelogout =
()=>{

localStorage.removeItem(
"token"
);

localStorage.removeItem(
"user"
);

setToken(
null
);

setCartCount(
0
);

navigate(
"/"
);

};

const getCartCount =
async()=>{

try{

const currentToken =
localStorage.getItem(
"token"
);

if(
!currentToken
){

setCartCount(
0
);

return;

}

const res =
await axios.get(

"https://ecom-backend-4mkw.onrender.com/cart",

{

headers:{

authorization:
currentToken

}

}

);

const total =
res.data.data.reduce(

(sum,item)=>

sum+
item.quantity,

0

);

setCartCount(
total
);

}

catch(error){

if(

error.response?.status===401

){

localStorage.removeItem(
"token"
);

localStorage.removeItem(
"user"
);

setToken(
null
);

setCartCount(
0
);

return;

}

console.log(
error
);

}

};

useEffect(()=>{

const currentToken =
localStorage.getItem(
"token"
);

setToken(
currentToken
);

if(
currentToken
){

getCartCount();

}

else{

setCartCount(
0
);

}

},[]);

return(

<nav className="bg-white shadow-md sticky top-0 z-50">

<div className="flex justify-between items-center px-6 py-2">

<img
src={logo}
alt="logo"
className="h-10"
/>

<ul className="hidden md:flex gap-10">

<li>
<Link to="/">
Home
</Link>
</li>

<li>
<Link to="/order">
Order
</Link>
</li>

<li>
<Link to="/cart">
Cart
</Link>
</li>

</ul>

<div className="hidden md:flex w-1/3">

<input

type="text"

placeholder="Search"

value={input}

onChange={(e)=>{

setInput(
e.target.value
)

}}

className="w-full border px-3 py-2"

/>

<button

onClick={()=>{

setSearch(
input
)

}}

className="bg-pink-500 text-white px-4"

>

Search

</button>

</div>

<div className="hidden md:flex items-center gap-5">

{

token

?

(

<button

onClick={
handlelogout
}

className="bg-pink-500 text-white px-4 py-2"

>

Logout

</button>

)

:

(

<Link

to="/login"

className="bg-pink-500 text-white px-4 py-2"

>

Login

</Link>

)

}

<Link
to="/cart"
className="relative"
>

🛒

<span
className="absolute -top-2 -right-3 bg-green-500 text-white px-2 rounded-full"
>

{
cartCount
}

</span>

</Link>

</div>

<button

className="md:hidden"

onClick={()=>{

setOpen(
!open
)

}}

>

{

open

?

"✖"

:

"☰"

}

</button>

</div>

{

open && (

<div className="md:hidden px-6 py-4">

<Link
to="/"
>

Home

</Link>

<br/>

<Link
to="/order"
>

Order

</Link>

<br/>

<Link
to="/cart"
>

Cart

</Link>

</div>

)

}

</nav>

);

};

export default Header;