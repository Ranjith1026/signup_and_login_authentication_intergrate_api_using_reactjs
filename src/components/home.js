import React from 'react';
import {Link} from "react-router-dom";

const Home = () => (
    <div>
      <h2>Home</h2>
  
            <li>  
              <Link to="/register">Sign Up</Link>
            </li>
            
           <li>
              <Link to="/login">LogIn</Link>
            </li>
    </div>
  );
  
export default Home;