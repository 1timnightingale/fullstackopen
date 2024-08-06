import Person from "./Person"

const Phonebook = ({ phonebook }) => {

    return (
        <div>
            <table>
                <thead>

                    {phonebook.map((person, index) =>
                        <Person key={index} person={person} />
                    )}

                </thead>
            </table>
        </div>
    )
}

export default Phonebook