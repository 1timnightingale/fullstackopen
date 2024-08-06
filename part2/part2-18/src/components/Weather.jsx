const Weather = ({ weatherObject }) => {

    if (weatherObject === '') {
        return (null)
    }
    else {
        const weatherIcon = `https://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`
        return (

            < div >
                <p>Weather</p>
                <table>
                    <thead>
                        <tr>
                            <td>Temperature</td>
                            <td>{weatherObject.main.temp}°C</td>
                        </tr>
                        <tr>
                            <td>Observation</td>
                            <td>{weatherObject.weather[0].main}</td>
                        </tr>
                    </thead>
                </table>
                <img src={weatherIcon} />

            </div >
        )
    }
}


export default Weather