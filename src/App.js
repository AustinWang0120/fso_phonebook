const { useState } = require("react")

const SearchFilter = ({filter, setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
  const addPerson = (event) => {
    event.preventDefault()
    // check if the person is already existed
    if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
      return
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
  }
  
  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const PeopleList = ({personsToShow}) => {
  return (
    <ul>
      {personsToShow.map((person) => (<li key={person.id}>{person.name}: {person.number}</li>))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const personsToShow = persons.filter((person) => (person.name.toLowerCase().includes(filter.toLowerCase())))

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <PeopleList personsToShow={personsToShow} />
    </div>
  )
}

export default App
