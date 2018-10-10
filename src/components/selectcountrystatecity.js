/* -----------------------------------------------
FILE: selectcountrystatecity.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */
import React from "react";

import Select from "react-select";

var countryStateCityStore  = require('country-state-city');
export class SelectCountryStateCity extends React.Component {

    onSelCountryChanged = (event)=>{
//        alert(event.value);

        let states = countryStateCityStore.getStatesOfCountry(event.value);
        let stateOptions = this.xlateDataToValueLabel(states);

        console.log (states);

        this.setState(
            ()=>({choicesState:stateOptions})
        )

    }

    onSelStateChanged = (event)=>{
//        alert(`state changed`);

        let cities = countryStateCityStore.getCitiesOfState(event.value);
        let citiesOptions = this.xlateDataToValueLabel(cities);

        console.log (cities);

        this.setState(
            ()=>({choicesCity:citiesOptions})
        )        
    }    

    onSelCityChanged = (event)=>{
//        alert(`city changed: ${event.value} - ${event.label}`);

        this.props.onSelectedCity(event.label);


    }        

    xlateDataToValueLabel = (countries)=>{
        let valueLabel = [];
        countries.forEach(
            (country)=>{
                valueLabel.push({value:country.id, label:country.name})
            }
        )
        return valueLabel;
    }



    constructor(props) {
        super(props);


        // Get all known country info
        let countries = countryStateCityStore.getAllCountries();
        let countryOptions = this.xlateDataToValueLabel(countries);

        console.log(countryOptions);

        console.log(countryOptions);

        this.state = {
            choicesCountries: countryOptions,
            choicesState: [],    
            choicesCity: []
        }
    }

    render() {
 
        return (
            <div>
            
                <div>
                    <label>Select Country:</label>

                    <Select
                        onChange = {this.onSelCountryChanged}
                        options = {this.state.choicesCountries}
                    />
                </div>

                <div>
                    <label>Select State/Province/Region:</label>

                    <Select
                        onChange = {this.onSelStateChanged}
                        options = {this.state.choicesState}
                    />
                </div>             
                
                <div>
                    <label>Select City:</label>

                    <Select
                        onChange = {this.onSelCityChanged}
                        options = {this.state.choicesCity}
                    />
                </div>                       

            </div>

        );
    }
}
