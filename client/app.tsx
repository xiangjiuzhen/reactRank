import {Routes,Route} from "react-router-dom";
import React from "react";
import {Home} from "./components/Home";
import { Detail } from "./components/Detail/inde";
export const App: React.FC = () => {
    return(
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/detail" element={<Detail/>}/>
            </Routes>
    )
};
