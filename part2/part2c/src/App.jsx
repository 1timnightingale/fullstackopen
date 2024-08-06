import { useState, useEffect } from 'react'
import axios from 'axios'
import Phonebook from './components/Phonebook'
import AddPerson from './components/AddPerson'
import PersonCheck from './components/PersonCheck'
import FilterName from './components/FilterNames'


const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('enter name...')
  const [newNumber, setNewNumber] = useState('enter number...')
  const [idNumber, setIdNumber] = useState(Math.max(...persons.map((person) => person.id)))
  const [filterName, setFilterName] = useState('')
  const [displayPersons, setDisplayPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setDisplayPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {

    if (event.target.value === '') {
      setDisplayPersons(persons)
      setFilterName('')
    }
    else {
      setFilterName(event.target.value)
      const filteredPersons = persons.filter((person) => RegExp(filterName, 'i').test(person.name))
      setDisplayPersons(filteredPersons)
    }
  }


  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber,
      id: idNumber + 1
    }

    if (PersonCheck({ newName, persons }) > 0) {
      alert(newName + ' already exists in the phonebook!')
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('enter name...')
      setNewNumber('enter number...')
      setIdNumber(idNumber + 1)
      setDisplayPersons(persons.concat(nameObject))
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <FilterName
          filterName={filterName}
          onChange={handleFilterNameChange}
        />
        <AddPerson
          onSubmit={addName}
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <h2>Numbers</h2>
      <Phonebook phonebook={displayPersons} />
    </div>
  )
}

export default App