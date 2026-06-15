import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Page/Home";
// import Product from "./Page/Product";
import Order from "./Page/Order";
import Cart from "./Page/Cart";
import Login from "./Page/Login";
import Sign from "./Page/Register";
import Nopage from "./Page/Nopage";
import MyState from "./context/MyState";
import ProductDashboard from "./Adminpanal/ProductDashboard";
import Categarymanagemant from "./Adminpanal/Categarymanagemant";
import Addproduct from "./Adminpanal/Addproduct";
import Ordermanagemant from "./Adminpanal/Ordermanagemant";
import Dashboard from "./Page/Dashbord";
import DashboardLayout from "./Components/DashboardLayout";
import Buy from "./Page/Buy";
// import AddCategory from "./Page/Category";
import Product from "./Page/Product";
import Paynow from "./Page/Paynow";

function App() {
 
  return (
    <MyState>
    <BrowserRouter>
      <Routes>
        <Route
  path="/"
  element={<Home />}
/>
          <Route path="/product/:category" element={<Product />} />
        {/* <Route path="/product" element={<Product />} /> */}
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Sign />}/>
        <Route path="/buy" element={<Buy />} />
        <Route path="/Pay" element={<Paynow />} />
        <Route path="/*" element={<Nopage />}/>

        
     
        <Route path="/dashbord" element={<Dashboard />}/>
       


                <Route
            path="/admin"
            element={<DashboardLayout />}
          >

              <Route
    index
    element={<ProductDashboard />}
  />

            <Route 
              path="productdashboard" 
              element={<ProductDashboard />}
            />

            <Route
              path="addproduct"
              element={<Addproduct />}
            />

            <Route
              path="categarymanagemant"
              element={<Categarymanagemant />}
            />

            <Route
              path="ordermanagemant"
              element={<Ordermanagemant />}
            />

          </Route>
        
      </Routes>
    </BrowserRouter>
    </MyState>
  );
}

export default App;