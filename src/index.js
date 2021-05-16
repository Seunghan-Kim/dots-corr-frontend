import React from "react";
import ReactDOM from 'react-dom';
import './css/App.css';

import Header from "./components/Header";
import ItemThemeView from './components/ItemThemeView';

function App() {
  return (
    <div className="homePage">
      <Header />
      <ItemThemeView />      
    </div>    
  )
}

ReactDOM.render(<App />, document.getElementById("root"))