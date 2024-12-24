import React from "react";
import { useNavigate } from "react-router-dom";
import  "../../style/style.css";
import {GuComponent} from '../gujiaping/index'
import { useDispatch, useSelector } from "react-redux";

import { decrement,addValue } from '../../store/moudle/counterSlice'
export  const Home: React.FC = () => {
    
    // console.log(12345,fetch)
    const count = useSelector(state => state.counter.value);
console.log(count,)
const dispatch = useDispatch()
    const add =async  ()=>{
        dispatch(addValue(2))
        let res =await fetch('/content').then(res=>{
        let data = res
        console.log(data.json(),'123456')
    })

    }
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate("/detail")
    }
    return(
        <>
        <div className="home">
        <GuComponent  height="100px" width="100px"/>
        <p>这是首页</p>
        <div>这是count {JSON.stringify(count)}</div> 
        <button onClick={handleClick}>点击123</button>
        <button onClick={add}> 点击我+1</button>
        </div>
        </>
    )
     
};
