import React from 'react';
import "./first.css"
import pic from '../images/pic.png';
// import { Button,Navbar, Nav,Form,FormControl} from 'react-bootstrap';


class first extends React.Component{
    render()
    {
        return(
<div className="div2">
            
 
            <div class="parallax">
                
                <div class="row">
                <div class="col-2">
            <div className="input form-group has-search">
                
                <div class="fa fa-map-marker form-control-feedback"></div>
                 
                  <input type="text" className="search form-control" placeholder="City" />
               
                </div>
               </div> 
               <div class="col-2">
               <div className="input form-group has-search">
                
            <div class="fa fa-map-marker form-control-feedback"></div>
               
                  <input type="text" className="search form-control" placeholder="Locality" />
                  </div>
                  </div>
                  <div class="col-2">
                  <div className="input form-group has-search">
                
                <div class="fa fa-search form-control-feedback"></div>
                
             <input type="text" className="search form-control" placeholder="Search for " />
                </div>
                </div>

                <div class="col-2">
                  <div class="dropdown">
                    <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown">
                      Availability
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Today</a>
                      <a class="dropdown-item" href="#">Tomorrow</a>
                    </div>
                  </div>
                </div>
        
        
                <div class="col-2">
                  <div class="dropdown">
                    <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown">
                      Gender
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Male</a>
                      <a class="dropdown-item" href="#">Female</a>
                    </div>
                  </div>
                </div>


                <div class="col-2">
                  <div class="dropdown">
                    <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown">
                      Fees
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">100-700</a>
                      <a class="dropdown-item" href="#">700-1500</a>
                    </div>
                  </div>
                </div>
                </div>
                </div>
            

</div>

        ); 


    }



}

export default first;