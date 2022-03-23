import axios from 'axios'
import inquirer from 'inquirer'
import questions from './questions.js'

const API_KEY = '537f908bbd5ea304b77d8b22610e2945'


//pass that info back to user

const main = async (api_key) => {


    try {
        //Asking for the city and state
        let { city, state, option } = await inquirer.prompt(questions)


        //Get the coordinates for the location
        let coords = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},{US}&appid=${api_key}`)
        let { lat, lon } = coords.data[0]


        let weather = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${api_key}`)
        console.log(weather.data)
    } catch (error) {
        console.log(error)

    }


}

main(API_KEY)