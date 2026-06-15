// import React, { useContext } from 'react'
import Layout from '../Components/Layout.'
// import  MyContext  from '../context/MyContext'
import HeroSection from './Herosection'
import Product from './Product'
import Track from './Track'
import Category from './Category'
const Home = () => {
  // const sub = useContext(MyContext)
  // console.log(sub)
  // const {name, email} = sub
  // console.log(name);

  return (
    <div>
     <Layout>
        <HeroSection/>
          <Category />

    <Product/>
    
        <Track/>
        
        {/* // <h1>name:{name}</h1>
        // <h1>email:{email}</h1> */}
      </Layout>
    </div>
  )
}

export default Home
