import First from './Components/first';
import Cards from './Components/Cards';
import Data from './Components/Data';
import Autosuggest from 'react-autosuggest';
import './App.css';
//import { StickyContainer, Sticky } from 'react-sticky';
import React, { Component } from 'react';
import Select from 'react-select';
//import sortjsonarray from 'sort-json-array';
import './Components/avail.css'

const uniqueInfo = [
  {
    speciality: "Dentist",
  },
  {
    speciality: "Ayurveda",
  },
  {
    speciality: "Dermatologist",
  },
  {
    speciality: "Gynecologist",
  },
  {
    speciality: "Homoeopath",
  },
  {
    speciality: "General Physician",
  },
  {
    speciality: "ENT",
  }
];

const Gender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];


var sortJsonArray = require('sort-json-array');
// pl2h: price low to high
// ph2l: price high to low
const uniqueSort = [
    {
      value : "pl2h",
      label : "Price low to high"
    }, 
    {
      value: "ph2l",
      label : "Price high to low"
    }, 
    {
      value : "rating",
      label : "by Rating"
    }, 
    {
      value : "area",
      label : "by Area"
    },
    {
      value : "experience",
      label : "By experience"
    }
];


// To get Today's Date, which will be used in availability filter
var d = new Date();
var dayToday, dayTomorrow;
console.log(d.getDay())
const dateToday = d.getDay()
if (dateToday === 0){
  dayToday = "sunday";
  dayTomorrow = "monday";
}
else if(dateToday === 1){
  dayToday = "monday";
  dayTomorrow = "tuesday";
}
else if(dateToday === 2){
  dayToday = "tuesday";
  dayTomorrow = "wednesday";
}
else if(dateToday === 3){
  dayToday = "wednesday";
  dayTomorrow = "thursday";
}
else if(dateToday === 4){
  dayToday = "thursday";
  dayTomorrow = "friday";
}
else if(dateToday === 5){
  dayToday = "friday";
  dayTomorrow = "saturday";
}
else if(dateToday === 6){
  dayToday = "saturday";
  dayTomorrow = "sunday";
}





const Price = [
  {
    value : "Below-250",
    label : "Below 250"
  }, 
  {
    value: "251-500",
    label : "251-500"
  }, 
  {
    value : "501-750",
    label : "501-750"
  }, 
  {
    value : "Above-751",
    label : "Above 751"
  }
];


function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  const regex = new RegExp('^' + escapedValue, 'i');

  return uniqueInfo.filter(Data => regex.test(uniqueInfo.speciality));
}

function getSuggestionValue(suggestion) {
  return suggestion.speciality;
}

function shouldRenderSuggestions() {
  return true;
}

function renderSuggestion(suggestion) {
  return (
    <div>
    <div className="suggest">{suggestion.speciality}</div>
    </div>
  );
}


export class App extends Component {

    constructor(){
      super();
      this.myRef = React.createRef();   //for the executeScroll function
      this.state={
        newItems: [],         //array which will render only one time after the starting search
        selectedNewItems:[],  //an array which will render every time after changes like filters
        searchCity : '',      //City input change state
        searchLocality : '',  //Locality input change state
        value: '',            //Speciality, doctors and clinic input change state
        suggestions: [],      //For suggestions on speciality input
        datas : Data,
        availablityToday:'',
        availablityTomorrow : '',         
        selectedGender : '',   //For gender change state,
        sort : '',
        selectedPrice : '',
        availToggle : false,
        clickedDay : '',
        monClicked : false,
        tueClicked : false,
        wedClicked : false,
        thuClicked : false,
        friClicked : false,
        satClicked : false,
        sunClicked : false,
      };
    }
    
    componentDidMount() {
      this.setState({ datas: Data });
      this.setState({ newItems: Data });
      // this.setState({selectedNewItems:Data});
      let filterNav = document.getElementsByClassName("filter_row");
      var stickyTemp = filterNav.OffsetTop;
    }

    filterCity = () => {
      let distinctCity = [];
      this.state.datas.map((obj) => distinctCity.push(obj.city));
      distinctCity = [...new Set(distinctCity)];
      return distinctCity;
    };
    // gettng user input into variables-changing state

    filterLocality = () => {
      let distinctLocality = [];
      //this.state.datas.map((obj) =>distinctLocality.push(obj.area)); 
        this.state.datas.filter((item) => {
          if (this.state.searchCity.toLowerCase()===item.city.toLowerCase()) {
            distinctLocality.push(item.area);
          }
        })
        console.log(distinctLocality,this.state.searchCity)
        distinctLocality = [...new Set(distinctLocality)];
        return distinctLocality;
    };


    searchFromCity=(event)=>{
      let keyword_A = event.target.value;
      console.log('City:',keyword_A)
      this.setState({
        searchCity:keyword_A
      })
    }

