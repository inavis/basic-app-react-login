import { useHistory } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Formik,useFormik } from 'formik';
import * as yup from 'yup';
import { TramOutlined } from "@mui/icons-material";
//using formik and yup for form validation and handling



const validateForm =yup.object({ 
    username:yup.string().required() , 
    password:yup.string().required().min(8)
        }
  )
  

export function Signup() {

    const history = useHistory();

    const [error,seterror]=React.useState("");
    const [visible,setvisible]=React.useState(false);
    const style1 = (visible)?{display:"block"}:{display:"none"};

    const adduser =(values) =>{
        console.log("add");
        fetch(`https://users-api-100.herokuapp.com/users/signup`,{
          method:"POST",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
          setvisible(true);
          console.log(res.acknowledged);
          (res.acknowledged)?history.push("/Login"):seterror(res.message)
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{ username:"",password:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
        console.log("On submit value",values);
        adduser(values)
        }
    })

  return (
    <div>
      <div className='box'>
        <div className='header'>Signup</div>
        <form onSubmit={handleSubmit}>
            <br></br>
        <div  style={style1} >
          <div className="message">
              {error}
          </div>
        </div>
        <br></br>
       <div>
       <TextField id="filled-basic" className="textbox" label="Username" variant="filled" required
           id='username'
           name='username'
           value={values.username}
           onChange={handleChange}
           onBlur={handleBlur}
           error={touched.username && errors.username} //textfield becomes red in coor if validation failes
           helperText={touched.username && errors.username ? errors.username :""} //it display small message below
        />
       </div>
      <br></br>

     <div>
     <TextField id="filled-basic" className="textbox" type="password" label="Password" variant="filled" required
           id='password'
           name='password'
           value={values.password}
           onChange={handleChange}
           onBlur={handleBlur}
           error={touched.password && errors.password} //textfield becomes red in coor if validation failes
           helperText={touched.password && errors.password ? errors.password :""} //it display small message below
        />
     </div>
      <br></br>

        <div>
        <Button variant='contained' className='textbox' type="submit" style={{background:"lightslategray"}} >
        Create Account
      </Button>
        </div>
      <br></br>
      <div style={{display:"flex"}}>
        <span style={{marginRight:"auto",paddingLeft:"8%"}} onClick={()=>{
          history.push("/Login")
        }} className="link">Already a user? Sign in</span>
        <span style={{marginLeft:"auto",paddingRight:"8%"}}  onClick={()=>{
          history.push("/ForgotPassword")
        }} className="link">Forgot Password?</span>
      </div>
      <br></br>
        </form>
      </div>
    </div>
  );
}
