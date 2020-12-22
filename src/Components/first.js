import React from 'react';
import "./first.css"
import pic from '../images/pic.png';
// import { Button,Navbar, Nav,Form,FormControl} from 'react-bootstrap';


class first extends React.Component{
    render()
    {
        return(
<div className="div2">
            <nav className="navbar navbar-expand-lg sticky-top w-100">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Desk</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">At glance</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Membership</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Contact</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">News</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Downloads</a>
                  </li>
                </ul>
              </div>
            </nav>
 
            <div class="parallax">
              
                <div className="input form-group has-search">
                <span class="fa fa-search form-control-feedback"></span>
                  <input type="text" className="search form-control" placeholder="Search for Doctors, Clinics, Services & more.." />
                </div>
              
            </div>

</div>

        ); 


    }



}

export default first;