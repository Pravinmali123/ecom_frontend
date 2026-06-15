import React, { useState } from 'react';
// import axios from "axios";

import MyContext from './MyContext';

const MyState = (props) => {

  // SEARCH
  const [search, setSearch] = useState(null);

  // CATEGORY
  const [selectedCategory, setSelectedCategory] = useState("");



  return (

    <MyContext.Provider
      value={{

        search,
        setSearch,

        selectedCategory,
        setSelectedCategory,

        

      }}
    >

      {props.children}

    </MyContext.Provider>

  );

};

export default MyState;