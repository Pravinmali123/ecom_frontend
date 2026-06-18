
import { Formik, Form, Field } from "formik";

import axios from "axios";

import {
useNavigate,
useLocation
}
from "react-router-dom";

import {
useRazorpay
}
from "react-razorpay";

const Buy = ()=>{

const location =
useLocation();

const navigate =
useNavigate();

const {
error,
isLoading,
Razorpay
}
=
useRazorpay();

const products =
location.state
|| [];

const totalPrice =
products.reduce(

(total,item)=>

total+
item.price*
item.quantity,

0

);

const ini = {

name:"",
email:"",
mo_no:"",
address:""

};

const handlesubmit =
async(

values,

{

resetForm

}

)=>{

try{

const options = {

key:
"rzp_test_S5iwtFr5Ws0PGC",

amount:
totalPrice*100,

currency:
"INR",

name:
"ecommerce web",

description:
"Order Payment",

handler:
async(
response
)=>{

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

const finalData = {

payment_id:
response
.razorpay_payment_id,

name:
values.name,

email:
values.email,

mo_no:
values.mo_no,

address:
values.address,

total_price:
totalPrice,

delivery_status:
"Processing",

products:

products.map(
(item)=>({

productid:
item._id,

product_name:
item.product_name,

quantity:
item.quantity,

price:
item.price

})

)

};

const res =
await axios.post(

"https://ecom-backend-4mkw.onrender.com/order/postorder",

finalData,

{

headers:{

authorization:
token

}

}

);

console.log(
res.data
);

alert(
"Payment Successful"
);

resetForm();

navigate(
"/order"
);

}

catch(error){

console.log(
error
);

alert(
"Order Save Failed"
);

}

},

theme:{

color:
"#ec4899"

}

};

const razorpay =

new Razorpay(
options
);

razorpay.open();

}

catch(error){

console.log(
error
);

}

};

return(

<div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">

<div className="w-full max-w-xl bg-white p-6 rounded-3xl shadow-lg">

<h1 className="text-4xl font-bold text-center mb-6">

Buy Details

</h1>

{

products.map(
(item)=>(

<div

key={
item._id
}

className="border rounded-xl p-4 mb-4"

>

<h2
className="text-2xl font-bold"
>

{
item.product_name
}

</h2>

<p>

Qty :
{
item.quantity
}

</p>

<p
className="text-pink-600 text-2xl font-bold"
>

₹
{
item.price
}

</p>

</div>

)

)

}

<h1
className="text-center text-3xl font-bold text-green-600 mb-5"
>

Total :

₹
{
totalPrice
}

</h1>

<Formik

initialValues={
ini
}

onSubmit={
handlesubmit
}

>

<Form
className="flex flex-col gap-4"
>

<Field

name="name"

placeholder="Name"

className="border p-3 rounded-xl"

/>

<Field

name="email"

placeholder="Email"

className="border p-3 rounded-xl"

/>

<Field

name="mo_no"

placeholder="Mobile"

className="border p-3 rounded-xl"

/>

<Field

name="address"

as="textarea"

placeholder="Address"

className="border p-3 rounded-xl"

/>

{

error &&

<p>

{
error
}

</p>

}

<button

type="submit"

className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-xl"

>

{

isLoading

?

"Loading..."

:

"Pay Now"

}

</button>

</Form>

</Formik>

</div>

</div>

);

};

export default Buy;