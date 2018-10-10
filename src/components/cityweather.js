/* -----------------------------------------------
FILE: cityweather.js

DESCRIPTION:


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

    onSelectedCityChanged = (city)=>{
        alert(`CityWeather:onSelectedCityChanged()-${city}`);

        // Obtain the weather for the selected city.
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
                                        wind: resp.data.wind.speed
                                    },
                            
                        })
                )
            }
        )
        .catch(
            (error)=>alert(`ERROR: ${error}`)
        )
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
                            <h1>temp: {this.state.weather.temp} celcius</h1>
                            <h1>description: {this.state.weather.description}</h1>
                            <h1>humidity: {this.state.weather.humidity}</h1>
                            <h1>wind: {this.state.weather.wind}</h1>
                        </div>
                    )
                }
            </div>
        )
    }

}