import { useHistory } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Formik,useFormik } from 'formik';
import * as yup from 'yup';
import { TramOutlined } from "@mui/icons-material";
//using formik and yup for form validation and handling


const validateForm =yup.object({ 
    username:yup.string().required() 
        }
  )
  

export function ForgotPassword() {

    const history = useHistory();

    const [error,seterror]=React.useState("");
    const [visible,setvisible]=React.useState(false);
    const style1 = (visible)?{display:"block"}:{display:"none"};

    const sendemail =(values) =>{
        console.log("forgot password");
        console.log(values)
        fetch(`https://users-api-100.herokuapp.com/users/forgot-password`,{
          method:"POST",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
          setvisible(true);
          console.log(res);
          seterror(res.message)
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{ username:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
        console.log("On submit value",values);
        sendemail(values)
        }
    })

  return (
    <div>
       <div className='box'>
        <div className='header'>Forgot Password</div>
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
        <Button variant='contained' className='textbox' type="submit" style={{background:"lightslategray"}} >
        Send Email
      </Button>
        </div>
      <br></br>
      <div style={{display:"flex"}}>
        <span style={{marginRight:"auto",paddingLeft:"8%"}} onClick={()=>{
          history.push("/Login")
        }} className="link">Already a user? Sign in</span>
        <span style={{marginLeft:"auto",paddingRight:"8%"}}  onClick={()=>{
          history.push("/Signup")
        }} className="link">Create new account</span>
      </div>
      <br></br>
        </form>
      </div>
    </div>
  );
}
