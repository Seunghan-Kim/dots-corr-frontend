import React from "react";
import '../css/Header.css'


const Header =() => {
  return(
    <div className='headerContainer'>
      <div className='headerText'>DOTs stock</div>
    </div>
  )
}

export default Header;

// const styles = {
//   headerContainer : {
//     position : 'sticky',
//     top : 0,
//     width : '100%',
//     boxShadow: "1px 3px 1px #9E9E9E",
//     paddingTop : 8,
//     paddingBottom : 4,
//   },

//   headerText : {
//     fontSize : 24,
//     textAlign : 'center',
//   }
// }