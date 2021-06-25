import React, { useState, useEffect, useRef, PureComponent } from 'react';

import HorizontalScroll from './horizontalscroll/HorizintalScroll';
import HorizontalScrollCorr from './horizontalscroll/HorizintalScrollCorr';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { background } from '@chakra-ui/react';
import Button from '@material-ui/core/Button';
import '../css/ItemThemeView.css';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + mm + dd ;

let refData = String(parseInt(today) - 1);

console.log(refData)

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

const ItemThemeView = () => {


    // const backendUrl = 'http://localhost:8080/';
    const backendUrl = 'https://backend-v31-s5icpxfxda-uc.a.run.app/'


    const [topItems, setTopItems] = useState([])
    const [topThemes, setTopThemes ] = useState([])

    const [selectedItem, setSelectedItem ] = useState('')
    const [selectedItemName, setSelectedItemName] = useState('')
    const [selectedTheme, setSelectedTheme] = useState('')

    const [itemChartData, setItemChartData] = useState([])
    const [themeChartData, setThemeChartData] = useState([])
    
    const [placeholderText, setPlaceholderText] = useState('')
    const [whoseTurn, setWhoseTurn] = useState('item')
    const [itemIndex, setItemIndex] = useState(0)
    const [themeIndex, setThemeIndex] = useState(0)
    const [dateRef1, setDateRef] = useState(refData)   

    const [corrData, setCorrData] = useState([])
    const isFirstRender = useRef(true)

    const heightRef = useRef(getWindowDimensions().height)

    const getChartData = (code, kind, name) => {
        console.log(this)
        let url = backendUrl + 'chartdata_' + kind
        console.log(code, name)

        let newCode = {'code' : code, 'date': dateRef1 }

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCode)
        }).then(response => response.json())
          .then(json => {
              console.log('json', json)
              if (kind === 'top30') {
                  setItemChartData(json.data);
                  console.log(json.data)
                  setSelectedItem(code)
                  setSelectedItemName(name)
                                
            }
              else if (kind === 'theme') {
                  setThemeChartData(json.data);
                  setSelectedTheme(code)                
                }
          }).then(()=>{
              getCorrData(code)
            })        
    }

    const getCorrData = (code) => {
        console.log(code)
        fetch(backendUrl + `corr2/${code}`)
        .then(response => response.json())
        .then(json => {
            
            setCorrData(json.data)
            console.log('corr', json.data)
        })
    }

    
    useEffect(() => { //시작할때 데이터 불러오기 + 종목, 테마 데이터 불러오기
        fetch(backendUrl + `topitems/${dateRef1}`)
        .then(response => response.json())
        .then(json => setTopItems(json.data))        
        } , [dateRef1]) 

        
    useEffect(() => { //종목 데이터 다 들어오면 첫번째 종목코드 선정하고 차트를 위한 데이터 불러오기
        if (topItems.length !== 0 && isFirstRender.current){
            let selectedItemCode = topItems[0].code
            let selectedItemName = topItems[0].name
            console.log('firts code',selectedItemCode)
            setSelectedItem(selectedItemCode)
            setSelectedItemName(selectedItemName)
            // getItemChartData(selectedCode, 'top30')
            getChartData(selectedItemCode, 'top30', selectedItemName)
            isFirstRender.current = false
        }
    }, [topItems])

    const decreaseDate = () => {
        isFirstRender.current = true
        let currentDate = parseInt(dateRef1)
        let newDate = String(currentDate - 1)
        setDateRef(newDate)
        console.log('back')
    }

    const increaseDate = () => {
        isFirstRender.current = true
        let currentDate = parseInt(dateRef1)
        let newDate = String(currentDate + 1)
        setDateRef(newDate)
        console.log('fwd')
    }
    
    return(
        <div className='mainContainer'>
            {/* <MainSearch placeholderText={placeholderText}/> */}
            
            {/* <HorizontalScroll kind={"theme"} data={topThemes} clickHandler={getChartData}/> */}
            {/* <IndexChart data={itemChartData} code={selectedItem}/> */}
            {/* <IndexChart data={themeChartData} code={selectedTheme}/> */}
            {/* <div style={{backgroundColor:'white'}}>{count}{text}</div> */}
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <div className='chartContainer'>
                <div className='chartItemName'>{selectedItemName}</div>
                <LineChart
                    width={360}
                    height={250}
                    data={itemChartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                    fontSize={10}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    <Line type="monotone" dataKey="종가" stroke="#82ca9d" dot={false}/>
                </LineChart>
                               
                
                
            </div>
            <div className='itemScrollBoxContainer'>           
                <div className='top30HeraderContainer'>
                    <div className='top30DateText'>{selectedItemName}</div>
                    <div className='top30HeaderText'>와 주가 변동이 비슷한 종목들</div>
                </div>
                <HorizontalScrollCorr data={corrData} clickHandler={getChartData}/>   
            </div>
            
            <div className='itemScrollBoxContainer'>
                <div className='top30HeraderContainer'>
                    <div className='top30DateText'>{dateRef1.slice(4,8)}</div>
                    <div className='top30HeaderText'>상승률 TOP30</div>
                </div>
                <HorizontalScroll kind={"top30"} data={topItems} clickHandler={getChartData}/>
            </div>

            <div className='dateSelectorContainer'>
                <Button variant="contained" onClick={()=>decreaseDate()}>뒤로</Button>
                <div className='dateText'>{dateRef1}</div>
                <Button variant="contained" color="primary" onClick={()=>increaseDate()}>앞으로</Button>
            </div>
            
            
        </div>
    )
    
}

export default ItemThemeView;
