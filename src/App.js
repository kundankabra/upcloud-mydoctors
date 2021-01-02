import First from './Components/first';
import Cards from './Components/Cards';
import Data from './Components/Data';
import Autosuggest from 'react-autosuggest';
import './App.css';
import { StickyContainer, Sticky } from 'react-sticky';
import React, { Component } from 'react';
import Select from 'react-select'
import sortjsonarray from 'sort-json-array';

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
    }
];

var sortJsonArray = require('sort-json-array');

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
        selectedGender : '',   //For gender change state,
        sort : ''
      };
    }
    
    componentDidMount() {
      this.setState({ datas: Data });
      this.setState({ newItems: Data });
      // this.setState({selectedNewItems:Data});
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
      sortJsonArray(this.state.newItems,'price')
    }
    //price high to low
    if (SORT == "ph2l") {
      sortJsonArray(this.state.newItems,'price',des)
    }
    //Rating
    if (SORT == "rating") {
      sortJsonArray(this.state.newItems,'rating',des)
    }
    //area
    if (SORT == "area") {
      sortJsonArray(this.state.newItems,'areaNearby')
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
        newItems : temp
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
        <div className="col-4 col-xs-12">
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
    const { value, suggestions, selectedGender, newItems} = this.state;
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
            <StickyContainer>
              <Sticky>{() =>
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

                  <div className="col-sm-3 doctor_colInFilter">
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
                  </div>

                  {/*=====SORT======*/}
                  <div class="col-1">
                    <Select
                      className="selectSort"
                      value={this.state.sort}
                      onChange={this.handleSort}
                      options={uniqueSort}
                      placeholder="Sort"
                    />
                    <div className="detect_location">{this.state.sort.label}</div>                    
                  </div>

                  <div class="col-1">
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

                  <div class="col-1">
                    <Select
                      className="selectGender"
                      value={selectedGender}
                      onChange={this.handleGender}
                      options={Gender}
                      placeholder="Gender"
                    />
                    <div className="detect_location">{this.state.selectedGender}</div>  
                  </div>

                  <div class="col-1">
                    <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Price
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>

                </div>}
              </Sticky>
            </StickyContainer>
           
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