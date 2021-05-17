import React from 'react';
import './mainsearch.css';

const MainSearch = () => {
    
    let recomendedItem = "google"

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