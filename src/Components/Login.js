import React,{useState} from 'react'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [adminEmail, setAdminEmail] = useState('admin@1234.com');
    const [adminPassword, setAdminPassword] = useState('admin123');

    const goToRestaurentdetailsPage=()=>{
            props.history.push('/addRestaurent')
    }

    const handleLogin=()=>{
        if(email==adminEmail&&password==adminPassword){
            console.log("admin verified")
            goToRestaurentdetailsPage()
        }
        else{
            console.log("unauthorized")
        }
    }

  return(
      <div className=" loginContainer container ">
      <div max-width="100px" >
          Email <input  type="text" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
         </div>
         <div>
          password <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} /> 
       </div>
       <div>
        <button  class="btn btn-primary" onClick={()=>handleLogin()}>submit</button>
      </div>
      </div>
  )
}


export default Login
