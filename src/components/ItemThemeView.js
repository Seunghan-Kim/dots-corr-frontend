import React, { useState, useEffect, useRef } from 'react';

import HorizontalScroll from './horizontalscroll/HorizintalScroll';
import HorizontalScrollCorr from './horizontalscroll/HorizintalScrollCorr';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import Button from '@material-ui/core/Button';
import '../css/ItemThemeView.css';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + mm + dd ;

let refData = String(parseInt(today) - 1);

console.log(refData)

const ItemThemeView = () => {


    // const backendUrl = 'http://localhost:8080/';
    const backendUrl = 'https://backend-v31-s5icpxfxda-uc.a.run.app/'

    const [top30ListData, setTop30ListData] = useState([]);
    const [corrListData, setCorrListData] = useState([])

    const [selectedTop30, setSelectedTop30] = useState({});
    const [selectedCorr, setSelectedCorr] = useState({});

    const [top30PriceData, setTop30PriceData] = useState([]);
    const [corrPriceData, setCorrPriceData] = useState([]);
    const [dateRef1, setDateRef] = useState(refData);

    

    useEffect(() => { //시작할때 데이터 불러오기 + 종목, 테마 데이터 불러오기
        fetch(`${backendUrl}topitems/${dateRef1}`)
        .then(response => response.json())
        .then(json => setTop30ListData(json.data))        
        } , [dateRef1]) 
        
    useEffect(() => { //종목 데이터 다 들어오면 첫번째 종목코드 선정하고 차트를 위한 데이터 불러오기
        if (top30ListData.length !== 0) {
            console.log(top30ListData[0])
            let code = top30ListData[0].code
            let name = top30ListData[0].name
            setSelectedTop30({'code':code, 'name':name})
        }
    }, [top30ListData])

    useEffect(() => {
        if (selectedTop30.code) {
            getPriceData(selectedTop30.code, 'top30')
            getCorrListData(selectedTop30.code, 'n_days')
        }        
    },[selectedTop30])

    useEffect(()=>{
        if (selectedCorr.code){
            getPriceData(selectedCorr.code, 'corr')
            console.log('bb')
        }
    },[selectedCorr])

    useEffect(() => {
        console.log('after corrList updated', corrListData[0])
        if (corrListData.length !== 0) {
            console.log(corrListData[0])
            setSelectedCorr({'code':corrListData[0].code, 'name':corrListData[0].Name})
        }
    }, [corrListData])

    const getPriceData = (code, kind) => {
        console.log('getPriceData', code)
        let url = `${backendUrl}chartdata_top30`
        let newCode = {'code' : code, 'date': dateRef1 }
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCode)
        }).then(response => response.json())
          .then(json => {  
            console.log('price data called',json.data)
            if (kind == 'top30') {
                setTop30PriceData(json.data)
            } else {
                setCorrPriceData(json.data)
            }            
          }) 
    }

    const getCorrListData = (code, sortOrder) => {
        console.log('getCorrData', code)
        let sortType = sortOrder
        
        if (!sortType){
            sortType = ''
        } 
        let fetchUrl = `${backendUrl}corr2/${code}/${sortOrder}`
        fetch(fetchUrl)
        .then(response => response.json())
        .then(json => {            
            setCorrListData(json.data)
            console.log('corr', json.data)
        })
    }

    const decreaseDate = () => {
        let currentDate = parseInt(dateRef1)
        let newDate = String(currentDate - 1)
        setDateRef(newDate)
        console.log('back')
    }

    const increaseDate = () => {
        let currentDate = parseInt(dateRef1)
        let newDate = String(currentDate + 1)
        setDateRef(newDate)
        console.log('fwd')
    }
    
    const resortCorrCard = (sortOrder) => {
        getCorrListData(selectedTop30.code, sortOrder);
    }

    const top30ClickHandler = (code, name) => {
        console.log('clicked', code, name)
        setSelectedTop30({'code':code, 'name':name})
    }

    const corrClickHandler = (code, name) => {
        console.log('corr card clicked', code, name)
        setSelectedCorr({'code':code, 'name':name})
    }

    return(
        <div className='mainContainer'>
            <div className='chartContainer'>
                <div className='chartItemName'>{selectedTop30.name}</div>
                <LineChart
                    width={360}
                    height={150}
                    data={top30PriceData}
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
                    <YAxis type="number" domain={['auto', 'auto']}/>
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    <Line type="monotone" dataKey="종가" stroke="#82ca9d" dot={false}/>
                </LineChart>
                <div className='chartItemName'>{selectedCorr.name}</div>
                <LineChart
                    width={360}
                    height={150}
                    data={corrPriceData}
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
                    <YAxis type="number" domain={['auto', 'auto']}/>
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    <Line type="monotone" dataKey="종가" stroke="#82ca9d" dot={false}/>
                </LineChart>
            </div>

            <div className='itemScrollBoxContainer'>           
                <div className='top30HeraderContainer'>
                    <div className='top30DateText'>{selectedTop30.name}</div>
                    <div className='top30HeaderText'>와 주가 변동이 비슷한 종목들</div>
                </div>
                <HorizontalScrollCorr data={corrListData} clickHandler={corrClickHandler}/>   
            </div>

            <div className='resortCorrCardBtnContainer'>
                <Button variant="contained" color="primary" onClick={()=>resortCorrCard('n_days')}>n_days</Button>
                {/* <Button variant="contained" color="primary" onClick={()=>resortCorrCard('')}>Re-sort</Button> */}
            </div>

            <div className='itemScrollBoxContainer'>
                <div className='top30HeraderContainer'>
                    <div className='top30DateText'>{dateRef1.slice(4,8)}</div>
                    <div className='top30HeaderText'>상승률 TOP30</div>
                </div>
                <HorizontalScroll data={top30ListData} clickHandler={top30ClickHandler}/>
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
