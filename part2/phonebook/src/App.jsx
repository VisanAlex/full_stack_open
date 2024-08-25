import { useEffect, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setFilterName(event.target.value)
  }

  let addNote = () => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      const personToUpdate = persons.find(person => person.name === newName);
    
      if (window.confirm(`${personToUpdate.name} already exists, want to update the phone number?`)) {
        const updatedPerson = { ...personToUpdate, number: newPhoneNumber };
        
        noteService
          .update(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== personToUpdate.id ? person : returnedPerson
            ));
          })
          .catch(error => {
            alert(`The person '${personToUpdate.name}' could not be updated: ${error}`);
          });
      }
      return;
    }
    let person = {name: newName, number: newPhoneNumber}
    noteService.create(person)
    setPersons(persons.concat(person));
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (personToDelete) {
      if (window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {
        noteService
          .deleteRequest(personToDelete.id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id));
          })
          .catch(error => {
            alert(`The person '${personToDelete.name}' could not be deleted: ${error}`);
          });
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      
      <div>
          filter shown with <input value={filterName} onChange={handleNewFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>number: <input value={newPhoneNumber} onChange={handleNewPhoneNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
  .filter((person) => filterName.length === 0 || person.name.toLowerCase().includes(filterName.toLowerCase()))
  .map((person, i) => (
    <div key={i}>
      <p>{person.name} {person.number}</p>
      <button type='submit' onClick={() => handleDelete(person.id)}>delete</button>
    </div>
  ))
}
    </div>
  )
}

import axios from 'axios'
import noteService from './services/server'

export default App