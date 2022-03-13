import React from "react";

const linkStyle = {color: 'white'}

const Navigation = () => {
    return (
        <nav>
            <h3>logo</h3>
            <ul className="nav-ul"> 
                <li>
                <a href="/" style={linkStyle}>Home</a>
                </li>
                <li>
                    <a href="/products" style={linkStyle}>Products</a>
                </li>
                <li>
                    <a href="/about" style={linkStyle}>About</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation