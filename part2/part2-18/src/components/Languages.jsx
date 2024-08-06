const Languages = ({ langObject }) => {
    return (
        <ul>
            {

                Object.keys(langObject).map((key, index) =>
                    <li key={index}>{langObject[key]}</li>
                )
            }
        </ul >
    )
}

export default Languages