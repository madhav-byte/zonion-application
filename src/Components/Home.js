import React,{useState,useEffect} from 'react';
import axios from "axios";
import { Link, NavLink } from 'react-router-dom';


function Home(props) {
    const [restaurent, setRestaurent] = useState([]);
    const [restroId, setRestroId] = useState('')
    useEffect(() => {
       
        axios.get("http://localhost:1337/restaurent")
        .then(res=>{
            console.log(res.data)
            setRestaurent(res.data)
            setRestroId(res.data.id)
            
        })
        .catch(error=>console.log(error))
        
    }, [])

   
    return (
        <div className='HomeContainer'>
            <h1>Welcome to home</h1>
         {
           restaurent.filter(isRestaurentActive=>isRestaurentActive.activate===true).map(activeRestaurent=><nav><Link to={`/details/${activeRestaurent.id}`} ><h3> {activeRestaurent.restaurentName} </h3> </Link> </nav>)
           //  restaurent.map(rest=> <nav><Link to={`/details/${rest.id}`} ><li> {rest.restaurentName} </li> </Link> </nav>)
         }
        </div>
    )
}

export default Home
