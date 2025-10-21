import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons.js'

import Numbers from './components/Numbers.jsx'
import Notification from './components/Notification.jsx'

const NumberForm = (props) => {
  return (
    <>
      <form>
        <div> name: <input onChange={props.handleNameChange} /> </div>
        <div> phone number: <input onChange={props.handlePhoneNumChange} /> </div>
        <div> <button onClick={props.handleSubmit} type="submit">add</button> </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setPhoneNum] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({ error: false, text: "" });

  const setMessageNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage({ error: false, text:"" });
    }, 3000);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const samePerson = persons.find(person => person.name === newName);
    if (samePerson !== undefined)
    {
        if (window.confirm(`${samePerson.name} is already added to phonebook. Replace old number?`))
        {
          const newPerson = { name: newName, number: newPhoneNum };
            personService.update(samePerson.id, newPerson)
            .then(replacedPerson => {
                console.log(replacedPerson);
                setPersons(persons.filter(person => person.id !== samePerson.id).concat(newPerson));
                setMessageNotification({error: false, text:`Updated ${newName}`});
            })
            .catch(error => {
              setMessageNotification({error: true, text:error})
            });
        }
    }
    else
    {
        const newPerson = { name: newName, number: newPhoneNum };
        personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessageNotification({error: false, text:`Added ${newName}`});
        })
        .catch( error => {
          setMessageNotification({error: true, text:"Could not submit contact information"});
        });
    }

  }

  const hook = () => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons);
    })
    .catch (error => {
      setMessageNotification({error: true, text:"Could not fetch data"});
      setPersons([ ])
    })
  }

  useEffect(hook, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneNumChange = (event) => {
    setPhoneNum(event.target.value);
  }

  const handleFilterChange = (event) => {
      setFilter(event.target.value);
  }

  const handleRemove = (event) => {
      if ( window.confirm(`Are you sure you want to remove this contact?`))
      {
        const id = event.target.id;
        personService.remove(id)
        .then(deletedPerson => {
            console.log(deletedPerson);
            setPersons(persons.filter(person => person.id !== deletedPerson.id))
            setMessageNotification({error: false, text:`Removed ${newName}`});
        })
        .catch(error => {
            console.log(error);
            setMessageNotification({error: true, text:`Failed to remove ${newName}`});
        });
      }
  }

  const filteredPersons = persons.filter(person => { return person.name.toLowerCase().includes(filter.toLowerCase()) });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={message.text} style={message.error ? "notif-error" : "notif"} />
      filter: <input onChange={handleFilterChange} />
      <NumberForm handleNameChange={handleNameChange} handlePhoneNumChange={handlePhoneNumChange} handleSubmit={handleSubmit}  />
      <Numbers contacts={filteredPersons} handleRemove={handleRemove}/>

    </div>
  )

}

export default App
