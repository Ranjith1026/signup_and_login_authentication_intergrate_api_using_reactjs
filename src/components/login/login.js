import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './login.css';


 class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           email : '' ,
           password : '',
           redirectToReferrer : false,
           message:""  //show api msg in react
        };
    }

    

    handleChange= (e) =>{
        this.setState({
            [e.target.name] : e.target.value})
}
    handleSubmit=(e) =>{
        e.preventDefault();
        //show api msg in react
        this.setState({
            message: ""
          });


        console.log(this.state)
        axios.post(`http://localhost:8000/auth/login`,this.state)
        .then((response) =>
           { 
               let userresponse = response;
               console.log(userresponse.data);
               if(userresponse){
               sessionStorage.setItem('data',JSON.stringify(userresponse));
               this.setState({redirectToReferrer: true});
               }
               
           }, /*show api msg in react*/ error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              message: resMessage
            });
          });
}

render(){
    if (this.state.redirectToReferrer){
        
        return (<Redirect to={'/profile'}/>)
        }
        if (sessionStorage.getItem('data')){
        
            return (<Redirect to={'/profile'}/>)
            }
            const {email,password} = this.state
    return(

  
          <form className="model" name="logform" onSubmit={this.handleSubmit}>
                <div className="container">
              <h2>Login Page</h2>
              <hr></hr>

              <div className="form-group"> <input type="email" value={email} name="email" onChange={this.handleChange} placeholder="Enter Your EmailID" required/><br/></div>
           

              <div className="form-group"> <input type="password" value={password} name="password" onChange={this.handleChange} placeholder="Enter Your Password" required/><br/></div>


              <button type="submit"   className="btn-block">Login</button>

              <p>No account?<a href="./register">Create one</a></p>

         {this.state.message && (
              <div className="form-group">
                <div className="alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
              </div>
       </form>

     

  )

}

}

export default Login