import personService from "../services/persons"

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage, setMessageType}) => {
  const addPerson = (event) => {
    event.preventDefault()
    // check if the person is already existed
    const targetPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
    if (targetPerson) {
      if (window.confirm(`${targetPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        // update the person at the backend
        personService
          .update(targetPerson.id, {...targetPerson, number: newNumber})
          .then((updatedPerson) => {
            // update the person at the frontend
            setPersons(persons.map((person) => (person.id === updatedPerson.id ? updatedPerson : person)))
            setNewName("")
            setNewNumber("")
            // show the notification for 3 seconds
            setMessageType("notification")
            setMessage(`Updated ${updatedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch((error) => {
            setMessageType("error")
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
      }
    } else {
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
          // show the notification for 3 seconds
          setMessageType("notification")
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch((error) => {
          setMessageType("error")
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
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
