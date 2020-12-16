import React,{useState,useEffect} from 'react';
import axios from 'axios'

function RestaurentDetails({match}) {
    const [details, setDetails] = useState({})
    
 
    useEffect(async () => {
        getDetails()
    }, [])

    const getDetails= async () =>{
        await axios.get(`http://localhost:1337/restaurent/${match.params.id}`)
        .then(res=>{console.log(res.data)
                      setDetails(res.data)
                      console.log(details)
                       })
        .catch(error=>console.log(error))
    }

    return (
        <div className="restaurantContainer">
           <h1>Restaurent Details</h1>
            <table><tr>
                <td>
                Restaurent Name <h2>{details.restaurentName} </h2>
          addres:- <h3>{details.address} </h3>
          opens at:- <h3>{details.openningTime} Am </h3>
          closes at:- <h3>{details.closingTime} Pm </h3>
                    </td>
          menu :-<img src={details.srcImg} width="250px" height="250px" />
                    <td></td>
                    </tr></table>
         
      
          
        </div>
    )
}

export default RestaurentDetails
