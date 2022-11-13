import React from "react";
import "./hos.css";
const Hospitals = ()=>{

    const handleBack = ()=>{
        window.location.replace("http://localhost:3000/")
    }
    return (
        <div className="pos">
            <h1 className="pos1">Nearer Hospitals</h1>
    <iframe
      width="100%"
      height="100%"
      class="absolute inset-0"
      frameborder="0"
      title="map"
      marginheight="0"
      marginwidth="0"
      scrolling="no"
      src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=28.54814130777526, 77.24954634314263&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
    ></iframe>
    <p>*here we are only providing hospitals near Delhi</p>
    <br/>
    <button className="pos3" onClick={handleBack}>Back</button>
        </div>
    )
}

export default Hospitals;