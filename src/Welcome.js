import Button from '@mui/material/Button';
import Cookies from 'js-cookie'
import { useState } from 'react';


export function Welcome() {

    const [display,setdisplay]=useState("");

    //can get users information only if we have token in cookie
const getusers =(token) =>{
    console.log("Get users",token);
    fetch(`https://users-api-100.herokuapp.com/users/`,{
      method:"GET",
      headers:{
        "x-auth-token":token
      }
    })
    .then((data)=>data.json())
    .then((res)=>{
        console.log(typeof(res),res.length)
        const arr = res.map(({username})=>{return username+" , "})
        setdisplay(arr)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

 
  return (
    <div>
      <div style={{textAlign:"center"}}>
      <Button variant='contained'  style={{background:"lightslategray"}}
       onClick={()=>getusers(Cookies.get('login-token-node'))} >
        GET USERS
      </Button>
      </div>

      <div >
          <div className='box'>
          {
              display
          }
          </div>
      </div>
    </div>
  );
}

