import { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import AddPerson from './components/AddPerson'
import PersonCheck from './components/PersonCheck'
import FilterName from './components/FilterNames'
import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('enter name...')
  const [newNumber, setNewNumber] = useState('enter number...')
  const [filterName, setFilterName] = useState('')
  const [displayPersons, setDisplayPersons] = useState(persons)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setDisplayPersons(initialPersons)
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
    }
    const personCheckObject = persons.filter(person => person.name === newName)
    if (personCheckObject.length >= 0) {
      if (window.confirm(newName + ' already exists in the phonebook! Would you like to update the number?')) {
        const updatedNameObject = { ...personCheckObject[0], number: newNumber }
        personService
          .updateName(updatedNameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setDisplayPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewName('enter name...')
            setNewNumber('enter number...')
          })
      }
      else {
        console.log('Do nothing')
      }
    } else {
      personService
        .addName(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setDisplayPersons(persons.concat(returnedPerson))
          setNewName('enter name...')
          setNewNumber('enter number...')
        })
    }
  }


  const deletePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ` + person.name + `?`)) {
      console.log('Yes')
      personService
        .deleteName(person.id)
        .then(personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
            setDisplayPersons(initialPersons)
          })
        )
    } else {
      console.log('No')
    }
  }



  //////////////////////////////// App return here ///////////////////

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
      <Phonebook phonebook={displayPersons} deletePerson={(id) => deletePerson(id)} />
    </div>
  )
}

export default App