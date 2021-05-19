import React from 'react';
import './mainsearch.css';

const MainSearch = (props) => {
    
    let recomendedItem = "google"

    return(
       <div className="searchContainer">
           <form>
               <input 
                className="formTextInput"
                type="text"
                placeholder={props.placeholderText}
               />
           </form>
       </div>
    )
};

export default MainSearch;