const PersonCheck = ({ newName, persons }) => {

    const matchList = persons.filter(function (person) {
        return (person.name === newName)
    })

    return (matchList.length)
}

export default PersonCheck