import React from "react";
import { useNavigate } from "react-router-dom";


const Home = ()=>{

    const navigate = useNavigate();

    const onclick=()=>{
        navigate('/main');
    }
    return(
        <>
        <div className="home">
            <h1>Covid19 Tracker</h1>
            <br/>
        </div>
        <br/>
        <div className="mybtn">
            <button onClick={onclick}>Land</button>
        </div>
        </>
    )
}

export default Home;
