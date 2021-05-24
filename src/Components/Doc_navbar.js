import React from 'react';
import "./Doc_navbar.css"
//npm install --save react-geocode
import Geocode from "react-geocode";






var lat; //for latitude
var long; // for longitude
var address


//this is a plain javascript api just to get users Lat and Long iff he has provided permission
 if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(getPosition);
   }
   function getPosition(position){
     console.log(position.coords.latitude, position.coords.longitude);
     lat  =     position.coords.latitude;
     long =     position.coords.longitude;
   }

//'AIzaSyDZGcCRjQ7IlinYxqWdMjGZPVd37YZH2VU' The api key
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
//Geocode.setApiKey("AIzaSyDZGcCRjQ7IlinYxqWdMjGZPVd37YZH2VU");
// set response language. Defaults to english.
// Geocode.setLanguage("en");
// Geocode.fromLatLng("19.8811498", "75.36054519").then(
//    response => {
//      address = response.results[0].formatted_address;
//      console.log(address);
//      document.write(address)
//    },
//    error => {
//      console.error(error);
//    }
//  );


class first extends React.Component{  
 
  render()
    {
        return(
<div className="navbar_div">
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
                    <a className="nav-link" href="#">News{address}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Downloads{address}</a>
                  </li>
                </ul>
              </div>
            </nav>
</div>

        ); 


    }



}

export default first;