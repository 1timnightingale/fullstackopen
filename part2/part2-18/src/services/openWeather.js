import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const appid = import.meta.env.VITE_OWAPPID

// run with 
// export VITE_OWAPPID=xxxxxxx && npm run dev
// must start with VITE_

const getCurrentWeather = (lat, lon) => {
    const OWlat = `lat=${lat}`
    const OWlon = `lon=${lon}`
    const OWappid = `appid=${appid}`

    const request = axios.get(`${baseUrl}?${OWlat}&${OWlon}&${OWappid}&units=metric`)
    return request.then(response => response.data)
}

export default { getCurrentWeather }