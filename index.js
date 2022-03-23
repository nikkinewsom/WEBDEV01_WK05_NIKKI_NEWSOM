import axios from 'axios'
import inquirer from 'inquirer'
import Table from 'cli-table3'
import voca from 'voca'
import { format, fromUnixTime } from 'date-fns'
import questions from './questions.js'
import { API_KEY } from './keys.js'



const main = async (api_key) => {
    try {
        //Asking for the city and state
        let { city, state, option } = await inquirer.prompt(questions)

        //Get the coordinates for the location
        let coords = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},{US}&appid=${api_key}`)
        let { lat, lon } = coords.data[0]

        //Get weather information
        let weather = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${api_key}`)
        let { current, daily } = weather.data

        //Initialize table
        let table = new Table({
            head: ['Date', 'Desc', 'Temp', 'Humidity']
            , colWidths: [15, 20, 20, 15]
        });

        if (option == 'Current Day') {
            // console.log(current)
            let { dt, weather, temp, humidity } = current
            let { description } = weather[0]

            table.push(
                [format(fromUnixTime(dt), 'MM/dd/yyyy'), voca.titleCase(description), `${temp}°`, humidity]
            );

            console.log(table.toString())

        } else {

            // console.log(daily)
            for (const day of daily) {
                // ['Date', 'Desc', 'Temp', 'Humidity']
                let { dt, temp, humidity, weather } = day
                let { day: d, night, eve, morn } = temp
                let { description } = weather[0]
                table.push(

                    [
                        format(fromUnixTime(dt), 'MM/dd/yyyy'),
                        voca.titleCase(description),
                        `
Morn: ${morn}°F
Day: ${d}°F
Eve: ${eve}°F
Night: ${night}°F
`,
                        humidity

                    ]
                )
            }
        }

        console.log(table.toString())
    } catch (error) {
        console.log(error)
    }

}

main(API_KEY)