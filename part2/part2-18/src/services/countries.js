import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountryList = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response =>
        response.data
            .sort((a, b) => a.name.common > b.name.common ? 1 : -1)
            .map((country) => (country.name)))
}

const getCountryDetails = (countryName) => {
    const request = axios.get(encodeURI(`${baseUrl}/name/${countryName}`))
    return request.then(response => response.data)
}

export default { getCountryList, getCountryDetails }
