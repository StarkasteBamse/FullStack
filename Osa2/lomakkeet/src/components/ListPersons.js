import React from 'react'

const ListPersons = ({ persons, filter, deletePerson }) => {
    if (filter) {
        persons =
            persons.filter(function (person) {
                return person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
            })

    }
    return persons.map(person => <tr key={person.id}>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={() => deletePerson(person)}>poista</button></td>
        </tr>)
}

export default ListPersons