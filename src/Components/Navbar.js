import React from "react";

export default function Navbar({setQuery}) {
    function handleClick (e){
        setQuery(e);
    }
    return (
        <>
            <div className="navbar" onClick={(e) => handleClick(e)}>
                <img className="navbar-img" src="https://cdn-icons-png.flaticon.com/128/4047/4047371.png" alt="PhotoFolio-Icon"></img>
                <span> PhotoFolio </span>
            </div>
        </>
    )
}