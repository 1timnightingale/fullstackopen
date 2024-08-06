import Languages from "./Languages"

const CountryDetails = ({ countryObject }) => {

    const langObject = countryObject.languages



    if (countryObject.length !== 0) {

        return (

            < div >
                <h2>Country Details</h2>
                <h3>{countryObject.name.common}</h3>
                <table>
                    <thead>
                        <tr>
                            <td>Capital</td>
                            <td>{countryObject.capital}</td>
                        </tr>
                        <tr>
                            <td>Area</td>
                            <td>{countryObject.area}</td>
                        </tr>
                    </thead>
                </table>

                <p>Languages</p>
                <Languages langObject={langObject} />

                <p>National Flag</p>
                <img src={countryObject.flags.png} />

            </div >
        )
    }
    else {
        return null
    }
}


export default CountryDetails