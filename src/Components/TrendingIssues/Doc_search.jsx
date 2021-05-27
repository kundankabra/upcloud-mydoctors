import React, { Component } from 'react';
import './Doc_search.css';
import {
    getAutoComplete,
    getDoctorCard,
  } from "../../ApiHandling/DoctorsInformation";
import Cards from './Cards';
import Issue from './Issues';
import Speciality from './Specialities';
import Footer from './Footer';


class Doc_search extends Component {

    constructor(props){
        super(props);
        this.state = {
          searchCity: "",       //City input change state
          searchLocality: "",   //Locality input change state
          value: "",            //Speciality, doctors and clinic input change state
          autoCompleteID: null,
      //below state has default data which will be displayed when the user clicks on search for the first time.
      //(only speciality and doctor name will be displayed in the auto-complete for now. Check "RenderAutoComplete" function to see how it's been displayed )
      // after the user enters some letters into the search, the autocomplete coming after that would be from backend
      autoCompleteJson: [
        [
          "AYURVEDA",
          "GYNAECOLOGIST",
          "DERMATOLOGIST",
          "CARDIOLOGIST",
          "GENERAL PHYSICIAN",
          "HOMOEOPATH",
          "DENTIST",
        ],
        [
          "Radhe Raman Tiwari",
          "Murtaza Shabbir Kankroliwala",
          "Virat Kohli",
        ],
      ],
      isAutocompleteOpen:false,
      Doctors_data:[],  
        };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handle = this.handle.bind(this);
    }


    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  

    
      searchFromCity = (event) => {
        let keyword_A = event.target.value;
        console.log("City:", keyword_A);
        this.setState({
          searchCity: keyword_A,
        });
      };
    
      searchFromLocality = (event) => {
        let keyword_B = event.target.value;
        console.log("Locality", keyword_B);
        this.setState({
          searchLocality: keyword_B,
        });
      };

      onChange_doc = (newValue) => {
        //to close the autocomplete dropdown on complete backspace
        if(newValue.target.value == ""){
          this.setState({isAutocompleteOpen:false});
        }

        this.setState(
          {
            value: newValue.target.value,
            autoCompleteID: newValue.target.value,
          },
          () => {
            this.autoComplete();
            //this.itemsArrayFilter();
          }
        );
      };
      onChange_doc1 = (newValue, e) => {
        e.preventDefault();
        this.setState(
          {
            value: newValue,
            autoCompleteID: newValue,
          },
          () => {
            //this.itemsArrayFilter();
            //this.GetCards();
          }
        );
      };


   //backend call function to get the card data after search entered
  //  async GetCards() {
  //   const response = await getDoctorCard(this.state.value)
  //     .then((response) => {
  //       console.log("card data from backend", response.data);
  //       this.setState({
  //         Doctors_data: response.data,
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // }    

      // auto complete real time function
  async autoComplete() {
    console.log(this.state.autoCompleteID);
    const response = await getAutoComplete(this.state.autoCompleteID)
      .then((response) => {
        console.log(response);
        this.setState({ autoCompleteJson: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Set the wrapper ref
   */
   setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({isAutocompleteOpen:false});
    }
  }

  handle = (value,e)=>{
    e.preventDefault();
    this.props.updateState(value)
  }
    
      renderAutoComplete = () => {
        return (
          <div ref={this.setWrapperRef}>
            {this.state.autoCompleteJson[0].map((auto, index) => (
              <div>
                {index <= 4 ? (
                  <div
                    className="Doc_search_autoCompleteOption"
                    onClick={(e) => {
                      this.onChange_doc1(auto, e);
                      this.setState({ isAutocompleteOpen: false });
                       this.handle(auto,e)            
                    }}
                    onBlur={() => {
                      this.setState({ isAutocompleteOpen: false });
                    }}
                  >
                    <span>{auto}</span> <span>speciality</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
            {this.state.autoCompleteJson[1].map((auto, index) => (
              <div>
                {index <= 2 ? (
                  <div
                    className="Doc_search_autoCompleteOption"
                    onClick={(e) => {
                      this.onChange_doc1(auto, e);
                      this.setState({ isAutocompleteOpen: true });
                      this.props.updateState(auto, e.target.value);
                    }}
                  >
                    <span>{auto}</span> <span>doctor</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>
        );
      };
    
    render() {
        return (
          <div>
            {/*Parallex scrolling effect*/}
            <div className="Doc_search_parallax">
              <div className="row first_search_row ">
                <div className="col-sm-4 d-flex justify-content-center search_city_col">
                  {/* ---Search for city ---*/}
                  <div className="form-group has-search">
                    <span class="fa fa-search form-control-city"></span>
                    <input
                      type="text"
                      className="search_city form-control"
                      onChange={(e) => this.searchFromCity(e)}
                      autoComplete="off"
                      placeholder="City"
                    />
                    {/* <select
                      className="search_city form-control"
                      onChange={this.searchFromCity}
                      id="state"
                    >
                      <option value="" disabled selected>City</option>
                      {this.filterCity().map((state, index) => (<option value={state} key={index}>{state}</option>))}
                    </select> */}

                    <div className="detect_location">detect my location</div>
                  </div>
                </div>

                {/* ---Search for speciality, doctors, clinic and services---*/}
                <div className="col-sm-8 d-flex justify-content-start search_doctors_col">
                  <div className="input form-group has-search">
                    <span class="fa fa-search form-control-doctors"></span>
                    <input
                      type="search"
                      className="search_doctors form-control"
                      onChange={this.onChange_doc}
                      placeholder="Search for Doctors, Clinics, Services & more.."
                      value={this.state.value}
                      onClick={() =>
                        this.setState({ isAutocompleteOpen: true })
                      }
                    />
                  </div>
                  {this.state.isAutocompleteOpen && (
                    <div className="Doc_search_autoComplete">
                      {this.renderAutoComplete()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Cards />
            <Issue />
            <Speciality />
            <Footer />
          </div>
        );
    }
}

export default Doc_search;