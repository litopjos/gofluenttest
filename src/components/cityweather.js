/* -----------------------------------------------
FILE: cityweather.js

DESCRIPTION:
This component outputs selected weather data on the
view when its onSelectedCityChanged() is called with
a particular city name:

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import axios from "axios";
import React from "react";

import {SelectCountryStateCity} from "./selectcountrystatecity";


export class CityWeather extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            //{temp:undefined, humidity:undefined, description:undefined }
            weather: undefined,
            description: undefined,
        }
    }

    render() {

        return (
            <div>
                <SelectCountryStateCity 
                    onSelectedCity = {this.onSelectedCityChanged}
                />

                {this.state.weather && 
                    (
                        <div>
                            <h2>temp: {this.state.weather.temp} celcius</h2>
                            <h2>description: {this.state.weather.description}</h2>
                            <h2>humidity: {this.state.weather.humidity}</h2>
                            <h2>wind: {this.state.weather.wind}</h2>
                            <h2>country: {this.state.weather.country}</h2>
                        </div>
                    )
                }
            </div>
        )
    }

    onSelectedCityChanged = (city)=>{

        // Obtain the weather for the selected city.
//        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a08581bfb9186fe7865e40eecdb9f7d`)
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a08581bfb9186fe7865e40eecdb9f7d`)
        .then(
            (resp)=>{
                console.log(resp);

                alert(`OK. Response:`);

                this.setState(
                    ()=>({
                            weather:{
                                        temp: resp.data.main.temp/10,
                                        description: resp.data.weather[0].description,
                                        humidity: resp.data.main.humidity,
                                        wind: resp.data.wind.speed,
                                        country: resp.data.sys.country
                                    },
                            
                        })
                )
            }
        )
        .catch(
            (error)=>alert(`ERROR: ${error}`)
        )
    }

}