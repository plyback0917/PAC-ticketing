import React from "react";
import { Link } from "react-router-dom";

//basic navigation that will be ontop of every page. When the text is clicked it will redirect user to the according link.
const Navigation = () => <nav>

    <ul>
        <li>
            <Link to ="/Home"> Home</Link>
        </li>
        <li>
            <Link to ="/Mypage"> My page</Link>
        </li> 
        <li>
            <Link to ="/Ticketing">Ticketing</Link>
        </li> 
    </ul>
</nav>

export default Navigation;