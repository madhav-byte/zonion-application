import React from 'react'
import { NavLink,BrowserRouter, Link} from 'react-router-dom'

function Navigator() {
    return (
        <div className="topnav">
        
        
         <nav> 
    <Link className='.active' to='/' ><h4> Home </h4> </Link>
    <Link to='/login'> <h4> Login </h4> </Link>
    <Link to='/about'> <h4> About</h4>  </Link>
    </nav> 
    
         
        </div>
    
      );
}

export default Navigator