    searchFromLocality=(event)=>{
      let keyword_B = event.target.value;
      console.log('Locality',keyword_B)
      this.setState({
        searchLocality:keyword_B
      })
    }


    onChange_doc = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      },() => {
        this.itemsArrayFilter();
    });
      
    };

  handleSort = (sort) => {
    this.setState({sort:sort.value });
    let SORT = sort.value;  
    var des = "des"
    //price low to high
    if (SORT == "pl2h") {
      sortJsonArray(this.state.selectedNewItems,'price')
    }
    //price high to low
    if (SORT == "ph2l") {
      sortJsonArray(this.state.selectedNewItems,'price',des)
    }
    //Rating
    if (SORT == "rating") {
      sortJsonArray(this.state.selectedNewItems,'rating',des)
    }
    //area
    if (SORT == "area") {
      sortJsonArray(this.state.selectedNewItems,'areaNearby')
    }
     //area
     if (SORT == "experience") {
      sortJsonArray(this.state.selectedNewItems,'experience',des)
    }
  }  


  handleAvailablity = (e) =>{
    this.setState(prevState => ({
      availToggle: !prevState.availToggle
    }));
    console.log("avail",this.state.availToggle)
  }

  handleAvailablityToday = (e) => {
   
    this.setState({availablityToday : e.target.value})
      const tempAvailToday = this.state.newItems.filter((item) => {
        var morningSlot = JSON.parse(JSON.stringify(item.workingHours[dayToday].morning.slot));
        var eveningSlot = JSON.parse(JSON.stringify(item.workingHours[dayToday].evening.slot));
        if(morningSlot === -1 && eveningSlot === -1){
          return null
        }
        else{
          return item
        }
      });
      this.setState({selectedNewItems : tempAvailToday})
    }

  handleAvailablityTomorrow = (e) => {
    this.setState({ availablityTomorrow: e.target.value })  
      const tempAvailTomorrow = this.state.newItems.filter((item) => {
        var morningSlot = JSON.parse(JSON.stringify(item.workingHours[dayTomorrow].morning.slot));
        var eveningSlot = JSON.parse(JSON.stringify(item.workingHours[dayTomorrow].evening.slot));
        if(morningSlot === -1 && eveningSlot === -1){
          return null
        }
        else{
          return item
        }
      });
      this.setState({selectedNewItems : tempAvailTomorrow})
  }

  handleAvailablityDays =(e) => {
    this.setState({clickedDay : e.target.value})
    let tempDay = e.target.value
    // switch case used
    switch (tempDay) {
      case "mon":
        this.setState(prevState => ({
          monClicked: !prevState.monClicked
        }));
        const tempMondayClick = this.state.newItems.filter((item) => {
          var morningSlot = JSON.parse(JSON.stringify(item.workingHours["monday"].morning.slot));
          var eveningSlot = JSON.parse(JSON.stringify(item.workingHours["monday"].evening.slot));
          if(morningSlot === -1 && eveningSlot === -1){
            return null
          }
          else{
            return item
          }
        });
        this.setState({selectedNewItems : tempMondayClick})
        break;

      case "tue":
        this.setState(prevState => ({
          tueClicked: !prevState.tueClicked
        }));
        break;

      case "wed":
        this.setState(prevState => ({
          wedClicked: !prevState.wedClicked
        }));
        break;
      case "thu":

        break;
      case "fri":

        break;
      case "sat":

        break;
      case "sun":

        break;
      default:
        break;
    }
  }
    
  handleGender = (selectedGender) => {
      
      this.setState({ selectedGender:selectedGender.value });
      let gender = selectedGender.value;
      const temp = this.state.newItems.filter((item) => {
        if (item.gender.toLowerCase()===gender.toLowerCase()) {
          console.log("found",item.gender)
          return item;
        }
        else {
          return null
        }
      })
     
      this.setState({
        selectedNewItems: temp,
        // newItems : temp
      })
    };

  handlePrice = (selectedPrice) => {
    this.setState({selectedPrice : selectedPrice.value});
    let price = selectedPrice.value;

    const tempPrice = this.state.newItems.filter((item) => {
      if (price === "Below-250") {
        if (item.price <= 250) {
          console.log("found", item.price)
          return item;
        }
        else {
          return null
        }
      }
      if (price === "251-500") {
        if (item.price > 250 && item.price <=500) {
          console.log("Pahuchaaaaa", item.price)
          return item;
        }
        else {
          return null
        }
      }
      if (price === "501-750") {
        if (item.price > 500 && item.price <=750) {
          console.log("found", item.price)
          return item;
        }
        else {
          return null
        }
      }
      if (price === "Above-751") {
        if (item.price > 750) {
          console.log("found", item.price)
          return item;
        }
        else {
          return null
        }
      }
    })

    this.setState({
      selectedNewItems: tempPrice,
    })
  };  

    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

    executeScroll = () => this.myRef.current.scrollIntoView()

    itemsArrayFilter = () => {
      const items = Data.filter(data => {
        if (this.state.value == null) {
          return null;
        }
        if (this.state.value === "") {
          return null;
        }
        else if (data.city.toLowerCase().includes(this.state.searchCity.toLowerCase())) {

          if (data.area.toLowerCase().includes(this.state.searchLocality.toLowerCase())) {

            if (data.doctorName.toLowerCase().includes(this.state.value.toLowerCase()) || data.speciality.toLowerCase().includes(this.state.value.toLowerCase()) || data.clinicName.toLowerCase().includes(this.state.value.toLowerCase())) {
              { this.executeScroll() }
              return data;
            }
          }
        }
        else {
          return null
        }    
    }) 
    this.setState({
      newItems : items
    })
    this.setState({
      selectedNewItems : items
    })
  }

    renderCards = () => {
      return(
      this.state.selectedNewItems.map ((data) =>(         
        <div className="col-4 col-xs-12 cardsColumn">
          <Cards
            experience={data.experience}
            doctorName={data.doctorName}
            speciality={data.speciality}
            rating={data.rating}
            clinicName={data.clinicName}
            price={data.price}
            feedbackNumber={data.feedbackNumber}
            areaNearby={data.areaNearby}
            area={data.area}
            city={data.city}
          />
       </div>)))
    }
    
  render(){
    const { value, suggestions, selectedGender, newItems, selectedPrice} = this.state;
    const input_doc = {
      placeholder: "Search for Doctors, Clinics, Services & more..",
      value,
      onChange: this.onChange_doc,
      className : "search_doctors form-control"
    };

    const input_doc_InFilter = {
      placeholder: "Search for Doctors, Clinics, Services & more..",
      value,
      onChange: this.onChange_doc,
      className : "search_doctorsInFilter form-control"
    };

// 
    
      // if(data.gender.toLowerCase().includes(this.state.selectedGender.toLowerCase())){
      //   return data;
      // }
      // else{
      //   return null;
      // }
    return(
  <div>
      <First/>

        <div class="parallax">
          <div className="row first_search_row ">

            <div className="col-sm-3 search_city_col">
              {/* ---Search for city ---*/}
              <div className="form-group has-search">
                <span class="fa fa-search form-control-city"></span>
                <select
                  className="search_city form-control"
                  onChange={this.searchFromCity}
                  id="state"
                >
                  <option value="" disabled selected>
                    Select City
                  </option>
                  {this.filterCity().map((state, index) => (
                    <option value={state} key={index}>
                      {state}
                    </option>
                  ))}
                </select>
                <div className="detect_location"><a>detect my location</a></div>
              </div>
              {/* <input type="text" className="search_city form-control" onChange={(e)=>this.searchFromCity(e)} autoComplete="off" placeholder="City" /> */}
              {/*---Search for locality--*/}
              <div className="form-group has-search">
                <span class="fa fa-search form-control-locality"></span>
                {/* <input
                  type="text"
                  className="search_locality form-control"
                  placeholder="Locality"
                  onChange={this.searchFromLocality}
                  value={this.state.searchLocality}
                /> */}
                <select
                  className="search_locality form-control"
                  onChange={this.searchFromLocality}
                  // value={this.state.searchLocality}
                  id="locality"
                >
                  <option value="" disabled selected>
                    Select City
                  </option>
                  {this.filterLocality().map((locality, index) => (
                    <option value={locality} key={index}>
                      {locality}
                    </option>
                  ))}
                </select>  
              </div>
            </div>

            {/* ---Search for speciality, doctors, clinic and services---*/}
            <div className="col-sm-6 search_doctors_col">
              <div className="input form-group has-search">
                <span class="fa fa-search form-control-doctors"></span>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  shouldRenderSuggestions={shouldRenderSuggestions}
                  renderSuggestion={renderSuggestion}
                  inputProps={input_doc} />
                {/* <div className="detect_location">{this.state.selectedNewItems.length}</div> */}
              </div>
            </div>

            <div className="col-sm-3">

            </div>
          </div>
        </div>  
{/* ------------------Container of cards and filter--------------------------------------------------------------------------- */}
      <div ref={this.myRef} className="Cards_container">
        
    {/*------------ if no doctor found----------------- */}
       
        {this.state.selectedNewItems.length === 0 &&
          <h3>No doctor found</h3>
        }

    {/* -------------if Doctors are Found----------------- */}

        {this.state.selectedNewItems.length > 0 &&
        <div>
            
                <div className="row filter_row">
                  <div className="col-sm-4 cityandlocality_colInFilter">

                    <div className="form-group has-search">
                      {/* <span class="fa fa-search form-control-city"></span> */}
                      <select
                        className="search_cityInFilter form-control"
                        onChange={this.searchFromCity}
                        id="state"
                      >
                        <option value="" disabled selected>
                          City
                        </option>
                        {this.filterCity().map((state, index) => (
                          <option value={state} key={index}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <div className="detect_location"><a>detect my location</a></div>
                    </div>

                    <div className="form-group has-search">
                      {/* <span class="fa fa-search form-control-locality"></span> */}
                      <input type="text" className="search_localityInFilter form-control" placeholder="Locality" />
                    </div>
                  </div>

                  <div className="col-sm-4 doctor_colInFilter">
                    
                    <div className="input form-group has-search">
                      {/* <span class="fa fa-search form-control-doctors"></span> */}
                      <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        shouldRenderSuggestions={shouldRenderSuggestions}
                        renderSuggestion={renderSuggestion}
                        inputProps={input_doc_InFilter} />
                      <div className="detect_location">You have {this.state.selectedNewItems.length} search results</div>
                    </div>

                      {/*=====SORT======*/}
                    <div>  
                    <Select
                      className="selectSort"
                      value={this.state.sort}
                      onChange={this.handleSort}
                      options={uniqueSort}
                      placeholder="Sort"
                    />
                    <div className="detect_location">{this.state.sort}</div>                    
                    </div>      
                  </div>

                  <div class="col-sm-4 availablity_colinFilter">
                   <div> <button className="availablity" onClick={this.handleAvailablity}>Availability</button>
                  {this.state.availToggle &&
                    <div className="availDropDown">
                      <div className="availCards">
                        <div className="availCards_row-1">
                          <span className="Cards_avail">Availability</span>
                        </div>
                        <div className="availCards_row-2">
                          <a href="#" className="Today" ><button className="btn" onClick={this.handleAvailablityToday}>today</button></a>
                          <hr />
                          <a href="#" className="Tomo"><button className="btn" onClick={this.handleAvailablityTomorrow}>tomorrow</button></a>
                          <hr />
                        </div>

                        <div className="availCards_row-3">
                          <div className="Cards_button_div">
                            <a href="#">
                              <button className="Mon" onClick={this.handleAvailablityDays} value="mon">M</button>
                            </a>

                            <a href="#">
                              <button className="Mon" onClick={this.handleAvailablityDays} value="tue">T</button>
                            </a>

                            <a href="#">
                              <button className="Mon" onClick={this.handleAvailablityDays} value="wed">W</button>
                            </a>

                            <a href="#">
                              <button className="Mon" onClick={this.handleAvailablityDays} value="thu">T</button>
                            </a>

                            <a href="#">
                              <button className="Mon" onClick={this.handleAvailablityDays} value="fri">F</button>
                            </a>

                            <a href="#">
                              <button className="Mon" onClick={this.handleAvailablityDays} value="sat">S</button>
                            </a>
                            <a href="#">
                              <button className="Mon" onClick={this.handleAvailablityDays} value="sun">S</button>
                            </a>
                          </div>
                        </div>
                        <div className="availCards_row-4">
                          <div className="Cards_button_div">
                            <a href="#">
                              <button className="Cards_morn">Morning</button>
                            </a>

                            <a href="#">
                              <button className="Cards_after">Afternoon</button>
                            </a>

                            <a href="#">
                              <button className="Cards_even">Evening</button>
                            </a>
                          </div>
                          <div className="Cards_button_time">

                          </div>
                        </div>
                      </div>
                    </div>}
                    </div>
                    {/* <select
                      className="availablity form-control"
                    
                      id="availablity"
                     >
                      <option value="" disabled selected>
                        Availablity
                      </option>
                      <option   onChange={this.handleAvailablityToday} value="today">
                        Today
                      </option>
                      <option   onChange={this.handleAvailablityTomorrow} value="tomorrow">
                        Tomorrow
                      </option>
                    </select> */}
                  <div className="gender">
                    <Select
                      className="selectGender"
                      value={selectedGender}
                      onChange={this.handleGender}
                      options={Gender}
                      placeholder="Gender"
                    />
                    <div className="detect_location">{this.state.selectedGender}</div>  
                  </div>
                  <div>            
                  <Select
                      className="selectPrice"
                      value={selectedPrice}
                      onChange={this.handlePrice}
                      options={Price}
                      placeholder="Price"
                    />
                    <div className="detect_location">{this.state.selectedPrice}</div>
                  </div>
                  </div>
                </div>
           
          <div className="row row_of_cards">
            {this.renderCards()}
          </div>
          </div>
        }
        
      </div>
     
      </div>
    ) 
  }
}
export default App