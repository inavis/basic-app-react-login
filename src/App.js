import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link,Redirect, useHistory } from "react-router-dom";
import { Signup } from './Signup';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';
import { Login } from './Login';
import { Welcome } from './Welcome';

function App() {
  return (
    <div className="App">
       <Switch>
         {/* Each route is case */}
         <Route path="/Welcome">
          <Welcome/>
        </Route>

         <Route path="/Signup">
          <Signup/>
        </Route>

        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/ForgotPassword">
          <ForgotPassword/>
        </Route>

        <Route path="/reset/:token">
          <ResetPassword/>
        </Route>

         <Route exact path="/">
           <Login/>
         </Route>
         
         {/* For broken or links that does not exist */}
         <Route path="**">
           <NotExist/>
         </Route>
       </Switch>
    </div>
  );
}


//404 error page
function NotExist(){
  return(
    <div>
      {/* <img className='notfoundimage' src="https://jonmgomes.com/wp-content/uploads/2020/08/JMG-404-Crane-GIF.gif"/> */}
      <img className='notfoundimage' src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2db0b280898527.5cee93b96b7f6.gif"/>
    </div>
  )
}


export default App;
