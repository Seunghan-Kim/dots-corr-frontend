import React, { useState, useEffect } from 'react';

import MainSearch from './searchinput/MainSearch';
import HorizontalScroll from './horizontalscroll/HorizintalScroll';
import IndexChart from './IndexChart';


const ItemThemeView = () => {

    const [topItems, setTopItems] = useState([])
    const [topThemes, setTopThemes ] = useState([])
    
    const fetchTopItems = async () => {
        // const response = await fetch("http://localhost:8080/topitems")
        const response = await fetch("https://backend-4l5xcufdcq-du.a.run.app/topitems")
        const topItems = await response.json()
        setTopItems(topItems.data)
      }

    const fetchTopThemes = async () => {
        // const response = await fetch("http://localhost:8080/topthemes")
        const response = await fetch("https://backend-4l5xcufdcq-du.a.run.app/topthemes")
        const topThemes = await response.json()
        setTopThemes(topThemes.data)
    }
    
    useEffect(() => {
        fetchTopItems()
        }, [])

    useEffect(() => {
        fetchTopThemes()
        }, [])
    
    return(
        <div className="homePage">
            <MainSearch />
            <HorizontalScroll kind={"top30"} data={topItems}/>
            <HorizontalScroll kind={"theme"} data={topThemes}/>
            <IndexChart />
        </div>
    )
    
}

export default ItemThemeView;