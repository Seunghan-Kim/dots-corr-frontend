import React, { useState, useEffect, useRef, PureComponent } from 'react';

import MainSearch from './searchinput/MainSearch';
import HorizontalScroll from './horizontalscroll/HorizintalScroll';
import IndexChart from './IndexChart';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + mm + dd ;

today = '20210621'

console.log(today)

const ItemThemeView = () => {


    const backendUrl = 'http://localhost:8080/';
    // const backendUrl = 'https://backend-v31-s5icpxfxda-uc.a.run.app/'


    const [topItems, setTopItems] = useState([])
    const [topThemes, setTopThemes ] = useState([])

    const [selectedItem, setSelectedItem ] = useState('')
    const [selectedTheme, setSelectedTheme] = useState('')

    const [itemChartData, setItemChartData] = useState([])
    const [themeChartData, setThemeChartData] = useState([])
    
    const [placeholderText, setPlaceholderText] = useState('')
    const [whoseTurn, setWhoseTurn] = useState('item')
    const [itemIndex, setItemIndex] = useState(0)
    const [themeIndex, setThemeIndex] = useState(0)
    const [dateRef, setDateRef] = useState(today)   

    const date_ref = useRef('20210621')

    const getChartData = (code, kind) => {
        let url = backendUrl + 'chartdata_' + kind

        let newCode = {'code' : code, 'date': date_ref.current }

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCode)
        }).then(response => response.json())
          .then(json => {
              if (kind === 'top30') {
                  setItemChartData(json.data);
                  console.log(json.data)
                  setSelectedItem(code)
            }
              else if (kind === 'theme') {
                  setThemeChartData(json.data);
                  setSelectedTheme(code)                
                }
          })
    }
    
    useEffect(() => { //시작할때 데이터 불러오기 + 종목, 테마 데이터 불러오기
        fetch(backendUrl + `topitems/${dateRef}`)
        .then(response => response.json())
        .then(json => setTopItems(json.data))

        fetch(backendUrl + 'topthemes')
        .then(response => response.json())
        .then(json => setTopThemes(json.data))
        } , []) 
        
    useEffect(() => { //종목 데이터 다 들어오면 첫번째 종목코드 선정하고 차트를 위한 데이터 불러오기
        if (topItems.length !== 0){
            let selectedCode = topItems[0].code
            console.log('aaa',topItems)
            setSelectedItem(selectedCode)
            // getItemChartData(selectedCode, 'top30')
            getChartData(selectedCode, 'top30')
        }
    }, [topItems])

    useEffect(() => { //테마 데이터 다 들어오면 첫번째 테마코드 선정하고 차트를 위한 데이터 불러오기
        if (topThemes.length !== 0 ){
            let selectedCode = topThemes[0].code
            setSelectedTheme(selectedCode)
            getChartData(selectedCode, 'theme')
        }
    }, [topThemes])

    useEffect(() => { // 일정시간 마다 탐색창 추천 아이템 변경해주기
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
            <HorizontalScroll kind={"top30"} data={topItems} clickHandler={getChartData}/>
            {/* <HorizontalScroll kind={"theme"} data={topThemes} clickHandler={getChartData}/> */}
            {/* <IndexChart data={itemChartData} code={selectedItem}/> */}
            {/* <IndexChart data={themeChartData} code={selectedTheme}/> */}
            {/* <div style={{backgroundColor:'white'}}>{count}{text}</div> */}
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <div className="LineChartContainer">
                <LineChart
                    width={500}
                    height={300}
                    data={itemChartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    <Line type="monotone" dataKey="종가" stroke="#82ca9d" />
                </LineChart>
            </div>
            {/* </ResponsiveContainer> */}
        </div>
    )
    
}

export default ItemThemeView;
