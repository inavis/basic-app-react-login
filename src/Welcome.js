import Button from '@mui/material/Button';
import Cookies from 'js-cookie'
import { useState } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export function Welcome() {
    const history = useHistory()

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

<div>
       <AppBar position="static" style={{background:""}}>
            {/* When signout the cookie is removed */}
            <Toolbar>
              <Button color="inherit" onClick={()=>{
                  Cookies.remove('login-token-node')
                  history.push("/Login")}}
                  >Sign out</Button>

                  {/* If cookie is there with that one can get all users list */}
                  <Button variant='contained'  style={{background:"lightslategray"}}
                onClick={()=>getusers(Cookies.get('login-token-node'))} >
                  GET USERS
                </Button>
                
            </Toolbar>
        </AppBar>
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


