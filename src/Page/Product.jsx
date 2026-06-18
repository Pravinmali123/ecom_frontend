import React, { useEffect, useState , } from "react";
import axios from "axios";
import { Star } from "lucide-react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import MyContext from "../context/MyContext";
const Product = () => {
// const { category } = useParams();
const navigate = useNavigate();
   const [products, setProducts] = useState([]);
const { search, selectedCategory } = useContext(MyContext);


// console.log(user);


const addcart = async (item) => {

try {

const token =
localStorage.getItem(
"token"
);

if(!token){

alert(
"Please Login First"
);

navigate(
"/login"
);

return;

}

await axios.post(

"https://ecom-backend-4mkw.onrender.com/cart/postcart",

{

...item,

quantity:1

},

{

headers:{

authorization:
token

}

}

);

alert(
"Product Added To Cart"
);

}

catch(error){

console.log(
error
);

}

};

 const getProducts = async () => {

  try {

    let url = "https://ecom-backend-4mkw.onrender.com/product";

    // SEARCH API
    if (search) {

      url = `https://ecom-backend-4mkw.onrender.com/product/search?search=${search}`;

    }

    // CATEGORY
    else if (selectedCategory) {

      url += `?category=${selectedCategory}`;

    }

    const res = await axios.get(url);
    
    
    setProducts(res.data.data);

  } catch (error) {

    console.log(error);

  }

};

  useEffect(() => {

    getProducts();

  }, [selectedCategory, search]);

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">

    
      <div className="text-center mb-12">

        <h1 className="text-4xl md:text-4xl font-bold text-gray-800">

        {products.length === 0 ? (
             "Products not found") : ("Our product")}

        </h1>

        <p className="text-gray-500 mt-3 text-lg">
            {products.length === 0 ? (
             "This category has no products") : ("Discover our latest collection")}
          

        </p>

      </div>

   
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {products.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >

         
            <div className="overflow-hidden">

              <img
                src={`https://ecom-backend-4mkw.onrender.com/images/${item.Image}`}
                alt={item.product_name}
                className="w-full h-64 object-cover hover:scale-110 transition duration-500"
              />

            </div>

           
            <div className="p-5">
<div className="flex items-center justify-between mb-1">
             
              <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">

                {item.category}

              </span>

                 <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">

                  Stock: {item.stock}

                </span>

             
          
</div>
                  
                <h2 className="text-2xl sm:text-1xl   font-bold text-gray-800 mb-2 line-clamp-1">

                {item.product_name}

              </h2>
             
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">

                {item.description}

              </p>

            
               <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 mb-4">

                <div className="flex gap-1">

                  {[...Array(5)].map((_, index) => (

                    <Star
                      key={index}
                      size={16}
                      color="gold"
                      fill="gold"
                    />

                  ))}

                </div>

                {/* <span className="text-gray-600 text-sm">

                  ({item.rating})

                </span> */}

              </div>
                    <h3 className="text-3xl font-bold text-pink-500">

                  ₹ {item.price}

                </h3>

             

              </div>

        
             

          
                    
              <div className="flex gap-3">

                <button  onClick={() => addcart(item)}
                  className="w-1/2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition duration-300 font-semibold"
                >

                  Add Cart

                </button>

               <button

onClick={()=>{

const token =
localStorage.getItem(
"token"
);

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

"/buy",

{

state:[

{

...item,

quantity:1

}

]

}

);

}}

className="w-1/2 bg-pink-500 text-white py-3 rounded-xl"

>

Buy now

</button>

              </div>
            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Product;