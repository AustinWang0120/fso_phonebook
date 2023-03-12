import personService from "../services/persons"

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
    const newPersonObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }
    // add person to the backend
    personService
      .create(newPersonObject)
      .then((returnedPerson) => {
        // add person to the frontend
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
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

export default PersonForm
