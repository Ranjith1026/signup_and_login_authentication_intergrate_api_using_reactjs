import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './profile.css'



export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            items:[],
            isLoaded: false,
            redirectToReferrer:false,
           
        

        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){ 
        if(sessionStorage.getItem('data'))
        {
        let user = JSON.parse(sessionStorage.getItem('data'));
       console.log(user);
       // const token = user.data.id;
       // console.log(token);
        axios.get(`http://localhost:8000/auth/profile/`+user.data.id)
        .then(res => {
            console.log(res.data);
        this.setState({
            items: res.data,
            isLoaded : true,
            redirectToReferrer: false
        })
        }) 
    }
   /* else{
    this.setState({
        redirectToReferrer: true
        }) 
    } */
}

logout(){
    sessionStorage.setItem("data",'');
 sessionStorage.clear();
 this.setState({redirectToReferrer: true});
}


    render(){

        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'}/>)
          }


  const data=this.state.items;
            return(
                <div><div><button className="butn" type="button" onClick={this.logout}>Log Out</button></div>
                        {   data?
                            <div>
                                <h2>Hi {data.username}, Welcome to User profile registry Application </h2>
                                </div>
                                :<p>Please wait...</p>
                        } 
                        
                        </div>
    )}

}

