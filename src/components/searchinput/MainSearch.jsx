import React from 'react';
import './mainsearch.css';

const MainSearch = () => {

    let recomendedItem = "삼성전자"

    return(
       <div className="searchContainer">
           <form>
               <input 
                className="formTextInput"
                type="text"
                placeholder={recomendedItem}
               />
           </form>
       </div>
    )
};

export default MainSearch;