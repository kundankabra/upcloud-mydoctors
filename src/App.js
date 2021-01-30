import First from './Components/first';
import Cards from './Components/Cards';
import Data from './Components/Data';
import './App.css';
import React, { Component } from 'react';
import Select from 'react-select';
import './Components/avail.css';
import {getDoctors} from './ApiHandling/SearchDoc';


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
  { value: 'male', label: 'Male' , class: 'gender' },
  { value: 'female', label: 'Female',  class: 'gender' }
];



var sortJsonArray = require('sort-json-array');
// pl2h: price low to high
// ph2l: price high to low
const uniqueSort = [
    {
      value : "pl2h",
      label : "Price low to high",
      class: 'price'
    }, 
    {
      value: "ph2l",
      label : "Price high to low",
      class: 'price'
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
    label : "Below 250",
    class: "price",
    ll:0,
    ul:250
  }, 
  {
    value: "251-500",
    label : "251-500",
    class: "price",
    ll:251,
    ul:500
  }, 
  {
    value : "501-750",
    label : "501-750",
    class: "price",
    ll:501,
    ul:750
  }, 
  {
    value : "Above-751",
    label : "Above 751",
    class: "price",
    ll:751,
    ul:10000
  }
];

function renderSuggestion(suggestion) {
  return (
    <div>
    <div className="suggest">{suggestion.speciality}</div>
    </div>
  );
}


export class App extends Component {

