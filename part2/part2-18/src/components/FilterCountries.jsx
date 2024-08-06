const FilterCountries = (props) => {
    const filterCountry = props.filterCountry
    const onChange = props.onChange

    return (

        <div>
            <h3> Filter countries</h3>
            <form>
                <div>
                    Country: <input value={filterCountry} onChange={onChange} />
                </div>
            </form>
        </div>
    )
}

export default FilterCountries
