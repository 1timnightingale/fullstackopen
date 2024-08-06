
const Countries = ({ countryList, userSelectedCountry }) => {

    return (
        <div>
            <p> Country List</p>
            <table>
                <thead>
                    {countryList.map((country, index) =>
                        <tr key={index}>
                            <td>{country.common}</td>
                            <td><button onClick={() => userSelectedCountry(country.common)}>Select</button></td>
                        </tr>)}

                </thead>
            </table>
        </div>
    )
}

export default Countries