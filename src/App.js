const { useState } = require("react")

const App = () => {
  const [persons, setPersons] = useState([
    {id: 1, name: "Arto Hellas"}
  ])
  const [newName, setNewName] = useState("")

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    // check if the person is already existed
    if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName("")
      return
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        debug: {newName}
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (<li key={person.id}>{person.name}</li>))}
      </ul>
    </div>
  )
}

export default App
