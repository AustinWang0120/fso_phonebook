import { useEffect, useState } from "react"
import SearchFilter from "./components/SearchFilter"
import PersonForm from "./components/PersonForm"
import PeopleList from "./components/PeopleList"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])

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
