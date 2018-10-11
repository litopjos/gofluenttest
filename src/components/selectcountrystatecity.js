/* -----------------------------------------------
FILE: selectcountrystatecity.js

DESCRIPTION:
This component renders 3 dropdown select boxes on
the view. Using data obtained from the 3rd party 
'country-state-city' component, the first select
box is filled up with all the country names. When
the user selects a particular country, its regions/provinces
is then enumerated in the 2nd control. When the user selects
a particular region/province, that rergion's cities 
is then enumerated on the 3rd control. When the user
selects a particular city, the specified callback
is called.

props:
onSelectedCity(cityName) <=== callback function

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import React from "react";
import Select from "react-select";

var countryStateCityStore  = require('country-state-city');

export class SelectCountryStateCity extends React.Component {

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
                    <label className="label">Select Country:</label>

                    <Select
                        onChange = {this.onSelCountryChanged}
                        options = {this.state.choicesCountries}
                    />
                </div>

                <div>
                    <label className="label">Select State/Province/Region:</label>

                    <Select
                        onChange = {this.onSelStateChanged}
                        options = {this.state.choicesState}
                    />
                </div>             
                
                <div>
                    <label className="label">Select City:</label>

                    <Select
                        onChange = {this.onSelCityChanged}
                        options = {this.state.choicesCity}
                    />
                </div>                       

            </div>

        );
    }

    onSelCountryChanged = (event)=>{
//        alert(event.value);

        let states = countryStateCityStore.getStatesOfCountry(event.value);
        let stateOptions = this.xlateDataToValueLabel(states);

        console.log (states);

        this.setState(
            ()=>({choicesState:stateOptions, choicesCity: []})
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




}
