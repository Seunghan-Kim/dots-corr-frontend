import React, { useState, useEffect } from 'react';

import MainSearch from './searchinput/MainSearch';
import HorizontalScroll from './horizontalscroll/HorizintalScroll';
import IndexChart from './IndexChart';


const ItemThemeView = () => {

    const [topItems, setTopItems] = useState([])
    const [topThemes, setTopThemes ] = useState([])
    const [selectedItem, setSelectedItem ] = useState()
    const [selectedTheme, setSelectedTheme] = useState('')

    const [itemChartData, setItemChartData] = useState([])
    const [themeChartData, setThemeChartData] = useState([])
    
    const [placeholderText, setPlaceholderText] = useState('')
    const [whoseTurn, setWhoseTurn] = useState('item')
    const [itemIndex, setItemIndex] = useState(0)
    const [themeIndex, setThemeIndex] = useState(0)
    

    const fetchTopItems = async () => {
        // 다음에 아래의 함수와 병합해서 하나로 만들자
        // click event에서 코드와 유형을 같이 보내주고, 유형을 url 뒤에 붙여서 보내면 될 것 같음
        // 그런데 데이터 업데이트는 ? 이부분에만 if를 붙일까?

        const response = await fetch("http://localhost:8080/topitems")
        // const response = await fetch("https://backend-4l5xcufdcq-du.a.run.app/topitems")
        const topItems = await response.json()
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

        // 다음에 아래의 함수와 병합해서 하나로 만들자
        // click event에서 코드와 유형을 같이 보내주고, 유형을 url 뒤에 붙여서 보내면 될 것 같음
        // 그런데 데이터 업데이트는 ? 이부분에만 if를 붙일까?


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
        // let url = 'http://localhost:8080/getchartdata_theme'
        let url = "https://backend-4l5xcufdcq-du.a.run.app/getchartdata_theme"       

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCode)
        }).then(response => response.json())
          .then(json => {
              setThemeChartData(json.data)
          }) 
    }
    
    useEffect(() => {
        fetchTopItems();
        fetchTopThemes();
        } , [])    

    useEffect(() => {
        const changePlaceholderText = () => {   
            if (whoseTurn === 'item') {       
                let currentIndex = itemIndex % topItems.length
                setPlaceholderText('잘 나가는 종목 :' + topItems[currentIndex].name)
                setItemIndex(itemIndex => itemIndex + 1)       
                setWhoseTurn('theme')
            } else if (whoseTurn === 'theme'){
                let currentIndex = themeIndex % topThemes.length
                setPlaceholderText('잘 나가는 테마 :' + topThemes[currentIndex].name)
                setThemeIndex(themeIndex => themeIndex + 1) 
                setWhoseTurn('item')
            }
        }
       const timerId = setTimeout(()=> {
            changePlaceholderText();
       }, 1500);       
       return () => clearTimeout(timerId)          
    }, [whoseTurn, itemIndex, themeIndex, topItems, topThemes])
    
    return(
        <div className="homePage">
            <MainSearch placeholderText={placeholderText}/>
            <HorizontalScroll kind={"top30"} data={topItems} clickHandler={getItemChartData}/>
            <HorizontalScroll kind={"theme"} data={topThemes} clickHandler={getThemeChartData}/>
            <IndexChart data={itemChartData} code={selectedItem}/>
            <IndexChart data={themeChartData} code={selectedTheme}/>
            {/* <div style={{backgroundColor:'white'}}>{count}{text}</div> */}
        </div>
    )
    
}

export default ItemThemeView;
