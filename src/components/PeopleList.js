import personService from "../services/persons"

const PeopleList = ({persons, setPersons, filter}) => {
  const deletePerson = (id) => {
    const targetPerson = persons.find((person) => (person.id === id))
    if (window.confirm(`Delete ${targetPerson.name}?`)) {
      // delete person from the backend
      personService
        .remove(id)
        .then((data) => {
          // delete person from the frontend
          setPersons(persons.filter((person) => person.id !== id))
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
