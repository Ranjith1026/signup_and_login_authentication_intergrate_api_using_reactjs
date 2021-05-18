import React from "react";
import axios from 'axios';
import './register.css';
import {Redirect} from 'react-router-dom';


class Register extends React.Component{

  constructor(props){
      super(props);
      this.state = {
          username:'',
         email : '' ,
         firstname:'',
         lastname:'',
         password : '',
         dob:'',
         about_me:'',
         usernameErr:'',
         emailErr:'',
         firstnameErr:'',
         lastnameErr:'',
         passwordErr:'',
         dobErr:'',
         about_meErr:'',
         redirectToReferrer : false,
         message:""
        
        };
  }


  handleChange= (e) =>{
          this.setState({
              [e.target.name] : e.target.value})
  }


  handleSubmit=(e) =>{
        e.preventDefault();

        this.setState({
                message: ""
              });

        console.log(this.state)
        axios.post(`http://localhost:8000/auth/register`,this.state)
        .then((response) =>
           { 
               let userresponse = response;
               console.log(userresponse.data);
               if(userresponse){
               sessionStorage.setItem('data',JSON.stringify(userresponse));
               this.setState({redirectToReferrer: true});
               }
               
           },error => {
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
  

  valid(){
        if(!this.state.username){
                this.setState({usernameErr:"Username is required"})
        }

        if(!this.state.email){
                this.setState({emailErr:"Email is required"})
        } else if(!this.state.email.includes('@')){
                  this.setState({emailErr:"invalid email"})
          }

          if(!this.state.firstname){
                this.setState({firstnameErr:"Firstname is required"})
        }

        if(!this.state.lastname){
                this.setState({lastnameErr:"lastname is required"})
        }
        if(!this.state.password){
                this.setState({passwordErr:"Password is required"})
        }else if(this.state.password.length < 7){
                  this.setState({passwordErr:"password must be more than 8 character[uppercase, lowercase, numbers, special character]"})
          }

          if(!this.state.dob){
                this.setState({dobErr:"Date of birth is required"})
        }

        if(!this.state.about_me){
                this.setState({about_meErr:"About_me is required"})
        }
          else{
                  return true
          }
        }
 submit(){
         this.setState({usernameErr:"",emailErr:"",firstnameErr:"",lastnameErr:"",passwordErr:"",dobErr:"",about_meErr:""})
         if(this.valid()){
                 alert("form is submitted")
         }   
 }

  
  render(){  

        

        if (this.state.redirectToReferrer){
        
                return (<Redirect to={'/profile'}/>)
                }
                if (sessionStorage.getItem('data')){
                
                    return (<Redirect to={'/profile'}/>)
                    }
        
      const {username,email,firstname,lastname,password,dob,about_me} = this.state
        
  return (

    <form className="form-model"  name="RegForm" onSubmit={this.handleSubmit}>
    <div className="container1">
      <h2>REGISTRATION PAGE</h2> 
      <hr></hr> 
      <div className="form-group"> <input type="text" value={username} name="username" onChange={this.handleChange} className="form-control" id="exampleInputUsername1" placeholder="Username" required /></div>
      <span>{this.state.usernameErr}</span><span> {this.state.message}</span>
  
       <div className="form-group"> <input type="email" value={email} name="email" onChange={this.handleChange} className="form-control" id="exampleInputEmail1" placeholder="Email" required /></div>
      <span>{this.state.emailErr}</span>

        <div className="form-group"><input type="text" value={firstname} name="firstname" onChange={this.handleChange} className="form-control" id="exampleInputFirstname1" placeholder="Firstname" required /></div>
        <span>{this.state.firstnameErr}</span>
      

<div className="form-group"><input type="text" value={lastname} name="lastname" onChange={this.handleChange} className="form-control" id="exampleInputLastname1" placeholder="Lastname" required /></div>
<span>{this.state.lastnameErr}</span>

<div className="form-group"><input type="password" value={password} name="password" onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" required/></div>
<span>{this.state.passwordErr}</span>

        <div className="form-group"><input type="text" value={dob} name="dob" onChange={this.handleChange} className="form-control" id="exampleInputDob1" placeholder="Date of Birth" required /></div>
        <span>{this.state.dobErr}</span>
       
<div className="form-group"><input type="text" value={about_me} name="about_me" onChange={this.handleChange} className="form-control" id="exampleInputAbout_me1" placeholder="About_me" required /></div>
<span>{this.state.about_meErr}</span>

<div className="form-group"> <button type="submit" onClick={()=>this.submit()} className="btn">Submit</button></div>
</div>

<a href="/login" > Already have an account? Sign in </a>



      </form>
        )
}
}

export default  Register;
