import React, { Component } from 'react';
import Doc_search from './TrendingIssues/Doc_search';
import Doc_filters from  './DocFilters/Doc_filters';

class Doc_Parent extends Component {
    constructor(props){
        super(props);
        this.state={
            showSearch:true,
            autocompleteValue: "dummy",
            selectedCityValue:"",
        }
        this.updateState = this.updateState.bind(this);
    }

    toggleSearch =()=>{
        this.setState({showSearch:false});
    }

    updateState = (value) =>{
        this.setState({
            autocompleteValue:value
        }, ()=>{
            this.toggleSearch();
        });
        
    }

    render() {
        return (
            <div>
            {this.state.showSearch?
                <Doc_search
                autocompleteValue= {this.state.autocompleteValue}
                selectedCityValue = {this.state.selectedCityValue}
                updateState={this.updateState}
                />
                :
                <Doc_filters
                autocompleteValue= {this.state.autocompleteValue}
                selectedCityValue = {this.state.selectedCityValue}
                updateState={this.updateState}
                />
            }
            </div>
        )
    }
}

export default Doc_Parent;