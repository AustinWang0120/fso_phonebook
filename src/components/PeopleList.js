import personService from "../services/persons"

const PeopleList = ({persons, setPersons, filter, setMessage, setMessageType}) => {
  const deletePerson = (id) => {
    const targetPerson = persons.find((person) => (person.id === id))
    if (window.confirm(`Delete ${targetPerson.name}?`)) {
      // delete person from the backend
      personService
        .remove(id)
        .then((data) => {
          // delete person from the frontend
          setPersons(persons.filter((person) => person.id !== id))
          // show the notification for 3 seconds
          setMessageType("notification")
          setMessage(`Removed ${targetPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch((error) => {
          // show the error for 3 seconds
          setMessageType("error")
          setMessage(`Information of ${targetPerson.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
            // remove the incorrect person
            setPersons(persons.filter((person) => (person.id !== targetPerson.id)))
          }, 3000)
        })
    }
  }

  const personsToShow = persons.filter((person) => (person.name.toLowerCase().includes(filter.toLowerCase())))

  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name}: {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

export default PeopleList
