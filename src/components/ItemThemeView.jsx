import React, { useState, useEffect } from 'react';

import MainSearch from './searchinput/MainSearch';
import HorizontalScroll from './horizontalscroll/HorizintalScroll';
import IndexChart from './IndexChart';


const ItemThemeView = () => {

    const [topItems, setTopItems] = useState([])
    const [topThemes, setTopThemes ] = useState([])
    const [selectedItem, setSelectedItem ] = useState('')
    const [selectedTheme, setSelectedTheme] = useState('')

    const [itemChartData, setItemChartData] = useState([])
    const [themeChartData, setThemeChartData] = useState([])

    const fetchTopItems = async () => {
        const response = await fetch("http://localhost:8080/topitems")
        // const response = await fetch("https://backend-4l5xcufdcq-du.a.run.app/topitems")
        const topItems = await response.json()
        console.log(topItems)
        setTopItems(topItems.data)
        setSelectedItem(topItems.data[0].code)

        getItemChartData(topItems.data[0].code)
      }

    const fetchTopThemes = async () => {
        const response = await fetch("http://localhost:8080/topthemes")
        // const response = await fetch("https://backend-4l5xcufdcq-du.a.run.app/topthemes")
        const topThemes = await response.json()
        setTopThemes(topThemes.data)
        setSelectedTheme(topThemes.data[0].code)

        getThemeChartData(topThemes.data[0].code)
    }

    const getItemChartData = (code) => {

        setSelectedItem(code)
        let newCode = {'code' : code }
        let url = 'http://localhost:8080/getchartdata_item'
        // let url = "https://backend-4l5xcufdcq-du.a.run.app/getchartdata_item"

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCode)
        }).then(response => response.json())
          .then(data => {setItemChartData(data.data)})

    }

    const getThemeChartData = (code) => {
        // Cart에서 테마를 누르면 이 함수가 호출되고, 해당 카드의 테마코드가 입력됨
        // 입력된 코드로 선택된 테마를 update 한 후, backend에 해당 코드에 맞는 데이터를 요청함
        // 데이터가 들어오면, chart data state를 변경함

        setSelectedTheme(code)

        let newCode = {'code' : code }
        let url = 'http://localhost:8080/getchartdata_theme'
        // let url = "https://backend-4l5xcufdcq-du.a.run.app/getchartdata_theme"       

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCode)
        }).then(response => response.json())
          .then(json => {
              setThemeChartData(json.data)
          }) 
    }
    
    useEffect( () => { fetchTopItems()} , [])
    useEffect( () => { fetchTopThemes()}, [])
    
    return(
        <div className="homePage">
            <MainSearch />
            <HorizontalScroll kind={"top30"} data={topItems} clickHandler={getItemChartData}/>
            <HorizontalScroll kind={"theme"} data={topThemes} clickHandler={getThemeChartData}/>
            <IndexChart data={itemChartData} code={selectedItem}/>
            <IndexChart data={themeChartData} code={selectedTheme}/>
        </div>
    )
    
}

export default ItemThemeView;
