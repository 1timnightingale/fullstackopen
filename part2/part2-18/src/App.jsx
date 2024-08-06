import { useState, useEffect } from "react"
import countryService from "./services/countries"
import openWeatherService from "./services/openWeather"
import FilterCountries from "./components/FilterCountries"
import Countries from "./components/Countries"
import CountryDetails from "./components/CountryDetails"
import Weather from "./components/Weather"



function App() {
  const [countryList, setCountryList] = useState([])
  const [displayCountries, setDisplayCountries] = useState(countryList)
  const [filterCountry, setFilterCountry] = useState('')
  const [countryObject, setCountryObject] = useState([])
  const [numberOfDisplayCountries, setNumberOfDisplayCountries] = useState(countryList.length)
  const [weather, setWeather] = useState('')

  useEffect(() => {
    countryService
      .getCountryList()
      .then(initialCountries => {
        setCountryList(initialCountries.sort())
      })
  }, [])


  const handleFilterCountryChange = (event) => {
    if (event.target.value === '') {
      setDisplayCountries(countryList)
      setFilterCountry('')
      setWeather('')
    }
    else {
      setFilterCountry(event.target.value)
      setWeather('')
      const filteredCountries = countryList.filter((country) => RegExp(event.target.value, 'i').test(country.common))
      setDisplayCountries(filteredCountries)
      setNumberOfDisplayCountries(filteredCountries.length)
      if (filteredCountries.length === 1) {
        countryService
          .getCountryDetails(filteredCountries[0].common)
          .then(returnedCountry => {
            setCountryObject(returnedCountry)

            const OWlat = returnedCountry.latlng[0]
            const OWlon = returnedCountry.latlng[1]

            openWeatherService
              .getCurrentWeather(OWlat, OWlon)
              .then(returnedWeather => {
                setWeather(returnedWeather)
              })

          })

      } else {
        setCountryObject([])
      }
    }
  }

  const userSelectedCountry = (userSelectedCountry) => {
    countryService
      .getCountryDetails(userSelectedCountry)
      .then(returnedCountry => {
        setCountryObject(returnedCountry)

        const OWlat = returnedCountry.latlng[0]
        const OWlon = returnedCountry.latlng[1]

        openWeatherService
          .getCurrentWeather(OWlat, OWlon)
          .then(returnedWeather => {
            setWeather(returnedWeather)
          })

      })
    setNumberOfDisplayCountries(1)
    setFilterCountry('')
  }


  ///////////////////// App returned here //////////////////////

  return (
    <>
      <div>
        <h1>Exercises 2.18-2.20</h1>
        <FilterCountries
          filterCountry={filterCountry}
          onChange={handleFilterCountryChange}
        />
        {numberOfDisplayCountries < 11 && numberOfDisplayCountries > 1 ? (<Countries countryList={displayCountries} userSelectedCountry={userSelectedCountry} />) : null}

        {numberOfDisplayCountries === 1 ? (
          <div>
            <CountryDetails countryObject={countryObject} />
            <Weather weatherObject={weather} />
          </div>
        ) : null}


      </div>
    </>
  )
}

export default App