    constructor(props){
      super(props);
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
        selectedGender : null,   //kept null for testing an bug
        sort : '',
        selectedPrice : null,     //kept null for testing an bug
        availToggle : false,
        clickedDay : '',
        dayClicked : '',
        filters : {
          price: '',
          gender: ''
        }
      };
    }
    
 componentDidMount() {
      this.setState({ datas: Data });
      this.setState({ newItems: Data });
     
      // this.setState({selectedNewItems:Data});
      // const {getDoctors} = this.props;
      // console.log(getDoctors)
      // getDoctors('https://project31-heroku.herokuapp.com/api/v11/user/search/autoComplete')
      // .then((data)=> console.log(data))
      // .catch((error)=> console.log(error));
      let temp = "a"
      fetch('https://project31-heroku.herokuapp.com/api/v11/user/search/autoComplete/', {
         method: 'GET',
         body: JSON.stringify({'keyword':temp}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          }
     }).then(res =>res.json())
      .then(data => console.log(data))
       .catch(err => console.error("Error:", err)); 
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


     onChange_doc = (newValue) => {
      //const url = `https://project31-heroku.herokuapp.com/api/v11/user/search/autoComplete`;
    //   const url = 'http://localhost:5000/api/v11/user/search/autoComplete'
    //   var data = {keyword: newValue.target.value}
    //   axios.get(url,{params:{keyword:'a'}})
    //   .then((data) => {
    //     console.log("data",data)
    //    })
    //    .catch((error) => {console.log(error)})
    console.log(getDoctors())
       this.setState({
         value: newValue.target.value
       },() => {
         this.itemsArrayFilter();  
     });
     };  

  handleSort = (sort) => {
    this.setState({sort:sort.value });
    let SORT = sort.value;  
    var des = "des"
    //price low to high
    if (SORT === "pl2h") {
      sortJsonArray(this.state.selectedNewItems,'price')
    }
    //price high to low
    if (SORT === "ph2l") {
      sortJsonArray(this.state.selectedNewItems,'price',des)
    }
    //Rating
    if (SORT === "rating") {
      sortJsonArray(this.state.selectedNewItems,'avgRating',des)
    }
    //area
    if (SORT === "area") {
      sortJsonArray(this.state.selectedNewItems,'areaNearby')
    }
     //area
     if (SORT === "experience") {
      sortJsonArray(this.state.selectedNewItems,'experience',des)
    }
  }  


  handleAvailablity = (data) =>{
     this.setState(prevState => ({
       availToggle: !prevState.availToggle
     }));
    // console.log("avail",this.state.availToggle)
    
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

  handleAvailablityDays = (e) =>{
    this.setState({dayClicked:e.target.value});
    console.log(this.state.dayClicked);
    this.renderNew();
  }

  availablity(morningslot, eveningslot){
     if(morningslot === "-1" && eveningslot === "-1"){
       return false;
     }
     else{
       return true;
     }
  }
  
  
  renderNew =()=>{
    let upper =10000 , lower = 0;
      Price.map((pri)=>{
        if(this.state.filters.price === pri.value){
          upper = pri.ul;
          lower = pri.ll
        }
      })
      const {workingHours=[]} = this.state.datas;
      const {day = {}} = workingHours;
      const {morning={}} = day;
      const {slot=''} = morning;
    const temp = []
      this.state.datas.map((data)=>{  
        let morningSlot = JSON.parse(JSON.stringify(data.slot));
        let eveningSlot = JSON.parse(JSON.stringify(data.slot));  
        console.log("hehhed",morningSlot,eveningSlot)
        if((data.gender === this.state.filters.gender || this.state.filters.gender === "") && (data.price <= upper && data.price >= lower) 
     && this.availablity(morningSlot,eveningSlot) ){
        console.log("newData",data)
         temp.push(data);         
      }
    })
    console.log("hahaha",temp)
    this.setState({selectedNewItems:temp})
  }

  handleFilter = (filter) => {
    // let filterName = filter.value
    //console.log(filter.class)
    for(let key in this.state.filters){
      if(filter.class === key){
        let temp = this.state.filters;
        temp[key] = filter.value;
        this.setState({filters : temp})
      }
    }
    console.log("filters",this.state.filters)
    this.renderNew();
  }

    executeScroll = () => this.myRef.current.scrollIntoView() // for exceuting scroll

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

            if (data.name.toLowerCase().includes(this.state.value.toLowerCase()) || data.primarySpeciality.toLowerCase().includes(this.state.value.toLowerCase()) || data.clinicName.toLowerCase().includes(this.state.value.toLowerCase())) {
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
      newItems : items,
      selectedNewItems : items
    })
  }

    renderCards = () => {
      return(
      this.state.selectedNewItems.map ((data) =>(         
        <div className="col-4 col-xs-12 cardsColumn">
          <Cards
            experience={data.experience}
            doctorName={data.name}
            speciality={data.primarySpeciality}
            rating={data.avgRating}
            clinicName={data.clinicName}
            price={data.price}
            feedbackNumber={data.feedbackCount}
            areaNearby={data.areaNearby}
            area={data.area}
            city={data.city}
          />
       </div>)))
    }
    
  render(){
    const {selectedGender, selectedPrice} = this.state;

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
                    City 
                  </option>
                  {this.filterCity().map((state, index) => (
                    <option value={state} key={index}>
                      {state}
                    </option>
                  ))}
                </select>
                <div className="detect_location">detect my location</div>
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
                    Locality
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
                <input
                  className="search_doctors form-control"
                  onKeyPress={this.onChange_doc}
                  placeholder="Search for Doctors, Clinics, Services & more.."
                />
              </div>
            </div>

            <div className="col-sm-3">

            </div>
          </div>
        </div>  
{/* ------------------Container of cards and filter--------------------------------------------------------------------------- */}
      <div ref={this.myRef}  className="Cards_container">
        
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
                    <div className="detect_location">detect my location</div>
                  </div>

                  <div className="form-group has-search">
                    {/* <span class="fa fa-search form-control-locality"></span> */}
                    <input type="text" className="search_localityInFilter form-control" placeholder="Locality" />
                  </div>
                </div>

                <div className="col-sm-4 doctor_colInFilter">

                  <div className="">
                    {/* <span class="fa fa-search form-control-doctors"></span> */}
                  <input
                    className="search_doctorsInFilter form-control"
                    onKeyPress={this.onChange_doc}
                    placeholder="Search for Doctors, Clinics, Services & more.."
                  />
                    <div className="detect_location">You have {this.state.selectedNewItems.length} search results</div>
                  </div>

                  {/*=====SORT======*/}
                  <div className="">
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

                <div class="col-sm-4 availablity_colinFilter" >
                  <div >     
                    <button className="availablity"  onClick={this.handleAvailablity}>Availability</button>
                    {this.state.availToggle &&
                      <div className="availDropDown"  >
                        <div className="availCards">
                          <div className="availCards_row-1">
                            <span className="Cards_avail">Availability</span>
                          </div>
                          <div className="availCards_row-2">
                            <button className="Today" onClick={this.handleAvailablityToday}>today</button>
                            <hr />
                            <button className="Tomo" onClick={this.handleAvailablityTomorrow}>tomorrow</button>
                            <hr />
                          </div>

                          <div className="availCards_row-3">
                            <div className="Cards_button_div">
                              <button className="Mon" onClick={this.handleAvailablityDays} value="monday">M</button>
                              <button className="Mon" onClick={this.handleAvailablityDays} value="tuesday">T</button>
                              <button className="Mon" onClick={this.handleAvailablityDays} value="wednesday">W</button>
                              <button className="Mon" onClick={this.handleAvailablityDays} value="thursday">T</button>
                              <button className="Mon" onClick={this.handleAvailablityDays} value="friday">F</button>
                              <button className="Mon" onClick={this.handleAvailablityDays} value="saturday">S</button>
                              <button className="Mon" onClick={this.handleAvailablityDays} value="sunday">S</button>
                            </div>
                          </div>
                          <div className="availCards_row-4">
                            <div className="Cards_button_div">
                              <button className="Cards_morn">Morning</button>
                              <button className="Cards_after">Afternoon</button>
                              <button className="Cards_even">Evening</button>
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
                      onChange={this.handleFilter}
                      options={Gender}
                      placeholder="Gender"
                    />
                    <div className="detect_location">{this.state.filters.gender}</div>
                  </div>
                  <div>
                    <Select
                      className="selectPrice"
                      value={selectedPrice}
                      onChange={this.handleFilter}
                      options={Price}
                      placeholder="Price"
                    />
                    <div className="detect_location">{this.state.filters.price}</div>
                  </div>
                </div>
              </div>

              <div  className="row row_of_cards">
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