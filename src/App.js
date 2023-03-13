import { useEffect, useState } from "react"
import SearchFilter from "./components/SearchFilter"
import PersonForm from "./components/PersonForm"
import PeopleList from "./components/PeopleList"
import Notification from "./components/Notification"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("notification")

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <SearchFilter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
      <h2>Numbers</h2>
      <PeopleList
        persons={persons}
        setPersons={setPersons}
        filter={filter} 
        setMessage={setMessage} 
        setMessageType={setMessageType}
      />
    </div>
  )
}

export default App
