import React from 'react';

import MainSearch from './searchinput/MainSearch'
import Devider from './Devider'
import HorizontalScroll from './horizontalscroll/HorizintalScroll';


class ItemThemeView extends React.Component {


    render(){
        return(
            <div className="homePage">
                <MainSearch />
                <HorizontalScroll kind={"top30"} />
                <HorizontalScroll kind={"theme"} />
            </div>
        )
    }
}

export default ItemThemeView;